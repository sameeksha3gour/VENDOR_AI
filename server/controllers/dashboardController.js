const Vendor = require("../models/Vendor");
const Purchase = require("../models/Purchase");
const Invoice = require("../models/Invoice");
const Inventory = require("../models/Inventory");

const getAmountExpression = () => ({
  $convert: {
    input: {
      $ifNull: [
        "$totalAmount",
        {
          $ifNull: [
            "$total",
            {
              $ifNull: [
                "$amount",
                {
                  $ifNull: ["$grandTotal", 0],
                },
              ],
            },
          ],
        },
      ],
    },
    to: "double",
    onError: 0,
    onNull: 0,
  },
});

exports.getDashboard = async (req, res) => {
  try {
    const [
      activeVendors,
      openPurchaseOrders,
      pendingInvoices,
      invoiceAmount,
      totalInventory,
      lowStockItems,
    ] = await Promise.all([
      Vendor.countDocuments({
        status: {
          $in: ["active", "Active", "ACTIVE"],
        },
      }),

      Purchase.countDocuments({
        status: {
          $in: [
            "pending",
            "Pending",
            "open",
            "Open",
            "approved",
            "Approved",
          ],
        },
      }),

      Invoice.countDocuments({
        status: {
          $in: [
            "pending",
            "Pending",
            "unpaid",
            "Unpaid",
          ],
        },
      }),

      Invoice.aggregate([
        {
          $match: {
            status: {
              $in: [
                "pending",
                "Pending",
                "unpaid",
                "Unpaid",
              ],
            },
          },
        },
        {
          $group: {
            _id: null,
            amount: {
              $sum: getAmountExpression(),
            },
          },
        },
      ]),

      Inventory.countDocuments({}),

      Inventory.countDocuments({
        $or: [
          {
            quantity: {
              $lte: 10,
            },
          },
          {
            stock: {
              $lte: 10,
            },
          },
        ],
      }),
    ]);

    const inventoryHealth =
      totalInventory > 0
        ? Math.round(
            ((totalInventory - lowStockItems) /
              totalInventory) *
              100
          )
        : 100;

    const spend = await Purchase.aggregate([
      {
        $addFields: {
          calculatedAmount: getAmountExpression(),
          calculatedDate: {
            $ifNull: [
              "$createdAt",
              {
                $ifNull: [
                  "$orderDate",
                  "$date",
                ],
              },
            ],
          },
        },
      },

      {
        $match: {
          calculatedDate: {
            $exists: true,
          },
        },
      },

      {
        $group: {
          _id: {
            month: {
              $month: "$calculatedDate",
            },
            year: {
              $year: "$calculatedDate",
            },
          },

          amount: {
            $sum: "$calculatedAmount",
          },
        },
      },

      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },

      {
        $limit: 6,
      },
    ]);

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const formattedSpend = spend.map((item) => ({
      month: monthNames[item._id.month - 1],
      amount: Math.round(item.amount),
    }));

    const recommendations = [];

    if (lowStockItems > 0) {
      recommendations.push({
        title: "Inventory requires attention",
        description: `${lowStockItems} inventory items are running low. Consider creating purchase orders before stockouts occur.`,
      });
    }

    if (openPurchaseOrders > 0) {
      recommendations.push({
        title: "Purchase orders need monitoring",
        description: `${openPurchaseOrders} purchase orders are currently open. Review delivery dates and vendor commitments.`,
      });
    }

    if (pendingInvoices > 0) {
      recommendations.push({
        title: "Pending invoices detected",
        description: `${pendingInvoices} invoices are pending payment.`,
        saving: Math.round(
          invoiceAmount[0]?.amount || 0
        ),
      });
    }

    if (recommendations.length === 0) {
      recommendations.push({
        title: "Business operations look healthy",
        description:
          "No major procurement or inventory issues were detected.",
      });
    }

    res.json({
      success: true,

      stats: {
        activeVendors,
        openPurchaseOrders,
        pendingInvoices,
        pendingInvoiceAmount:
          invoiceAmount[0]?.amount || 0,
        inventoryHealth,
        lowStockItems,
      },

      spend: formattedSpend,

      recommendations,
    });
  } catch (error) {
    console.error(
      "Dashboard API error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to load dashboard data",
      error: error.message,
    });
  }
};