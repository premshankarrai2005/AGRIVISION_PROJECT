const express = require("express");

const {
  getAllUsers,
  getFarmers,
  getBuyers,
  getAllProducts,
  getAllOrders,
  adminDashboard,
} = require("../controllers/adminController");

const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

router.use(protect);
router.use(authorize("admin"));

router.get("/users", getAllUsers);

router.get("/farmers", getFarmers);

router.get("/buyers", getBuyers);

router.get("/products", getAllProducts);

router.get("/orders", getAllOrders);

router.get("/dashboard", adminDashboard);

module.exports = router; 