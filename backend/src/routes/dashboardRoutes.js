const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const {
  getFarmerDashboard,
  getBuyerDashboard,
  getAdminDashboard,
} = require("../controllers/dashboardController");

router.get("/farmer", protect, authorize("farmer"), getFarmerDashboard);

router.get("/buyer", protect, authorize("buyer"), getBuyerDashboard);

router.get("/admin", protect, authorize("admin"), getAdminDashboard);

module.exports = router;
