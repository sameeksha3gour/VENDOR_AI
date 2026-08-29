const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api";

export interface DashboardStats {
  activeVendors: number;
  openPurchaseOrders: number;
  pendingInvoices: number;
  pendingInvoiceAmount: number;
  inventoryHealth: number;
  lowStockItems: number;
}

export interface SpendData {
  month: string;
  amount: number;
}

export interface AIRecommendation {
  title: string;
  description: string;
  saving?: number;
}

export interface DashboardData {
  stats: DashboardStats;
  spend: SpendData[];
  recommendations: AIRecommendation[];
}

export async function getDashboardData(): Promise<DashboardData> {
  const response = await fetch(
    `${API_URL}/dashboard`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      `Dashboard API failed: ${response.status}`
    );
  }

  return response.json();
}