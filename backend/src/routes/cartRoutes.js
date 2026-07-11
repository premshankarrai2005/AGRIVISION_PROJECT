const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
  addToCart,
  getCart,
  updateCart,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");

router.post(
  "/:productId",
  protect,
  authorize("buyer"),
  addToCart
);

router.get(
  "/",
  protect,
  authorize("buyer"),
  getCart
);

router.put(
  "/:productId",
  protect,
  authorize("buyer"),
  updateCart
);

router.delete(
  "/:productId",
  protect,
  authorize("buyer"),
  removeFromCart
);

router.delete(
  "/",
  protect,
  authorize("buyer"),
  clearCart
);

module.exports = router;