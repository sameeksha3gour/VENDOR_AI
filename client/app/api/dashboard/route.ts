import { NextResponse } from "next/server";

export async function GET() {
  const dashboardData = {
    stats: {
      activeVendors: 48,
      openPurchaseOrders: 26,
      pendingInvoices: 12,
      pendingInvoiceAmount: 482000,
      inventoryHealth: 86,
      lowStockItems: 7,
      totalProcurementSpend: 1240000,
    },

    spend: [
      { month: "Mar", amount: 180000 },
      { month: "Apr", amount: 240000 },
      { month: "May", amount: 210000 },
      { month: "Jun", amount: 280000 },
      { month: "Jul", amount: 250000 },
      { month: "Aug", amount: 310000 },
    ],

    recommendations: [
      {
        id: "1",
        title: "Vendor pricing requires attention",
        description:
          "TechNova Solutions increased its average pricing by 8.6% across recent orders.",
        type: "warning",
        vendor: "TechNova Solutions",
        saving: 18400,
      },
      {
        id: "2",
        title: "Low stock detected",
        description:
          "7 inventory items are approaching their reorder threshold.",
        type: "warning",
      },
      {
        id: "3",
        title: "Potential procurement saving",
        description:
          "Alternative vendors could reduce monthly procurement costs.",
        type: "opportunity",
        saving: 18400,
      },
    ],
  };

  return NextResponse.json(dashboardData);
}