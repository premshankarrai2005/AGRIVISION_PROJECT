const Order = require("../models/Order");
const Product = require("../models/Product");

const placeOrder = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: "Insufficient stock",
      });
    }

    product.quantity -= quantity;

    if (product.quantity === 0) {
      product.status = "out_of_stock";
    }

    await product.save();

    const order = await Order.create({
      buyer: req.user._id,
      product: product._id,
      quantity,
      totalPrice: quantity * product.price,
    });

    res.status(201).json({
      success: true,
      order,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyOrders = async (req, res) => {
  try {

    const orders = await Order.find({
      buyer: req.user._id,
    })
      .populate("product")
      .populate("buyer", "name email");

    res.json({
      success: true,
      count: orders.length,
      orders,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  placeOrder,
  getMyOrders,
};