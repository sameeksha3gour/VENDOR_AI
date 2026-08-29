const express = require("express");

const router = express.Router();

const {

    createVendor,

    getVendors,

    getVendorById,

    updateVendor,

    deleteVendor,

} = require("../controllers/vendorController");

const protect = require("../middleware/authMiddleware");

const authorize = require("../middleware/roleMiddleware");

/*
=====================================
Vendor Routes
=====================================
*/

// Create Vendor
router.post(
    "/",
    protect,
    authorize("admin", "manager"),
    createVendor
);

// Get All Vendors
router.get(
    "/",
    protect,
    getVendors
);

// Get Single Vendor
router.get(
    "/:id",
    protect,
    getVendorById
);

// Update Vendor
router.put(
    "/:id",
    protect,
    authorize("admin", "manager"),
    updateVendor
);

// Delete Vendor
router.delete(
    "/:id",
    protect,
    authorize("admin"),
    deleteVendor
);

module.exports = router;