const User = require("../models/User");

const toggleWishlist = async (req, res) => {
  try {
    const productId = req.params.productId;

    const user = await User.findById(req.user._id);

    const exists = user.wishlist.includes(productId);

    if (exists) {
      user.wishlist = user.wishlist.filter(
        (id) => id.toString() !== productId
      );
    } else {
      user.wishlist.push(productId);
    }

    await user.save();

    res.json({
      success: true,
      wishlist: user.wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("wishlist");

    res.json({
      success: true,
      wishlist: user.wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  toggleWishlist,
  getWishlist,
};