const Cart = require("../models/Cart");
const Product = require("../models/Product");

/*
|--------------------------------------------------------------------------
| Add Product To Cart
|--------------------------------------------------------------------------
*/

const addToCart = async (req, res) => {
  try {
    const { quantity } = req.body;

    const productId = req.params.productId;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    let cart = await Cart.findOne({
      buyer: req.user._id,
    });

    if (!cart) {
      cart = await Cart.create({
        buyer: req.user._id,
        items: [],
      });
    }

    const existing = cart.items.find(
      (item) =>
        item.product.toString() === productId
    );

    if (existing) {
      existing.quantity += quantity || 1;
    } else {
      cart.items.push({
        product: productId,
        quantity: quantity || 1,
      });
    }

    await cart.save();

    res.json({
      success: true,
      message: "Product added to cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Get Cart
|--------------------------------------------------------------------------
*/

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      buyer: req.user._id,
    }).populate("items.product");

    if (!cart) {
      return res.json({
        success: true,
        items: [],
        subtotal: 0,
        delivery: 0,
        total: 0,
      });
    }

    let subtotal = 0;

    cart.items.forEach((item) => {
      subtotal +=
        item.product.price * item.quantity;
    });

    const delivery =
      subtotal > 0 ? 40 : 0;

    const total = subtotal + delivery;

    res.json({
      success: true,
      cart,
      subtotal,
      delivery,
      total,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Update Quantity
|--------------------------------------------------------------------------
*/

const updateCart = async (req, res) => {
  try {
    const { quantity } = req.body;

    const cart = await Cart.findOne({
      buyer: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const item = cart.items.find(
      (item) =>
        item.product.toString() ===
        req.params.productId
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    item.quantity = quantity;

    await cart.save();

    res.json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Remove Item
|--------------------------------------------------------------------------
*/

const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      buyer: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item) =>
        item.product.toString() !==
        req.params.productId
    );

    await cart.save();

    res.json({
      success: true,
      message: "Item removed",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Clear Cart
|--------------------------------------------------------------------------
*/

const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      buyer: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = [];

    await cart.save();

    res.json({
      success: true,
      message: "Cart cleared",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addToCart,
  getCart,
  updateCart,
  removeFromCart,
  clearCart,
};