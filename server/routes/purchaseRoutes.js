const express = require("express");

const router = express.Router();

const purchaseController = require("../controllers/purchaseController");

// ==========================================
// PURCHASE ROUTES
// ==========================================

// Get all purchases
router.get(
  "/",
  purchaseController.getPurchases
);

// Get single purchase
router.get(
  "/:id",
  purchaseController.getPurchase
);

// Create purchase
router.post(
  "/",
  purchaseController.createPurchase
);

// Update purchase
router.put(
  "/:id",
  purchaseController.updatePurchase
);

// Update payment status
router.patch(
  "/:id/payment",
  purchaseController.updatePaymentStatus
);

// Delete purchase
router.delete(
  "/:id",
  purchaseController.deletePurchase
);

module.exports = router;