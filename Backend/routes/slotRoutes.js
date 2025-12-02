const express = require("express");
const Slot = require("../models/Slot");

const router = express.Router();

// Admin to create a slot
router.post("/", async (req, res) => {
  const { professionalId, serviceId, startIso, durationMinutes } = req.body;

  const slot = await Slot.create({
    professionalId,
    serviceId,
    startIso,
    durationMinutes,
    status: "available"
  });

  res.json(slot);
});

module.exports = router;
