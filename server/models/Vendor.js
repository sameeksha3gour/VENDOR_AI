const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
  {
    // Basic Information
    businessName: {
      type: String,
      required: true,
      trim: true,
    },

    ownerName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
    },

    alternatePhone: {
      type: String,
      default: "",
    },

    // GST Information
    gstNumber: {
      type: String,
      required: true,
      uppercase: true,
    },

    panNumber: {
      type: String,
      default: "",
    },

    // Address
    address: {
      type: String,
      default: "",
    },

    city: {
      type: String,
      default: "",
    },

    state: {
      type: String,
      default: "",
    },

    pincode: {
      type: String,
      default: "",
    },

    // Bank Details
    bankName: {
      type: String,
      default: "",
    },

    accountNumber: {
      type: String,
      default: "",
    },

    ifscCode: {
      type: String,
      default: "",
    },

    upiId: {
      type: String,
      default: "",
    },

    // Business
    category: {
      type: String,
      default: "General",
    },

    paymentTerms: {
      type: String,
      default: "30 Days",
    },

    creditLimit: {
      type: Number,
      default: 0,
    },

    outstandingAmount: {
      type: Number,
      default: 0,
    },

    // AI
    vendorRating: {
      type: Number,
      default: 5,
    },

    riskLevel: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
    },

    isPreferredVendor: {
      type: Boolean,
      default: false,
    },

    notes: {
      type: String,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Vendor", vendorSchema);