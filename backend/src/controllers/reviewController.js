const Review = require("../models/Review");
const Product = require("../models/Product");

const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await Review.create({
      buyer: req.user._id,
      product: product._id,
      rating,
      comment,
    });

    const reviews = await Review.find({
      product: product._id,
    });

    const totalRating = reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );

    product.averageRating = totalRating / reviews.length;
    product.totalReviews = reviews.length;

    await product.save();

    res.status(201).json({
      success: true,
      message: "Review added successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      product: req.params.productId,
    }).populate("buyer", "name");

    res.json({
      success: true,
      count: reviews.length,
      reviews,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addReview,
  getReviews,
};