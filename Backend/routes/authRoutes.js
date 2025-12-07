const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload"); // multer storage wrapper

const router = express.Router();
const JWT_SECRET = "your-secret-key";

// Helper to normalize user shape returned to frontend
function normalizeUser(userDoc) {
  return {
    id: userDoc._id,
    name: userDoc.name,
    email: userDoc.email,
    phone: userDoc.phone || "",
    bio: userDoc.bio || "",
    photo: userDoc.photo || "", // e.g. "/uploads/xxx.jpg"
    lastLogin: userDoc.lastLogin || null,
    role: userDoc.role || "user",
  };
}

// ---------------- SIGNUP ----------------
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // create token and return normalized user (frontend expects token on signup)
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.json({
      message: "Signup successful",
      token,
      user: normalizeUser(user),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ---------------- LOGIN ----------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid email or password" });

    // UPDATE LAST LOGIN
    user.lastLogin = new Date();
    await user.save();

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.json({
      message: "Login successful",
      token,
      user: normalizeUser(user),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ---------------- UPDATE PROFILE ----------------
router.put(
  "/update-profile",
  authMiddleware,
  upload.single("photo"),
  async (req, res) => {
    try {
      const { name, phone, bio, removePhoto } = req.body;

      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ message: "User not found" });

      if (typeof name !== "undefined") user.name = name;
      if (typeof phone !== "undefined") user.phone = phone;
      if (typeof bio !== "undefined") user.bio = bio;

      // DELETE PHOTO IF REQUESTED
      // removePhoto will come as a string from form-data
      if (removePhoto === "true" || removePhoto === true) {
        user.photo = "";
      }

      // SAVE NEW PHOTO
      if (req.file) {
        user.photo = "/uploads/" + req.file.filename;
      }

      await user.save();

      // Return normalized user object so frontend localStorage shape stays same
      res.json({
        message: "Profile updated successfully",
        user: normalizeUser(user),
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error updating profile" });
    }
  }
);

// ---------------- CHANGE PASSWORD ----------------
router.post("/change-password", authMiddleware, async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user.id);

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Old password incorrect" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
