const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getFarmers = async (req, res) => {
  try {
    const farmers = await User.find({
      role: "farmer",
    }).select("-password");

    res.json({
      success: true,
      count: farmers.length,
      farmers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getBuyers = async (req, res) => {
  try {
    const buyers = await User.find({
      role: "buyer",
    }).select("-password");

    res.json({
      success: true,
      count: buyers.length,
      buyers,
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
    const products = await Product.find().populate("farmer", "name email");

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

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("buyer", "name email")
      .populate("products.product", "name price image")
      .populate("products.farmer", "name");

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

const adminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalFarmers = await User.countDocuments({
      role: "farmer",
    });

    const totalBuyers = await User.countDocuments({
      role: "buyer",
    });

    const totalProducts = await Product.countDocuments();

    const totalOrders = await Order.countDocuments();

    const revenue = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$totalAmount",
          },
        },
      },
    ]);

    res.json({
      success: true,
      totalUsers,
      totalFarmers,
      totalBuyers,
      totalProducts,
      totalOrders,
      revenue: revenue.length > 0 ? revenue[0].totalRevenue : 0,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  getFarmers,
  getBuyers,
  getAllProducts,
  getAllOrders,
  adminDashboard,
};
