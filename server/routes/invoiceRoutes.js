const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const { uploadInvoice } = require("../controllers/uploadController");

const {
    createInvoice,
    getAllInvoices,
    getInvoiceById,
    updateInvoice,
    deleteInvoice,
} = require("../controllers/invoiceController");

router.post("/", protect, createInvoice);
router.get("/", protect, getAllInvoices);
router.get("/:id", protect, getInvoiceById);
router.put("/:id", protect, updateInvoice);
router.delete("/:id", protect, deleteInvoice);

// Upload Invoice File
router.post(
    "/upload",
    protect,
    upload.single("invoice"),
    uploadInvoice
);
module.exports = router;