const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
  toggleWishlist,
  getWishlist,
} = require("../controllers/wishlistController");

router.put(
  "/:productId",
  protect,
  authorize("buyer"),
  toggleWishlist
);

router.get(
  "/",
  protect,
  authorize("buyer"),
  getWishlist
);

module.exports = router;