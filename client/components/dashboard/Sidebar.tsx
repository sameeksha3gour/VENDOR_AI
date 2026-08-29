"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const mainItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: "⌂",
  },
  {
    label: "Vendors",
    href: "/dashboard/vendors",
    icon: "◉",
  },
  {
    label: "Procurement",
    href: "/dashboard/procurement",
    icon: "▣",
  },
  {
    label: "Invoices",
    href: "/dashboard/invoices",
    icon: "▤",
  },
  {
    label: "Inventory",
    href: "/dashboard/inventory",
    icon: "▥",
  },
  {
    label: "Purchases",
    href: "/dashboard/purchase",
    icon: "▧",
  },
];

const intelligenceItems = [
  {
    label: "AI Insights",
    href: "/dashboard/ai-insights",
    icon: "✦",
  },
  {
    label: "Reports",
    href: "/dashboard/reports",
    icon: "↗",
  },
];

export default function Sidebar({
  collapsed,
  setCollapsed,
}: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }

    return pathname.startsWith(href);
  };

  return (
    <aside
      className={`app-sidebar ${
        collapsed ? "collapsed" : ""
      }`}
    >
      {/* LOGO */}
      <div className="sidebar-header">
        <div className="brand-mark">V</div>

        {!collapsed && (
          <div className="brand-text">
            <strong>VAI Finance</strong>
            <span>SMART FINANCE</span>
          </div>
        )}
      </div>

      {/* COLLAPSE BUTTON */}
      <button
        type="button"
        className="sidebar-toggle"
        onClick={() => setCollapsed((value) => !value)}
        aria-label={
          collapsed ? "Expand sidebar" : "Collapse sidebar"
        }
      >
        {collapsed ? "→" : "←"}
      </button>

      {/* NAVIGATION */}
      <nav className="sidebar-nav">
        <div className="nav-section">
          {!collapsed && (
            <div className="nav-title">MAIN</div>
          )}

          {mainItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-item ${
                isActive(item.href) ? "active" : ""
              }`}
              title={collapsed ? item.label : undefined}
            >
              <span className="nav-icon">{item.icon}</span>

              {!collapsed && (
                <span className="nav-label">
                  {item.label}
                </span>
              )}
            </Link>
          ))}
        </div>

        <div className="nav-section">
          {!collapsed && (
            <div className="nav-title">
              INTELLIGENCE
            </div>
          )}

          {intelligenceItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-item ${
                isActive(item.href) ? "active" : ""
              }`}
              title={collapsed ? item.label : undefined}
            >
              <span className="nav-icon">{item.icon}</span>

              {!collapsed && (
                <span className="nav-label">
                  {item.label}
                </span>
              )}
            </Link>
          ))}
        </div>

        <div className="nav-section">
          {!collapsed && (
            <div className="nav-title">SYSTEM</div>
          )}

          <Link
            href="/dashboard/settings"
            className="nav-item"
            title={collapsed ? "Settings" : undefined}
          >
            <span className="nav-icon">⚙</span>

            {!collapsed && (
              <span className="nav-label">
                Settings
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* USER */}
      {!collapsed && (
        <div className="sidebar-user">
          <div className="user-avatar">SG</div>

          <div className="user-info">
            <strong>Sameeksha Gour</strong>
            <span>Administrator</span>
          </div>

          <button className="user-menu">•••</button>
        </div>
      )}
    </aside>
  );
}