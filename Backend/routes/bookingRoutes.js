const express = require("express");
const Slot = require("../models/Slot");
const Booking = require("../models/Booking");
const Professional = require("../models/Professional");

const router = express.Router();

// ---------------------- CREATE BOOKING ----------------------
router.post("/", async (req, res) => {
  try {
    const { professionalId, date, time, userId } = req.body;

    if (!professionalId || !date || !time || !userId) {
      return res.status(400).json({ message: "Missing fields" });
    }

    // Step 1: Check if slot exists
    let slot = await Slot.findOne({ professionalId, date, time });

    // Step 2: If slot DOESN'T exist → create it
    if (!slot) {
      slot = await Slot.create({
        professionalId,
        date,
        time,
      });
    }

    // Step 3: If already booked → deny
    if (slot.isBooked) {
      return res.status(400).json({ message: "Slot already booked" });
    }

    // Step 4: Create booking
    const booking = await Booking.create({
      slotId: slot._id,
      professionalId,
      clientName: "User",
      clientEmail: "user@gmail.com",
      status: "confirmed",
    });

    // Step 5: Mark slot as booked
    slot.isBooked = true;
    await slot.save();

    res.json({
      message: "Appointment booked successfully",
      booking,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Booking failed" });
  }
});

// ---------------------- GET USER'S BOOKINGS ----------------------
router.get("/user/:userId", async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("slotId")
      .populate("professionalId");

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching bookings" });
  }
});

// ---------------------- CANCEL BOOKING ----------------------
router.put("/cancel/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Free slot
    const slot = await Slot.findById(booking.slotId);
    if (slot) {
      slot.isBooked = false;
      await slot.save();
    }

    // Update booking status
    booking.status = "cancelled";
    await booking.save();

    res.json({ message: "Appointment cancelled successfully" });

  } catch (err) {
    res.status(500).json({ message: "Error cancelling booking" });
  }
});

module.exports = router;
