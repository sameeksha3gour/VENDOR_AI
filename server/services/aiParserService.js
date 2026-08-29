const parseInvoice = (text) => {

    const invoice = {};

    // Vendor Name
    const vendorMatch = text.match(/^[A-Za-z ].*/m);

    if (vendorMatch) {
        invoice.vendor = vendorMatch[0].trim();
    }

    // GST Number
    const gstMatch = text.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{3}/);

    if (gstMatch) {
        invoice.gstNumber = gstMatch[0];
    }

    // Invoice Number
    const invoiceMatch = text.match(/INV[- ]?[A-Za-z0-9]+/i);

    if (invoiceMatch) {
        invoice.invoiceNumber = invoiceMatch[0];
    }

    // Total Amount
    const totalMatch = text.match(/Total.*?([0-9]+)/i);

    if (totalMatch) {
        invoice.totalAmount = Number(totalMatch[1]);
    }

    return invoice;
};

module.exports = {
    parseInvoice,
};