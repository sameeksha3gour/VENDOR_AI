const express = require("express");

const router = express.Router();

const {
  getInventory,
  getInventoryById,
  createInventory,
  updateInventory,
  deleteInventory,
} = require("../controllers/inventoryController");

const protect = require("../middleware/authMiddleware");

// Get all inventory
router.get("/", protect, getInventory);

// Get single product
router.get("/:id", protect, getInventoryById);

// Create product
router.post("/", protect, createInventory);

// Update product
router.put("/:id", protect, updateInventory);

// Delete product
router.delete("/:id", protect, deleteInventory);

module.exports = router;