const express = require("express");
const Booking = require("../models/Booking");
const Slot = require("../models/Slot");

const router = express.Router();

// POST /bookings
router.post("/", async (req, res) => {
  const { slotId, clientName, clientEmail, notes } = req.body;

  const slot = await Slot.findById(slotId);
  if (!slot) return res.status(404).json({ error: "Slot not found" });
  if (slot.status !== "available")
    return res.status(400).json({ error: "Slot not available" });

  const booking = await Booking.create({
    slotId,
    professionalId: slot.professionalId,
    clientName,
    clientEmail,
    notes,
  });

  slot.status = "reserved";
  await slot.save();

  res.status(201).json(booking);
});

// GET /bookings
router.get("/", async (req, res) => {
  const { professionalId } = req.query;
  const filter = professionalId ? { professionalId } : {};

  const bookings = await Booking.find(filter)
    .populate({
      path: "slotId",
      populate: { path: "serviceId" },
    })
    .sort({ createdAt: -1 });

  res.json(bookings);
});

// POST /bookings/:id/confirm
router.post("/:id/confirm", async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking)
    return res.status(404).json({ error: "Booking not found" });

  booking.status = "confirmed";
  await booking.save();

  await Slot.findByIdAndUpdate(booking.slotId, { status: "booked" });

  res.json(booking);
});

// POST /bookings/:id/cancel
router.post("/:id/cancel", async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking)
    return res.status(404).json({ error: "Booking not found" });

  booking.status = "cancelled";
  await booking.save();

  await Slot.findByIdAndUpdate(booking.slotId, { status: "available" });

  res.json({ success: true });
});

module.exports = router;
