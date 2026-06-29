const Product = require("../models/Product");

const addProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      quantity,
      price,
      location,
      description,
      image,
    } = req.body;

    const product = await Product.create({
      farmer: req.user._id,
      name,
      category,
      quantity,
      price,
      location,
      description,
      image,
    });

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate(
      "farmer",
      "name email"
    );

    res.json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({
      farmer: req.user._id,
    });

    res.json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getMyProducts,
};