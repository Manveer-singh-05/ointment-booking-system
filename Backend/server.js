const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const professionalRoutes = require("./routes/professionalRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const slotRoutes = require("./routes/slotRoutes");
const authRoutes = require("./routes/authRoutes");  // <-- NEW
const adminRoutes = require("./routes/adminRoutes");
const reviewRoutes = require("./routes/reviewRoutes");




const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/appointmentDB")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/auth", authRoutes);                    // <-- ADD THIS
app.use("/professionals", professionalRoutes);
app.use("/bookings", bookingRoutes);
app.use("/slots", slotRoutes);
app.use("/admin", adminRoutes);
app.use("/reviews", reviewRoutes);
app.listen(4000, () => console.log("Server running on port 4000"));
