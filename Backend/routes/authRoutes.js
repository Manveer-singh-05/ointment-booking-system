const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const multer = require("multer");
const upload = require("../middleware/upload");


const router = express.Router();
const JWT_SECRET = "your-secret-key";

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

    res.json({ message: "Signup successful", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ---------------- LOGIN ----------------
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "Invalid email or password" });

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) return res.status(400).json({ message: "Invalid email or password" });

//     const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

//     res.json({
//       message: "Login successful",
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//          role: user.role
//       }
//     });

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

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
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        bio: user.bio,
        photo: user.photo,
        lastLogin: user.lastLogin,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// ---------------- UPDATE PROFILE ----------------
// router.put("/update-profile", authMiddleware, async (req, res) => {
//   try {
//     const { name, phone, bio } = req.body;

//     // Find user from JWT token
//     const user = await User.findById(req.user.id);

//     if (!user) return res.status(404).json({ message: "User not found" });

//     // Update fields
//     if (name) user.name = name;
//     if (phone) user.phone = phone;
//     if (bio) user.bio = bio;

//     await user.save();

//     res.json({
//       message: "Profile updated successfully",
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         phone: user.phone || "",
//         bio: user.bio || ""
//       }
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Error updating profile" });
//   }
// });




router.put(
  "/update-profile",
  authMiddleware,
  upload.single("photo"),   // <-- IMPORTANT
  async (req, res) => {
    try {
      const { name, phone, bio } = req.body;

      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ message: "User not found" });

      if (name) user.name = name;
      if (phone) user.phone = phone;
      if (bio) user.bio = bio;

      // if a new photo was uploaded
      if (req.file) {
        user.photo = "/uploads/" + req.file.filename;
      }

      await user.save();

      res.json({
        message: "Profile updated successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          bio: user.bio,
          photo: user.photo,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error updating profile" });
    }
  }
);

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
