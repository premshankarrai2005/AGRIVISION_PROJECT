const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
  placeOrder,
  getBuyerOrders,
  getFarmerOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
  getFarmerDashboard,
} = require("../controllers/orderController");

// Buyer Routes

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
  getBuyerOrders
);



router.delete(
  "/:id",
  protect,
  authorize("buyer"),
  cancelOrder
);

// Farmer Routes

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
  "/dashboard",
  protect,
  authorize("farmer"),
  getFarmerDashboard
);

router.get(
  "/:id",
  protect,
  getOrderById
);

module.exports = router;