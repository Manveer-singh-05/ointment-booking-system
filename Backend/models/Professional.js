const mongoose = require("mongoose");

const professionalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  description: { type: String },
  // optionally an image URL
  image: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model("Professional", professionalSchema);
