const Purchase = require("../models/Purchase");
const Inventory = require("../models/Inventory");
const Vendor = require("../models/Vendor");

// ==========================================
// Generate Purchase Number
// ==========================================

const generatePurchaseNumber = async () => {
  const lastPurchase = await Purchase.findOne()
    .sort({ createdAt: -1 })
    .select("purchaseNumber");

  if (!lastPurchase) {
    return "PUR-0001";
  }

  const lastNumber = parseInt(
    lastPurchase.purchaseNumber.replace("PUR-", ""),
    10
  );

  const nextNumber = isNaN(lastNumber)
    ? 1
    : lastNumber + 1;

  return `PUR-${String(nextNumber).padStart(4, "0")}`;
};

// ==========================================
// GET ALL PURCHASES
// ==========================================

exports.getPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find()
      .populate(
        "vendor",
        "businessName gstNumber phone"
      )
      .populate(
        "items.product",
        "productName sku purchasePrice sellingPrice"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      purchases,
    });
  } catch (error) {
    console.error(
      "Get Purchases Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Unable to fetch purchases",
      error: error.message,
    });
  }
};

// ==========================================
// GET SINGLE PURCHASE
// ==========================================

exports.getPurchase = async (req, res) => {
  try {
    const purchase = await Purchase.findById(
      req.params.id
    )
      .populate(
        "vendor",
        "businessName gstNumber phone"
      )
      .populate(
        "items.product",
        "productName sku purchasePrice sellingPrice"
      );

    if (!purchase) {
      return res.status(404).json({
        success: false,
        message: "Purchase not found",
      });
    }

    res.status(200).json({
      success: true,
      purchase,
    });
  } catch (error) {
    console.error(
      "Get Purchase Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Unable to fetch purchase",
      error: error.message,
    });
  }
};

// ==========================================
// CREATE PURCHASE
// ==========================================

exports.createPurchase = async (req, res) => {
  try {
    const {
      vendor,
      purchaseDate,
      items,
      remarks,
      paymentStatus,
    } = req.body;

    // Validate vendor
    if (!vendor) {
      return res.status(400).json({
        success: false,
        message: "Vendor is required",
      });
    }

    // Validate items
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message:
          "At least one product is required",
      });
    }

    // Find vendor
    const vendorData =
      await Vendor.findById(vendor);

    if (!vendorData) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found",
      });
    }

    let subtotal = 0;
    let gstAmount = 0;

    const processedItems = [];

    // ========================================
    // Process Products
    // ========================================

    for (const item of items) {
      if (!item.product) {
        return res.status(400).json({
          success: false,
          message: "Product is required",
        });
      }

      const product =
        await Inventory.findById(
          item.product
        );

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      const quantity =
        Number(item.quantity);

      if (!quantity || quantity <= 0) {
        return res.status(400).json({
          success: false,
          message:
            "Quantity must be greater than zero",
        });
      }

      const purchasePrice =
        Number(item.purchasePrice) ||
        Number(product.purchasePrice);

      const gstRate =
        Number(item.gstRate) || 0;

      const total =
        quantity * purchasePrice;

      const itemGST =
        (total * gstRate) / 100;

      subtotal += total;
      gstAmount += itemGST;

      processedItems.push({
        product: product._id,
        quantity,
        purchasePrice,
        gstRate,
        total,
      });
    }

    const grandTotal =
      subtotal + gstAmount;

    // ========================================
    // Generate Purchase Number
    // ========================================

    const purchaseNumber =
      await generatePurchaseNumber();

    // ========================================
    // Payment Status
    // ========================================

    const allowedStatuses = [
      "Pending",
      "Partially Paid",
      "Paid",
    ];

    const finalPaymentStatus =
      allowedStatuses.includes(
        paymentStatus
      )
        ? paymentStatus
        : "Pending";

    // ========================================
    // Create Purchase
    // ========================================

    const purchase =
      await Purchase.create({
        purchaseNumber,
        vendor,
        purchaseDate:
          purchaseDate || new Date(),
        items: processedItems,
        subtotal,
        gstAmount,
        grandTotal,
        paymentStatus:
          finalPaymentStatus,
        remarks,
      });

    // ========================================
    // Update Inventory
    // ========================================

    for (const item of processedItems) {
      await Inventory.findByIdAndUpdate(
        item.product,
        {
          $inc: {
            quantity: item.quantity,
          },
        }
      );
    }

    // ========================================
    // Update Vendor Outstanding
    // ========================================

    if (
      finalPaymentStatus !== "Paid"
    ) {
      await Vendor.findByIdAndUpdate(
        vendor,
        {
          $inc: {
            outstandingAmount:
              grandTotal,
          },
        }
      );
    }

    // ========================================
    // Get Complete Purchase
    // ========================================

    const completePurchase =
      await Purchase.findById(
        purchase._id
      )
        .populate(
          "vendor",
          "businessName gstNumber phone"
        )
        .populate(
          "items.product",
          "productName sku purchasePrice sellingPrice"
        );

    res.status(201).json({
      success: true,
      message:
        "Purchase created successfully",
      purchase: completePurchase,
    });
  } catch (error) {
    console.error(
      "Create Purchase Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Unable to create purchase",
      error: error.message,
    });
  }
};

