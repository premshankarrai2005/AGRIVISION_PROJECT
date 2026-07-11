const Order = require("../models/Order");
const Product = require("../models/Product");
const Cart = require("../models/Cart");

const placeOrder = async (req, res) => {
  try {
    const { deliveryAddress, phone, paymentMethod } = req.body;

    const cart = await Cart.findOne({
      buyer: req.user._id,
    }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    let totalAmount = 0;
    const products = [];

    for (const item of cart.items) {
      const product = await Product.findById(item.product._id);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      if (product.quantity < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `${product.name} is out of stock`,
        });
      }

      product.quantity -= item.quantity;

      if (product.quantity === 0) {
        product.status = "out_of_stock";
      }

      await product.save();

      totalAmount += product.price * item.quantity;

      products.push({
        product: product._id,
        farmer: product.farmer,
        quantity: item.quantity,
        price: product.price,
      });
    }

    const order = await Order.create({
      buyer: req.user._id,
      products,
      totalAmount,
      deliveryAddress,
      phone,
      paymentMethod,
    });

    cart.items = [];
    await cart.save();

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

const getBuyerOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      buyer: req.user._id,
    })
      .populate("products.product")
      .sort("-createdAt");

    res.json({
      success: true,
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
    const orders = await Order.find({
      "products.farmer": req.user._id,
    })
      .populate("buyer")
      .populate("products.product")
      .sort("-createdAt");

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("buyer", "name email")
      .populate({
        path: "products.product",
        select: "name image price",
      });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
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

const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const flow = ["Pending", "Accepted", "Packed", "Shipped", "Delivered"];

    const currentIndex = flow.indexOf(order.orderStatus);
    const nextIndex = flow.indexOf(status);
    if (status === "Delivered") {
      order.deliveredAt = new Date();
    }

    if (status === "Cancelled") {
      order.orderStatus = "Cancelled";
    } else if (nextIndex !== currentIndex + 1) {
      return res.status(400).json({
        success: false,
        message: `Invalid status change from ${order.orderStatus} to ${status}`,
      });
    } else {
      order.orderStatus = status;
    }

    await order.save();

    res.json({
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

const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      buyer: req.user._id,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.orderStatus = "Cancelled";

    await order.save();

    res.json({
      success: true,
      message: "Order cancelled",
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
    const products = await Product.find({
      farmer: req.user._id,
    });

    const orders = await Order.find({
      "products.farmer": req.user._id,
    });

    const totalRevenue = orders
      .filter((order) => order.orderStatus === "Delivered")
      .reduce((sum, order) => sum + order.totalAmount, 0);

    const pendingOrders = orders.filter(
      (order) =>
        order.orderStatus === "Pending" ||
        order.orderStatus === "Accepted" ||
        order.orderStatus === "Packed" ||
        order.orderStatus === "Shipped",
    ).length;

    res.json({
      success: true,

      totalProducts: products.length,

      totalOrders: orders.length,

      revenue: totalRevenue,

      pendingOrders,

      monthlyRevenue: [0, 2000, 5500, 4300, 9000, totalRevenue],

      recentProducts: products
        .sort((a, b) => b.createdAt - a.createdAt)
        .slice(0, 5),

      recentOrders: orders
        .sort((a, b) => b.createdAt - a.createdAt)
        .slice(0, 5),
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
  getBuyerOrders,
  getFarmerOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
  getFarmerDashboard,
};
