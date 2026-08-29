const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
    {
        invoiceNumber: {
            type: String,
            required: true,
            unique: true,
        },

        vendor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vendor",
            required: true,
        },

        invoiceDate: {
            type: Date,
            required: true,
        },

        gstNumber: {
            type: String,
            required: true,
        },

        cgst: {
            type: Number,
            default: 0,
        },

        sgst: {
            type: Number,
            default: 0,
        },

        igst: {
            type: Number,
            default: 0,
        },

        totalAmount: {
            type: Number,
            required: true,
        },

        status: {
            type: String,
            enum: ["Pending", "Verified", "Rejected"],
            default: "Pending",
        },

        uploadedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Invoice", invoiceSchema);