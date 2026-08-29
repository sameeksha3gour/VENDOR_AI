const Vendor = require("../models/Vendor");

// ==========================================
// CREATE VENDOR
// ==========================================
const createVendor = async (req, res) => {
  try {
    console.log("CREATE VENDOR BODY:", req.body);
    console.log("LOGGED USER:", req.user);

    const {
      businessName,
      ownerName,
      gstNumber,
      email,
      phone,
      address,
      category,
    } = req.body;

    if (
      !businessName?.trim() ||
      !ownerName?.trim() ||
      !gstNumber?.trim() ||
      !email?.trim() ||
      !phone?.trim() ||
      !address?.trim() ||
      !category?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "All vendor fields are required.",
      });
    }

    const existingVendor = await Vendor.findOne({
      gstNumber: gstNumber.trim().toUpperCase(),
    });

    if (existingVendor) {
      return res.status(409).json({
        success: false,
        message: "A vendor with this GST number already exists.",
      });
    }

    const vendor = await Vendor.create({
      businessName: businessName.trim(),
      ownerName: ownerName.trim(),
      gstNumber: gstNumber.trim().toUpperCase(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      address: address.trim(),
      category: category.trim(),
    });

    return res.status(201).json({
      success: true,
      message: "Vendor created successfully.",
      vendor,
    });
  } catch (error) {
    console.error("=================================");
    console.error("CREATE VENDOR ERROR");
    console.error(error);
    console.error("=================================");

    return res.status(500).json({
      success: false,
      message: "Failed to create vendor.",
      error: error.message,
    });
  }
};


// ==========================================
// GET ALL VENDORS
// ==========================================
const getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find({
      isActive: true,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: vendors.length,
      vendors,
    });
  } catch (error) {
    console.error("GET VENDORS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch vendors.",
      error: error.message,
    });
  }
};


// ==========================================
// GET SINGLE VENDOR
// ==========================================
const getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found.",
      });
    }

    return res.status(200).json({
      success: true,
      vendor,
    });
  } catch (error) {
    console.error("GET VENDOR ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch vendor.",
      error: error.message,
    });
  }
};


// ==========================================
// UPDATE VENDOR
// ==========================================
const updateVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found.",
      });
    }

    const allowedFields = [
      "businessName",
      "ownerName",
      "gstNumber",
      "email",
      "phone",
      "alternatePhone",
      "panNumber",
      "address",
      "city",
      "state",
      "pincode",
      "bankName",
      "accountNumber",
      "ifscCode",
      "upiId",
      "category",
      "paymentTerms",
      "creditLimit",
      "outstandingAmount",
      "vendorRating",
      "riskLevel",
      "isPreferredVendor",
      "notes",
      "isActive",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        vendor[field] = req.body[field];
      }
    });

    await vendor.save();

    return res.status(200).json({
      success: true,
      message: "Vendor updated successfully.",
      vendor,
    });
  } catch (error) {
    console.error("UPDATE VENDOR ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update vendor.",
      error: error.message,
    });
  }
};


// ==========================================
// DELETE VENDOR
// ==========================================
const deleteVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found.",
      });
    }

    // Soft delete
    vendor.isActive = false;
    await vendor.save();

    return res.status(200).json({
      success: true,
      message: "Vendor deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE VENDOR ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete vendor.",
      error: error.message,
    });
  }
};


// ==========================================
// EXPORT
// ==========================================
module.exports = {
  createVendor,
  getVendors,
  getVendorById,
  updateVendor,
  deleteVendor,
};