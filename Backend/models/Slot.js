const mongoose = require("mongoose");

const SlotSchema = new mongoose.Schema({
  professionalId: { type: mongoose.Schema.Types.ObjectId, ref: "Professional" },
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
  startIso: String,
  durationMinutes: Number,
  status: {
    type: String,
    default: "available"
  }
});

module.exports = mongoose.model("Slot", SlotSchema);
