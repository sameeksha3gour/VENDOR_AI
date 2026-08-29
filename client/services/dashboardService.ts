import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export interface DashboardStats {
  totalVendors: number;
  purchaseOrders: number;
  pendingInvoices: number;
  monthlySpend: number;
}

export interface Vendor {
  id: string;
  name: string;
  category: string;
  status: "Active" | "Pending" | "Inactive";
  initials: string;
}

export interface Activity {
  id: string;
  title: string;
  time: string;
  amount: string;
}

export interface DashboardData {
  stats: DashboardStats;
  vendors: Vendor[];
  activities: Activity[];
}

export async function getDashboardData(): Promise<DashboardData> {
  const response = await axios.get(`${API_URL}/dashboard`);

  return response.data;
}