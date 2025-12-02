const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const professionalRoutes = require("./routes/professionalRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const slotRoutes = require("./routes/slotRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Connect MongoDB here
mongoose
  .connect("mongodb://127.0.0.1:27017/appointmentDB")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// ✅ Use Routes
app.use("/professionals", professionalRoutes);
app.use("/bookings", bookingRoutes);
app.use("/slots", slotRoutes);

app.listen(4000, () => console.log("Server running on port 4000"));
