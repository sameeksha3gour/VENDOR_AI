const Inventory = require("../models/Inventory");

// ==============================
// Get All Products
// ==============================

exports.getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find()
      .populate("supplier", "businessName")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      inventory,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Get Single Product
// ==============================

exports.getInventoryById = async (req, res) => {
  try {

    const product = await Inventory.findById(req.params.id)
      .populate("supplier", "businessName");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
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

// ==============================
// Create Product
// ==============================

exports.createInventory = async (req, res) => {

  try {

    const product = await Inventory.create(req.body);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// ==============================
// Update Product
// ==============================

exports.updateInventory = async (req, res) => {

  try {

    const product = await Inventory.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!product) {

      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    }

    res.json({
      success: true,
      message: "Product updated successfully",
      product,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// ==============================
// Delete Product
// ==============================

exports.deleteInventory = async (req, res) => {

  try {

    const product = await Inventory.findById(req.params.id);

    if (!product) {

      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    }

    await product.deleteOne();

    res.json({
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