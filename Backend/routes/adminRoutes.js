const express = require("express");
const Professional = require("../models/Professional");
const Service = require("../models/Service");
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();

// Create professional
router.post("/professionals", authMiddleware, isAdmin, async (req, res) => {
  try {
    const { name, specialization, description, image, experience } = req.body;
    const pro = await Professional.create({ name, specialization, description, image, experience });
    res.json({ message: "Professional created", pro });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating professional" });
  }
});

// Update professional
router.put("/professionals/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    const updates = req.body;
    const pro = await Professional.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json({ message: "Professional updated", pro });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating professional" });
  }
});

// Delete professional
router.delete("/professionals/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    await Professional.findByIdAndDelete(req.params.id);
    // optionally delete services and slots related to professional
    res.json({ message: "Professional deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting professional" });
  }
});

/* ---- Service management (admin) ---- */

// Add service to professional
router.post("/professionals/:id/services", authMiddleware, isAdmin, async (req, res) => {
  try {
    const { name, description, durationMinutes, price } = req.body;
    const service = await Service.create({
      professionalId: req.params.id,
      name,
      description,
      durationMinutes,
      price
    });
    res.json({ message: "Service added", service });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding service" });
  }
});

// Update service
router.put("/services/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "Service updated", service });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating service" });
  }
});

// Delete service
router.delete("/services/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: "Service deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting service" });
  }
});

module.exports = router;
