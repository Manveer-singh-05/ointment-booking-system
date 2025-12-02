const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  slotId: { type: mongoose.Schema.Types.ObjectId, ref: "Slot" },
  professionalId: { type: mongoose.Schema.Types.ObjectId, ref: "Professional" },
  clientName: String,
  clientEmail: String,
  status: {
    type: String,
    default: "pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  notes: String
});

module.exports = mongoose.model("Booking", BookingSchema);
