"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import "./vendor-details.css";

const vendors: Record<string, any> = {
  "1": {
    name: "TechNova Solutions",
    category: "Technology",
    email: "contact@technova.com",
    phone: "+91 98765 43210",
    location: "Noida, India",
    spend: "₹2.84L",
    orders: 18,
    rating: "4.8",
    risk: "Low",
    status: "Active",
    completion: "96%",
    delivery: "91%",
    quality: "94%",
  },

  "2": {
    name: "Apex Supplies",
    category: "Office Supplies",
    email: "sales@apexsupplies.com",
    phone: "+91 98111 22334",
    location: "Delhi, India",
    spend: "₹1.62L",
    orders: 14,
    rating: "4.6",
    risk: "Low",
    status: "Active",
    completion: "94%",
    delivery: "93%",
    quality: "92%",
  },

  "3": {
    name: "CloudMatrix",
    category: "Software",
    email: "hello@cloudmatrix.io",
    phone: "+91 98989 11223",
    location: "Bengaluru, India",
    spend: "₹1.24L",
    orders: 11,
    rating: "4.2",
    risk: "High",
    status: "Review",
    completion: "87%",
    delivery: "82%",
    quality: "86%",
  },

  "4": {
    name: "Shree Logistics",
    category: "Logistics",
    email: "support@shreelogistics.in",
    phone: "+91 97654 32109",
    location: "Gurugram, India",
    spend: "₹1.38L",
    orders: 16,
    rating: "4.7",
    risk: "Low",
    status: "Active",
    completion: "97%",
    delivery: "95%",
    quality: "94%",
  },
};