// ==========================================
// UPDATE PURCHASE
// ==========================================

exports.updatePurchase = async (
  req,
  res
) => {
  try {
    const purchase =
      await Purchase.findById(
        req.params.id
      );

    if (!purchase) {
      return res.status(404).json({
        success: false,
        message: "Purchase not found",
      });
    }

    const updatedPurchase =
      await Purchase.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    res.status(200).json({
      success: true,
      message:
        "Purchase updated successfully",
      purchase: updatedPurchase,
    });
  } catch (error) {
    console.error(
      "Update Purchase Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Unable to update purchase",
      error: error.message,
    });
  }
};

// ==========================================
// UPDATE PAYMENT STATUS
// ==========================================

exports.updatePaymentStatus = async (
  req,
  res
) => {
  try {
    const { paymentStatus } =
      req.body;

    const allowedStatuses = [
      "Pending",
      "Partially Paid",
      "Paid",
    ];

    if (
      !allowedStatuses.includes(
        paymentStatus
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid payment status",
      });
    }

    const purchase =
      await Purchase.findById(
        req.params.id
      );

    if (!purchase) {
      return res.status(404).json({
        success: false,
        message: "Purchase not found",
      });
    }

    const oldStatus =
      purchase.paymentStatus;

    // Pending / Partially Paid → Paid
    if (
      oldStatus !== "Paid" &&
      paymentStatus === "Paid"
    ) {
      await Vendor.findByIdAndUpdate(
        purchase.vendor,
        {
          $inc: {
            outstandingAmount:
              -purchase.grandTotal,
          },
        }
      );
    }

    // Paid → Pending / Partially Paid
    if (
      oldStatus === "Paid" &&
      paymentStatus !== "Paid"
    ) {
      await Vendor.findByIdAndUpdate(
        purchase.vendor,
        {
          $inc: {
            outstandingAmount:
              purchase.grandTotal,
          },
        }
      );
    }

    purchase.paymentStatus =
      paymentStatus;

    await purchase.save();

    res.status(200).json({
      success: true,
      message:
        "Payment status updated successfully",
      purchase,
    });
  } catch (error) {
    console.error(
      "Payment Status Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Unable to update payment status",
      error: error.message,
    });
  }
};

// ==========================================
// DELETE PURCHASE
// ==========================================

exports.deletePurchase = async (
  req,
  res
) => {
  try {
    const purchase =
      await Purchase.findById(
        req.params.id
      );

    if (!purchase) {
      return res.status(404).json({
        success: false,
        message: "Purchase not found",
      });
    }

    // Reverse inventory
    for (const item of purchase.items) {
      await Inventory.findByIdAndUpdate(
        item.product,
        {
          $inc: {
            quantity: -item.quantity,
          },
        }
      );
    }

    // Reverse vendor outstanding
    if (
      purchase.paymentStatus !==
      "Paid"
    ) {
      await Vendor.findByIdAndUpdate(
        purchase.vendor,
        {
          $inc: {
            outstandingAmount:
              -purchase.grandTotal,
          },
        }
      );
    }

    // Delete purchase
    await Purchase.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message:
        "Purchase deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete Purchase Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Unable to delete purchase",
      error: error.message,
    });
  }
};