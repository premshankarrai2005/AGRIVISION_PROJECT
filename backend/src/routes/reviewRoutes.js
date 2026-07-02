const express = require("express");
const router = express.Router();

const {
  addReview,
  getReviews,
} = require("../controllers/reviewController");

const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

router.post(
  "/:productId",
  protect,
  authorize("buyer"),
  addReview
);

router.get(
  "/:productId",
  getReviews
);

module.exports = router;