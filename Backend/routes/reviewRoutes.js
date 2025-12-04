const express = require("express");
const Review = require("../models/Review");
const Professional = require("../models/Professional");
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();

// Create a review (user must be logged in)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { professionalId, rating, reviewText } = req.body;
    const userId = req.user.id;

    if (!professionalId || !rating) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const review = await Review.create({ professionalId, userId, rating, reviewText });

    // Recalculate average rating for professional
    const agg = await Review.aggregate([
      { $match: { professionalId: mongoose.Types.ObjectId(professionalId) } },
      { $group: { _id: "$professionalId", avgRating: { $avg: "$rating" }, count: { $sum: 1 } } }
    ]);

    if (agg && agg.length > 0) {
      await Professional.findByIdAndUpdate(professionalId, {
        rating: Math.round(agg[0].avgRating * 10) / 10, // one decimal
        ratingCount: agg[0].count
      });
    }

    res.json({ message: "Review added", review });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating review" });
  }
});

// Get reviews for a professional
router.get("/:professionalId", async (req, res) => {
  try {
    const reviews = await Review.find({ professionalId: req.params.professionalId })
      .populate("userId", "name photo");
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching reviews" });
  }
});

// Delete review (admin only)
router.delete("/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    const r = await Review.findByIdAndDelete(req.params.id);
    // optionally recalc rating afterwards - left as exercise or implement below
    res.json({ message: "Review deleted", review: r });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting review" });
  }
});

module.exports = router;
