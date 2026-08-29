export interface DashboardStats {
  activeVendors: number;
  openPurchaseOrders: number;
  pendingInvoices: number;
  pendingInvoiceAmount: number;
  inventoryHealth: number;
  lowStockItems: number;
  totalProcurementSpend: number;
}

export interface SpendItem {
  month: string;
  amount: number;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  type: "warning" | "opportunity" | "info";
  vendor?: string;
  saving?: number;
}

export interface DashboardData {
  stats: DashboardStats;
  spend: SpendItem[];
  recommendations: Recommendation[];
}
