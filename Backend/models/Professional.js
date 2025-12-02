const mongoose = require("mongoose");

const ProfessionalSchema = new mongoose.Schema({
  name: String,
  bio: String
});

module.exports = mongoose.model("Professional", ProfessionalSchema);
