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

const getFarmerOrders = async (req, res) => {
  try {
    const products = await Product.find({
      farmer: req.user._id,
    });

    const productIds = products.map((product) => product._id);

    const orders = await Order.find({
      product: { $in: productIds },
    })
      .populate("buyer", "name email")
      .populate("product", "name price");

    res.status(200).json({
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

const updateOrderStatus = async (req, res) => {
  try {

    const { status } = req.body;

    const order = await Order.findById(req.params.id).populate("product");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (
      order.product.farmer.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Access Denied",
      });
    }

    order.status = status;

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated",
      order,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const farmerDashboard = async (req, res) => {

  try {

    const products = await Product.find({
      farmer: req.user._id,
    });

    const productIds = products.map((product) => product._id);

    const orders = await Order.find({
      product: { $in: productIds },
    });

    let totalRevenue = 0;

    orders.forEach((order) => {
      totalRevenue += order.totalPrice;
    });

    res.json({
      success: true,
      dashboard: {
        totalProducts: products.length,
        totalOrders: orders.length,
        totalRevenue,
      },
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
  getFarmerOrders,
  updateOrderStatus,
  farmerDashboard,
};