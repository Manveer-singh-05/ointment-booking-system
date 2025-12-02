const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  professionalId: { type: mongoose.Schema.Types.ObjectId, ref: "Professional" },
  name: String,
  durationMinutes: Number,
  price: Number
});

module.exports = mongoose.model("Service", ServiceSchema);
