// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },

//   phone: { type: String, default: "" },
//   bio: { type: String, default: "" },
//   photo: { type: String, default: "" },

//   role: {
//     type: String,
//     enum: ["user", "admin"],
//     default: "user"
//   },

//   lastLogin: { type: Date },

//   // ⭐ ADD BELOW
//   resetOTP: { type: String },
//   resetOTPExpiry: { type: Date }
// }, { timestamps: true });

// module.exports = mongoose.model("User", UserSchema);
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  phone: { type: String, default: "" },
  bio: { type: String, default: "" },
  photo: { type: String, default: "" },
  lastLogin: { type: Date },

  // ⭐ FIXED: Forgot Password fields
  resetOTP: { type: String, default: null },
  resetOTPExpiry: { type: Date, default: null },

}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
