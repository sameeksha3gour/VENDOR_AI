"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { label: "Dashboard", icon: "⌂", href: "/dashboard" },
  { label: "Vendors", icon: "◉", href: "/dashboard/vendors" },
  { label: "Procurement", icon: "▣", href: "/procurement" },
  { label: "Invoices", icon: "▤", href: "/invoices" },
  { label: "Inventory", icon: "▥", href: "/inventory" },
  { label: "Purchases", icon: "▧", href: "/purchase" },
];

const intelligence = [
  { label: "AI Insights", icon: "✦", href: "/ai-insights" },
  { label: "AI Audit", icon: "↗", href: "/ai-audit" },
  { label: "Reports", icon: "▤", href: "/reports" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <div className={`dashboard-shell ${collapsed ? "sidebar-collapsed" : ""}`}>
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand">
          <div className="brand-logo">V</div>
          {!collapsed && (
            <div className="brand-text">
              <strong>VAI Finance</strong>
              <span>SMART FINANCE</span>
            </div>
          )}
        </div>

        <nav className="sidebar-content">
          <div className="nav-section">
            {!collapsed && <div className="nav-title">MAIN</div>}
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-item ${isActive(item.href) ? "active" : ""}`}
                title={collapsed ? item.label : undefined}
              >
                <span className="nav-icon">{item.icon}</span>
                {!collapsed && <span className="nav-label">{item.label}</span>}
              </Link>
            ))}
          </div>

          <div className="nav-section">
            {!collapsed && <div className="nav-title">INTELLIGENCE</div>}
            {intelligence.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-item ${isActive(item.href) ? "active" : ""}`}
                title={collapsed ? item.label : undefined}
              >
                <span className="nav-icon">{item.icon}</span>
                {!collapsed && <span className="nav-label">{item.label}</span>}
              </Link>
            ))}
          </div>

          <div className="nav-section">
            {!collapsed && <div className="nav-title">SYSTEM</div>}
            <Link
              href="/settings"
              className={`nav-item ${isActive("/settings") ? "active" : ""}`}
              title={collapsed ? "Settings" : undefined}
            >
              <span className="nav-icon">⚙</span>
              {!collapsed && <span className="nav-label">Settings</span>}
            </Link>
          </div>
        </nav>

        {!collapsed && (
          <div className="sidebar-user">
            <div className="user-avatar">SG</div>
            <div className="user-details">
              <strong>Sameeksha Gour</strong>
              <span>Administrator</span>
            </div>
            <button type="button" className="user-menu" aria-label="User menu">•••</button>
          </div>
        )}

        <button
          type="button"
          className="sidebar-toggle"
          onClick={() => setCollapsed((value) => !value)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? "→" : "←"}
        </button>
      </aside>

      <main className="dashboard-main">{children}</main>
    </div>
  );
}
