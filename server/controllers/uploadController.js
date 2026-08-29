const { extractText } = require("../services/ocrService");
const { parseInvoice } = require("../services/aiParserService");
const {validateInvoice,} = require("../services/gstValidationService");
// this file makes code easier to maintain and test
const uploadInvoice = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }

        // Extract text using OCR
        const text = await extractText(req.file.path);
        const invoiceData = parseInvoice(text);
        const validation = validateInvoice(invoiceData); 
        return res.status(200).json({
            success: true,
            message: "Invoice Uploaded Successfully",
            file: req.file.filename,
            extractedText: text,
            invoiceData: invoiceData,
            validation: validation,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    uploadInvoice,
};