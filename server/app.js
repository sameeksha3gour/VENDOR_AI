const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const vendorRoutes = require("./routes/vendorRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");

const app = express();

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

// ==========================================
// ROUTES


// Authentication
app.use("/api/auth", authRoutes);

// Vendors
app.use("/api/vendors", vendorRoutes);

// Inventory
app.use("/api/inventory", inventoryRoutes);

// Purchases
app.use("/api/purchase", purchaseRoutes);

// TEST ROUTE
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Vendor AI Backend",
  });
});

// ==========================================
// EXPORT
// ==========================================

module.exports = app;