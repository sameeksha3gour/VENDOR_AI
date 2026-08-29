"use client";

import { useEffect, useState } from "react";
import { getDashboardStats } from "@/services/dashboardService";

export default function useDashboard() {
  const [stats, setStats] = useState({
    totalVendors: 0,
    preferredVendors: 0,
    highRisk: 0,
    outstanding: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data.stats);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    stats,
    loading,
    refresh: loadStats,
  };
}