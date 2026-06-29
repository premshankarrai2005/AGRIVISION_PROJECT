const express = require("express");

const {
  placeOrder,
  getMyOrders,
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

module.exports = router;