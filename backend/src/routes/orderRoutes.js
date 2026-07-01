const express = require("express");

const {
  placeOrder,
  getMyOrders,
  getFarmerOrders,
  updateOrderStatus,
  farmerDashboard,
} = require("../controllers/orderController");

const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("buyer"),
  placeOrder
);

router.get(
  "/my-orders",
  protect,
  authorize("buyer"),
  getMyOrders
);

router.get(
  "/farmer-orders",
  protect,
  authorize("farmer"),
  getFarmerOrders
);

router.put(
  "/:id/status",
  protect,
  authorize("farmer"),
  updateOrderStatus
);

router.get(
  "/farmer/dashboard",
  protect,
  authorize("farmer"),
  farmerDashboard
);

module.exports = router;