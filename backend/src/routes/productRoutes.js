const express = require("express");

const {
  addProduct,
  getAllProducts,
  getMyProducts,
} = require("../controllers/productController");

const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("farmer"),
  addProduct
);

router.get("/", getAllProducts);

router.get(
  "/my-products",
  protect,
  authorize("farmer"),
  getMyProducts
);

module.exports = router;