export default function VendorDetailsPage() {
  const params = useParams();

  const id = String(params.id);

  const vendor = vendors[id] || vendors["1"];

  return (
    <main className="vendor-details-page">

      {/* ================= HEADER ================= */}

      <header className="vendor-details-header">

        <Link
          href="/dashboard/vendors"
          className="back-to-vendors"
        >
          ← Back to Vendors
        </Link>

        <div className="vendor-details-title">

          <div className="details-avatar">
            {vendor.name
              .split(" ")
              .map((word: string) => word[0])
              .slice(0, 2)
              .join("")}
          </div>

          <div>
            <div className="vendor-title-row">

              <h1>{vendor.name}</h1>

              <span className="details-status">
                {vendor.status}
              </span>

            </div>

            <p>
              {vendor.category} · {vendor.location}
            </p>

            <span className="vendor-email">
              {vendor.email}
            </span>
          </div>

        </div>

        <div className="vendor-header-actions">

          <button className="secondary-action">
            Edit Vendor
          </button>

          <button className="primary-action">
            Create Purchase Order
          </button>

        </div>

      </header>


      {/* ================= SUMMARY ================= */}

      <section className="vendor-detail-stats">

        <div className="detail-stat-card">
          <span>Total Spend</span>
          <strong>{vendor.spend}</strong>
          <small>Lifetime procurement</small>
        </div>

        <div className="detail-stat-card">
          <span>Total Orders</span>
          <strong>{vendor.orders}</strong>
          <small>Purchase orders</small>
        </div>

        <div className="detail-stat-card">
          <span>Vendor Rating</span>
          <strong>
            ★ {vendor.rating}
          </strong>
          <small>Based on performance</small>
        </div>

        <div className="detail-stat-card risk-card">
          <span>AI Risk Level</span>

          <strong className="low-risk">
            {vendor.risk}
          </strong>

          <small>
            AI vendor assessment
          </small>
        </div>

      </section>


      {/* ================= MAIN GRID ================= */}

      <section className="vendor-details-grid">

        {/* ================= LEFT ================= */}

        <div className="vendor-details-left">

          {/* Vendor Overview */}

          <section className="details-card">

            <div className="details-card-header">
              <div>
                <span className="section-kicker">
                  VENDOR PROFILE
                </span>

                <h2>Vendor Overview</h2>
              </div>
            </div>

            <div className="profile-grid">

              <div className="profile-item">
                <span>Business Category</span>
                <strong>{vendor.category}</strong>
              </div>

              <div className="profile-item">
                <span>Email Address</span>
                <strong>{vendor.email}</strong>
              </div>

              <div className="profile-item">
                <span>Phone Number</span>
                <strong>{vendor.phone}</strong>
              </div>

              <div className="profile-item">
                <span>Location</span>
                <strong>{vendor.location}</strong>
              </div>

            </div>

          </section>


          {/* Performance */}

          <section className="details-card">

            <div className="details-card-header">

              <div>
                <span className="section-kicker">
                  PERFORMANCE
                </span>

                <h2>Vendor Performance</h2>
              </div>

              <span className="performance-label">
                Excellent
              </span>

            </div>

            <div className="performance-list">

              <PerformanceRow
                label="Order Completion"
                value={vendor.completion}
                percentage={96}
              />

              <PerformanceRow
                label="On-Time Delivery"
                value={vendor.delivery}
                percentage={91}
              />

              <PerformanceRow
                label="Quality Score"
                value={vendor.quality}
                percentage={94}
              />

            </div>

          </section>


          {/* Recent Orders */}

          <section className="details-card">

            <div className="details-card-header">

              <div>
                <span className="section-kicker">
                  PROCUREMENT
                </span>

                <h2>Recent Orders</h2>
              </div>

              <button className="view-all-button">
                View all
              </button>

            </div>

            <div className="orders-list">

              <OrderRow
                id="PO-1048"
                date="24 Aug 2026"
                amount="₹42,500"
                status="Delivered"
              />

              <OrderRow
                id="PO-1039"
                date="18 Aug 2026"
                amount="₹31,200"
                status="Delivered"
              />

              <OrderRow
                id="PO-1027"
                date="11 Aug 2026"
                amount="₹18,600"
                status="Processing"
              />

            </div>

          </section>

        </div>


        {/* ================= RIGHT ================= */}

        <aside className="vendor-details-right">

          {/* AI Intelligence */}

          <section className="ai-vendor-card">

            <div className="ai-icon">
              ✦
            </div>

            <span className="ai-label">
              AI VENDOR INTELLIGENCE
            </span>

            <h2>
              Vendor Health Analysis
            </h2>

            <p className="ai-description">
              VAI Finance analyzed procurement
              history, delivery patterns and
              vendor performance.
            </p>

            <div className="ai-insights">

              <div className="ai-insight positive">
                <span>✓</span>

                <p>
                  Strong purchase history
                </p>
              </div>

              <div className="ai-insight positive">
                <span>✓</span>

                <p>
                  Consistent delivery performance
                </p>
              </div>

              <div className="ai-insight warning">
                <span>!</span>

                <p>
                  Pricing increased 7% this quarter
                </p>
              </div>

            </div>

            <div className="ai-recommendation">

              <span>
                AI RECOMMENDATION
              </span>

              <p>
                Consider negotiating a
                volume-based discount before
                the next procurement cycle.
              </p>

            </div>

          </section>


          {/* Contact */}

          <section className="details-card contact-card">

            <div className="details-card-header">

              <div>
                <span className="section-kicker">
                  CONTACT
                </span>

                <h2>Contact Information</h2>
              </div>

            </div>

            <div className="contact-row">
              <span>Email</span>
              <strong>{vendor.email}</strong>
            </div>

            <div className="contact-row">
              <span>Phone</span>
              <strong>{vendor.phone}</strong>
            </div>

            <div className="contact-row">
              <span>Location</span>
              <strong>{vendor.location}</strong>
            </div>

          </section>

        </aside>

      </section>

    </main>
  );
}


/* =========================================
   PERFORMANCE COMPONENT
========================================= */

function PerformanceRow({
  label,
  value,
  percentage,
}: {
  label: string;
  value: string;
  percentage: number;
}) {
  return (
    <div className="performance-row">

      <div className="performance-top">

        <span>{label}</span>

        <strong>{value}</strong>

      </div>

      <div className="performance-bar">

        <div
          className="performance-fill"
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

    </div>
  );
}


/* =========================================
   ORDER COMPONENT
========================================= */

function OrderRow({
  id,
  date,
  amount,
  status,
}: {
  id: string;
  date: string;
  amount: string;
  status: string;
}) {
  return (
    <div className="order-row">

      <div>
        <strong>{id}</strong>
        <span>{date}</span>
      </div>

      <strong>{amount}</strong>

      <span
        className={`order-status ${
          status === "Delivered"
            ? "delivered"
            : "processing"
        }`}
      >
        {status}
      </span>

    </div>
  );
}