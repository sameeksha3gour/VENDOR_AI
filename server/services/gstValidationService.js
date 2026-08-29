const validateInvoice = (invoice) => {

    const errors = [];
    const warnings = [];
    const suggestions = [];

    // GST Number
    if (!invoice.gstNumber) {

        errors.push("GST Number Missing");

    } else {

        const gstRegex =
            /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{3}$/;

        if (!gstRegex.test(invoice.gstNumber)) {

            errors.push("Invalid GST Number");

        } else {

            suggestions.push("GST Number Valid");

        }

    }

    // Invoice Number
    if (!invoice.invoiceNumber) {

        errors.push("Invoice Number Missing");

    } else {

        suggestions.push("Invoice Number Found");

    }

    // Vendor Name
    if (!invoice.vendor) {

        warnings.push("Vendor Name Missing");

    }

    // Total Amount
    if (!invoice.totalAmount) {

        warnings.push("Total Amount Missing");

    }

    const status =
        errors.length === 0
            ? "Verified"
            : "Rejected";

    return {

        status,
        errors,
        warnings,
        suggestions,
        confidence:
            errors.length === 0
                ? 98
                : 60,

    };

};

module.exports = {

    validateInvoice,

};