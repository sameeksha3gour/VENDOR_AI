const Invoice = require("../models/Invoice");

// Create Invoice
const createInvoice = async (req, res) => {
    try {
        console.log("Request Body:", req.body);   
        const invoice = await Invoice.create({
            ...req.body,
            uploadedBy: req.user.id,
        });

        return res.status(201).json({
            success: true,
            message: "Invoice Created Successfully",
            invoice,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};
// Get All Invoices
const getAllInvoices = async (req, res) => {
    try {
         console.log("====================");
        console.log("BODY:", req.body);
        console.log("VENDOR:", req.body.vendor);
        console.log("====================");  
        const invoices = await Invoice.find({
            uploadedBy: req.user.id
        }).populate("vendor");

        return res.status(200).json({
            success: true,
            count: invoices.length,
            invoices,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};
// Get Single Invoice
const getInvoiceById = async (req, res) => {
    try {
        console.log("Request Parameters:", req.params);
        const invoice = await Invoice.findOne({
            _id: req.params.id,
            uploadedBy: req.user.id,
        }).populate("vendor");

        if (!invoice) {
            return res.status(404).json({
                success: false,
                message: "Invoice not found",
            });
        }

        return res.status(200).json({
            success: true,
            invoice,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};
// Update Invoice
const updateInvoice = async (req, res) => {
    try {
// helps to find one invoice and update
        const invoice = await Invoice.findOneAndUpdate(
            {//use id matches the url, ehich belongs to the logged-in user
                _id: req.params.id,
                uploadedBy: req.user.id,//this helps preventing one user from editing another user's
            },
            req.body,//contains new data sent from bruno
            {
                new: true,//returns updated document instead of the original one
                runValidators: true,//ensures that the updated data adheres to the schema's validation rules
            }
        );

        if (!invoice) {
            return res.status(404).json({
                success: false,
                message: "Invoice not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Invoice Updated Successfully",
            invoice,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};
// Delete Invoice
const deleteInvoice = async (req, res) => {
    try {

        const invoice = await Invoice.findOneAndDelete({
            _id: req.params.id,
            uploadedBy: req.user.id,
        });

        if (!invoice) {
            return res.status(404).json({
                success: false,
                message: "Invoice not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Invoice Deleted Successfully",
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

module.exports = {
    createInvoice,
    getAllInvoices,
    getInvoiceById,
    updateInvoice,
    deleteInvoice,
};