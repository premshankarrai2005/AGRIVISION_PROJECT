const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");

const getBuyerDashboard = async (req, res) => {
  try {
    // Cart
    const cart = await Cart.findOne({
      buyer: req.user._id,
    });

    const cartItems = cart
      ? cart.items.reduce(
          (total, item) => total + item.quantity,
          0
        )
      : 0;

    // Wishlist
    const user = await User.findById(req.user._id);

    const wishlistItems = user.wishlist.length;

    // Orders
    const orders = await Order.find({
      buyer: req.user._id,
    }).sort("-createdAt");

    const totalOrders = orders.length;

    const pendingOrders = orders.filter(
      (order) =>
        order.orderStatus === "Pending"
    ).length;

    // Recent Orders
    const recentOrders = await Order.find({
      buyer: req.user._id,
    })
      .populate("products.product")
      .sort("-createdAt")
      .limit(5);

    // Recommended Products
    const recommendedProducts =
      await Product.find({
        status: "available",
      })
        .sort("-createdAt")
        .limit(8);

    res.json({
      success: true,

      cartItems,

      wishlistItems,

      totalOrders,

      pendingOrders,

      recentOrders,

      recommendedProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getFarmerDashboard = async (req, res) => {
  try {
    const farmerId = req.user._id;

    const products = await Product.find({
      farmer: farmerId,
    });

    const totalProducts = products.length;

    const orders = await Order.find({
      "products.farmer": farmerId,
    });

    const totalOrders = orders.length;

    const pendingOrders = orders.filter(
      (order) => order.orderStatus === "Pending"
    ).length;

    const revenue = orders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );

    const recentProducts = products
      .sort(
        (a, b) => b.createdAt - a.createdAt
      )
      .slice(0, 5);

    // Dummy monthly revenue (replace later with real aggregation)
    const monthlyRevenue = [
      { month: "Jan", revenue: 0 },
      { month: "Feb", revenue: 0 },
      { month: "Mar", revenue: 0 },
      { month: "Apr", revenue: revenue },
    ];

    res.json({
      success: true,
      totalProducts,
      totalOrders,
      pendingOrders,
      revenue,
      recentProducts,
      monthlyRevenue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAdminDashboard = async (req, res) => {
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

    const orders = await Order.find();

    const revenue = orders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );

    const recentUsers = await User.find()
      .sort("-createdAt")
      .limit(5);

    const recentProducts = await Product.find()
      .sort("-createdAt")
      .limit(5);

    res.json({
      success: true,
      totalUsers,
      totalFarmers,
      totalBuyers,
      totalProducts,
      totalOrders,
      revenue,
      recentUsers,
      recentProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getFarmerDashboard,
  getBuyerDashboard,
  getAdminDashboard,
};