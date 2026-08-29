const express = require("express");
const {
  getDashboard,
} = require("../controllers/dashboardController");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    /*
      Temporary realistic dashboard data.

      Later this will come directly from your database.
    */

    const dashboardData = {
      stats: {
        totalVendors: 128,
        purchaseOrders: 342,
        pendingInvoices: 24,
        monthlySpend: 842000,
      },

      vendors: [
        {
          id: "V001",
          name: "TechSource India",
          category: "Technology",
          status: "Active",
          initials: "TS",
        },
        {
          id: "V002",
          name: "Global Office Supplies",
          category: "Office Supplies",
          status: "Active",
          initials: "GO",
        },
        {
          id: "V003",
          name: "Prime Logistics",
          category: "Logistics",
          status: "Pending",
          initials: "PL",
        },
        {
          id: "V004",
          name: "Apex Components",
          category: "Manufacturing",
          status: "Active",
          initials: "AC",
        },
      ],

      activities: [
        {
          id: "A001",
          title: "Invoice #INV-2048 approved",
          time: "12 minutes ago",
          amount: "₹42,500",
        },
        {
          id: "A002",
          title: "Purchase order #PO-1082 created",
          time: "38 minutes ago",
          amount: "₹76,200",
        },
        {
          id: "A003",
          title: "Vendor payment processed",
          time: "1 hour ago",
          amount: "₹31,800",
        },
        {
          id: "A004",
          title: "Invoice #INV-2042 received",
          time: "2 hours ago",
          amount: "₹18,450",
        },
      ],
    };

    res.status(200).json(dashboardData);
  } catch (error) {
    console.error("Dashboard error:", error);

    res.status(500).json({
      message: "Unable to load dashboard data",
    });
  }
});

module.exports = router;