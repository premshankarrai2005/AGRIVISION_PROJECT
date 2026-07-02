const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AgriVision AI Backend Running",
    uptime: process.uptime(),
    timestamp: new Date(),
  });
});

module.exports = router;