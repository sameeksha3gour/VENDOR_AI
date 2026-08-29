"use client";

import { useEffect, useMemo, useState } from "react";
import type { DashboardData } from "@/types/dashboard";
import "./dashboard.css";

interface SpendItem {
  month: string;
  amount: number;
}

interface RecommendationItem {
  id: string | number;
  title: string;
  description: string;
  vendor?: string;
  saving?: number;
}

const emptyData: DashboardData = {
  stats: {
    activeVendors: 0,
    openPurchaseOrders: 0,
    pendingInvoices: 0,
    pendingInvoiceAmount: 0,
    inventoryHealth: 0,
    lowStockItems: 0,
    totalProcurementSpend: 0,
  },
  spend: [],
  recommendations: [],
};

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData>(emptyData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const response = await fetch("/api/dashboard", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load dashboard");
        }

        const result: DashboardData = await response.json();

        setData(result);
      } catch (error) {
        console.error("Dashboard API error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const stats = data.stats;

  const spend = useMemo<SpendItem[]>(() => {
    return (data.spend ?? []) as SpendItem[];
  }, [data.spend]);

  const recommendations = useMemo<RecommendationItem[]>(() => {
    return (data.recommendations ?? []) as RecommendationItem[];
  }, [data.recommendations]);

  const maxSpend = useMemo(() => {
    if (!spend.length) return 1;

    return Math.max(
      ...spend.map((item: SpendItem) => Number(item.amount) || 0),
      1
    );
  }, [spend]);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner" />
        <span>Loading Vendor AI...</span>
      </div>
    );
  }

  return (
    <main className="dashboard-page">

      {/* ================= HEADER ================= */}

      <header className="dashboard-header">
        <div className="dashboard-heading">
          <span className="eyebrow">BUSINESS OVERVIEW</span>

          <h1>Good morning, Sameeksha</h1>

          <p>
            Here&apos;s what&apos;s happening across your business today.
          </p>
        </div>

        <div className="header-actions">
          <button className="notification-button" aria-label="Notifications">
            <span>♢</span>
          </button>

          <button className="primary-button">
            <span>+</span>
            New Activity
          </button>
        </div>
      </header>

      {/* ================= STAT CARDS ================= */}

      <section className="stats-grid">

        <StatCard
          icon="◉"
          label="Active Vendors"
          value={stats.activeVendors}
          change="+8.4%"
          description="vs last month"
          positive
        />

        <StatCard
          icon="▣"
          label="Open Purchase Orders"
          value={stats.openPurchaseOrders}
          change="+12.2%"
          description="this month"
          positive
        />

        <StatCard
          icon="▤"
          label="Pending Invoices"
          value={formatCurrency(stats.pendingInvoiceAmount)}
          change={`${stats.pendingInvoices}`}
          description="invoices pending"
          positive={false}
        />

        <StatCard
          icon="◫"
          label="Inventory Health"
          value={`${stats.inventoryHealth}%`}
          change={`${stats.lowStockItems}`}
          description="items low in stock"
          positive={stats.inventoryHealth >= 70}
        />

      </section>

      {/* ================= MAIN CONTENT ================= */}

      <section className="dashboard-grid">

        {/* ================= PROCUREMENT ================= */}

        <div className="panel procurement-panel">

          <div className="panel-header">

            <div>
              <span className="eyebrow">
                PROCUREMENT ANALYTICS
              </span>

              <h2>Monthly procurement spend</h2>

              <p className="panel-description">
                Track your procurement expenses over the last six months.
              </p>
            </div>

            <select className="period-select" defaultValue="6">
              <option value="6">Last 6 months</option>
              <option value="12">Last 12 months</option>
            </select>

          </div>

          <div className="spend-summary">
            <span>Total spend</span>

            <strong>
              {formatCurrency(stats.totalProcurementSpend)}
            </strong>
          </div>

          {/* ================= REAL HORIZONTAL CHART ================= */}

          <div className="chart-container">

            {spend.length === 0 ? (
              <div className="empty-chart">
                <div className="empty-chart-icon">📊</div>

                <strong>No procurement data yet</strong>

                <span>
                  Procurement spending will appear here once data is available.
                </span>
              </div>
            ) : (
              <div className="spend-chart">

                {spend.map((item: SpendItem) => {

                  const amount = Number(item.amount) || 0;

                  const height =
                    maxSpend > 0
                      ? Math.max((amount / maxSpend) * 100, 8)
                      : 8;

                  return (
                    <div
                      className="bar-wrapper"
                      key={item.month}
                    >

                      <div className="bar-value">
                        {formatCompactCurrency(amount)}
                      </div>

                      <div className="bar-area">

                        <div
                          className="bar"
                          style={{
                            height: `${height}%`,
                          }}
                          title={`${item.month}: ${formatCurrency(amount)}`}
                        />

                      </div>

                      <span className="bar-label">
                        {item.month}
                      </span>

                    </div>
                  );
                })}

              </div>
            )}

          </div>

        </div>

        {/* ================= AI RECOMMENDATIONS ================= */}

        <div className="panel intelligence-panel">

          <div className="panel-header">

            <div>
              <span className="eyebrow">
                BUSINESS INTELLIGENCE
              </span>

              <h2>AI recommendations</h2>
            </div>

            <span className="ai-badge">
              ✦ AI POWERED
            </span>

          </div>

          <div className="recommendations">

            {recommendations.length === 0 ? (
              <div className="empty-recommendations">
                <div className="empty-ai-icon">✦</div>

                <strong>No recommendations yet</strong>

                <p>
                  AI recommendations will appear here when your business
                  activity is analyzed.
                </p>
              </div>
            ) : (
              recommendations.map(
                (item: RecommendationItem) => (
                  <div
                    className="recommendation"
                    key={item.id}
                  >

                    <div className="recommendation-icon">
                      ✦
                    </div>

                    <div className="recommendation-content">

                      <div className="recommendation-title-row">

                        <h3>
                          {item.title}
                        </h3>

                        <span className="recommendation-dot" />

                      </div>

                      <p>
                        {item.description}
                      </p>

                      {item.vendor && (
                        <div className="recommendation-meta">
                          <span>Vendor</span>
                          <strong>{item.vendor}</strong>
                        </div>
                      )}

                      {item.saving && item.saving > 0 && (
                        <div className="saving-box">
                          <span>Potential saving</span>

                          <strong>
                            {formatCurrency(item.saving)}
                          </strong>
                        </div>
                      )}

                      <button className="analysis-button">
                        View analysis
                        <span>→</span>
                      </button>

                    </div>

                  </div>
                )
              )
            )}

          </div>

        </div>

      </section>

      {/* ================= LOWER DASHBOARD ================= */}

      <section className="bottom-grid">

        <div className="panel activity-panel">

          <div className="panel-header">

            <div>
              <span className="eyebrow">
                ACCOUNTS PAYABLE
              </span>

              <h2>Recent invoices</h2>
            </div>

            <button className="text-button">
              View all →
            </button>

          </div>

          <div className="invoice-placeholder">

            <div className="invoice-row">
              <div className="invoice-icon">₹</div>

              <div>
                <strong>Pending invoices</strong>
                <span>
                  {stats.pendingInvoices} invoices awaiting payment
                </span>
              </div>

              <strong>
                {formatCurrency(stats.pendingInvoiceAmount)}
              </strong>
            </div>

          </div>

        </div>

        <div className="panel health-panel">

          <div className="panel-header">

            <div>
              <span className="eyebrow">
                INVENTORY
              </span>

              <h2>Inventory health</h2>
            </div>

            <span className="health-percentage">
              {stats.inventoryHealth}%
            </span>

          </div>

          <div className="health-progress">

            <div
              className="health-progress-fill"
              style={{
                width: `${Math.min(
                  Math.max(stats.inventoryHealth, 0),
                  100
                )}%`,
              }}
            />

          </div>

          <div className="health-footer">

            <span>
              {stats.lowStockItems === 0
                ? "All tracked items are adequately stocked."
                : `${stats.lowStockItems} items require attention.`}
            </span>

            <button className="text-button">
              View inventory →
            </button>

          </div>

        </div>

      </section>

    </main>
  );
}


/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  icon,
  label,
  value,
  change,
  description,
  positive,
}: {
  icon: string;
  label: string;
  value: string | number;
  change: string;
  description: string;
  positive: boolean;
}) {
  return (
    <article className="stat-card">

      <div className="stat-card-top">

        <span className="stat-label">
          {label}
        </span>

        <div className="stat-icon">
          {icon}
        </div>

      </div>

      <div className="stat-value">
        {value}
      </div>

      <div
        className={`stat-change ${
          positive ? "positive" : "neutral"
        }`}
      >
        <strong>{change}</strong>

        <span>{description}</span>
      </div>

    </article>
  );
}


/* =========================================================
   CURRENCY FORMATTERS
========================================================= */

function formatCurrency(value: number) {
  return new Intl.NumberFormat(
    "en-IN",
    {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }
  ).format(value || 0);
}


function formatCompactCurrency(value: number) {
  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(1)}Cr`;
  }

  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(1)}L`;
  }

  if (value >= 1000) {
    return `₹${(value / 1000).toFixed(0)}K`;
  }

  return `₹${Math.round(value)}`;
}