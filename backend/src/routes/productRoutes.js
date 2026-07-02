const express = require("express");
const upload = require("../middleware/upload");

const {
  addProduct,
  getAllProducts,
  getMyProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("farmer"),
  upload.single("image"),
  addProduct
);

router.get("/", getAllProducts);

router.get(
  "/my-products",
  protect,
  authorize("farmer"),
  getMyProducts
);

router.get("/:id", getProductById);

router.put(
  "/:id",
  protect,
  authorize("farmer"),
  updateProduct
);

router.delete(
  "/:id",
  protect,
  authorize("farmer"),
  deleteProduct
);

module.exports = router;