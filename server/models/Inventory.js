const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      required: true,
      unique: true,
    },

    productName: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      default: 0,
    },

    purchasePrice: {
      type: Number,
      required: true,
    },

    sellingPrice: {
      type: Number,
      required: true,
    },

    warehouse: {
      type: String,
      default: "Main Warehouse",
    },

    expiryDate: {
      type: Date,
    },

    minimumStock: {
      type: Number,
      default: 10,
    },

    description: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Inventory",
  inventorySchema
);