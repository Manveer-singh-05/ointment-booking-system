const express = require("express");
const Professional = require("../models/Professional");
const Service = require("../models/Service");
const Booking = require("../models/Booking");
const Review = require("../models/Review");
const User = require("../models/User");

// middleware
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();

/* ================================
    PROFESSIONAL MANAGEMENT
================================ */

// Create Professional
router.post("/professionals", authMiddleware, isAdmin, async (req, res) => {
  try {
    const { name, specialization, description, image, experience } = req.body;

    const pro = await Professional.create({
      name,
      specialization,
      description,
      image,
      experience
    });

    res.json({ message: "Professional created", pro });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating professional" });
  }
});

// Update Professional
router.put("/professionals/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    const pro = await Professional.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ message: "Professional updated", pro });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating professional" });
  }
});

// Delete Professional
router.delete("/professionals/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    await Professional.findByIdAndDelete(req.params.id);
    res.json({ message: "Professional deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting professional" });
  }
});

/* ================================
    SERVICE MANAGEMENT
================================ */

router.post("/professionals/:id/services", authMiddleware, isAdmin, async (req, res) => {
  try {
    const service = await Service.create({
      professionalId: req.params.id,
      ...req.body
    });

    res.json({ message: "Service added", service });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding service" });
  }
});

router.put("/services/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "Service updated", service });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating service" });
  }
});

router.delete("/services/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: "Service deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting service" });
  }
});

/* ================================
    BOOKINGS (ADMIN)
================================ */

router.get("/bookings", authMiddleware, isAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("professionalId")
      .lean();

    res.json(
      bookings.map((b) => ({
        _id: b._id,
        professional: b.professionalId,
        clientName: b.clientName,
        clientEmail: b.clientEmail,
        date: b.date,
        time: b.time,
        notes: b.notes,
        status: b.status,
      }))
    );
  } catch (err) {
    res.status(500).json({ message: "Error fetching bookings" });
  }
});

// Update booking status
router.put("/bookings/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    await Booking.findByIdAndUpdate(req.params.id, { status: req.body.status });
    res.json({ message: "Booking status updated" });
  } catch (err) {
    res.status(500).json({ message: "Error updating status" });
  }
});

/* ================================
    REVIEWS (ADMIN)
================================ */

router.get("/reviews", authMiddleware, isAdmin, async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("professionalId")
      .populate("userId")
      .lean();

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Error fetching reviews" });
  }
});

router.delete("/reviews/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting review" });
  }
});

module.exports = router;
