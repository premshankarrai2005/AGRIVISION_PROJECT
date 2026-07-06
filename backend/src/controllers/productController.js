const Product = require("../models/Product");

const addProduct = async (req, res) => {
  try {
    const { name, category, quantity, price, location, description } = req.body;
    const image = req.file ? req.file.path : "";

    if (!name || !category || !quantity || !price || !location) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    if (price <= 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be greater than 0",
      });
    }

    if (quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be greater than 0",
      });
    }

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
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    let filter = {};

    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.search) {
      filter.name = {
        $regex: req.query.search,
        $options: "i",
      };
    }

    let sort = {};

    if (req.query.sort === "price") {
      sort.price = 1;
    } else if (req.query.sort === "-price") {
      sort.price = -1;
    } else {
      sort.createdAt = -1;
    }

    const products = await Product.find(filter)
      .populate("farmer", "name")
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const totalProducts = await Product.countDocuments(filter);

    res.json({
      success: true,
      page,
      totalPages: Math.ceil(totalProducts / limit),
      totalProducts,
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
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    const filter = {
      farmer: req.user._id,
    };

    // Search
    if (req.query.search) {
      filter.name = {
        $regex: req.query.search,
        $options: "i",
      };
    }

    // Category
    if (
      req.query.category &&
      req.query.category !== "All"
    ) {
      filter.category = req.query.category;
    }

    // Status
    if (
      req.query.status &&
      req.query.status !== "All"
    ) {
      filter.status = req.query.status;
    }

    let sort = {
      createdAt: -1,
    };

    if (req.query.sort === "price-asc") {
      sort = { price: 1 };
    }

    if (req.query.sort === "price-desc") {
      sort = { price: -1 };
    }

    const products = await Product.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const totalProducts =
      await Product.countDocuments(filter);

    res.json({
      success: true,
      products,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      page,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "farmer",
      "name email",
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
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

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product.farmer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can update only your own products",
      });
    }

    const updateData = {
      ...req.body,
    };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product.farmer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can delete only your own products",
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
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
  getProductById,
  updateProduct,
  deleteProduct,
};
