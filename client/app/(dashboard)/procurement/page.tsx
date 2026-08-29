"use client";

import { useMemo, useState } from "react";
import "./procurement.css";

type PurchaseOrder = {
  id: string;
  vendor: string;
  category: string;
  amount: string;
  date: string;
  status: "Pending" | "Delivered" | "Cancelled" | "Approved";
};

const initialOrders: PurchaseOrder[] = [
  { id: "PO-1048", vendor: "TechNova Solutions", category: "Technology", amount: "₹84,500", date: "26 Aug 2026", status: "Pending" },
  { id: "PO-1047", vendor: "Apex Supplies", category: "Office Supplies", amount: "₹42,800", date: "25 Aug 2026", status: "Approved" },
  { id: "PO-1046", vendor: "Shree Logistics", category: "Logistics", amount: "₹68,200", date: "24 Aug 2026", status: "Delivered" },
  { id: "PO-1045", vendor: "GreenCore Industries", category: "Raw Materials", amount: "₹1,24,000", date: "22 Aug 2026", status: "Pending" },
  { id: "PO-1044", vendor: "Prime Packaging", category: "Packaging", amount: "₹56,700", date: "20 Aug 2026", status: "Delivered" },
  { id: "PO-1043", vendor: "CloudMatrix", category: "Software", amount: "₹38,400", date: "18 Aug 2026", status: "Cancelled" },
];

const statusClass = (status: PurchaseOrder["status"]) => {
  if (status === "Pending") return "pending";
  if (status === "Cancelled") return "cancelled";
  if (status === "Delivered") return "delivered";
  return "";
};

export default function ProcurementPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [vendor, setVendor] = useState("");
  const [amount, setAmount] = useState("");

  const filtered = useMemo(() => orders.filter((order) => {
    const text = `${order.id} ${order.vendor} ${order.category}`.toLowerCase();
    return text.includes(search.toLowerCase()) && (status === "All" || order.status === status);
  }), [orders, search, status]);

  const createOrder = (event: React.FormEvent) => {
    event.preventDefault();
    if (!vendor.trim() || !amount.trim()) return;
    setOrders((current) => [{
      id: `PO-${1050 + current.length}`,
      vendor: vendor.trim(),
      category: "General",
      amount: `₹${amount.trim()}`,
      date: "26 Aug 2026",
      status: "Pending",
    }, ...current]);
    setVendor("");
    setAmount("");
    setShowModal(false);
  };

  return (
    <div className="procurement-page">
      <header className="procurement-header">
        <div>
          <div className="procurement-breadcrumb">Dashboard <span>/</span> Procurement</div>
          <div className="procurement-title-row">
            <div className="procurement-title-icon">▣</div>
            <div><h1>Procurement</h1><p>Create, monitor and manage purchase orders in one place.</p></div>
          </div>
        </div>
        <button className="create-po-button" onClick={() => setShowModal(true)}>+ Create Purchase Order</button>
      </header>

      <section className="procurement-summary">
        <div className="procurement-summary-card"><span>OPEN ORDERS</span><strong>26</strong><small className="positive">+12.2% this month</small></div>
        <div className="procurement-summary-card"><span>MONTHLY SPEND</span><strong>₹12.4L</strong><small className="positive">Within budget</small></div>
        <div className="procurement-summary-card"><span>PENDING APPROVAL</span><strong>8</strong><small className="warning">Needs attention</small></div>
        <div className="procurement-summary-card"><span>DELIVERED</span><strong>41</strong><small className="positive">92% on time</small></div>
        <div className="procurement-summary-card"><span>SUPPLIERS</span><strong>18</strong><small>6 active categories</small></div>
      </section>

      <section className="procurement-card">
        <div className="procurement-toolbar">
          <label className="procurement-search">⌕<input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search purchase orders, vendors..." /></label>
          <div className="procurement-toolbar-actions">
            <select className="procurement-filter" value={status} onChange={(e) => setStatus(e.target.value)}><option>All</option><option>Pending</option><option>Approved</option><option>Delivered</option><option>Cancelled</option></select>
            <button className="procurement-filter-button" onClick={() => { setSearch(""); setStatus("All"); }}>Reset</button>
          </div>
        </div>

        <div className="procurement-table-wrapper">
          <table className="procurement-table">
            <thead><tr><th>Purchase Order</th><th>Vendor</th><th>Category</th><th>Amount</th><th>Date</th><th>Status</th><th /></tr></thead>
            <tbody>{filtered.map((order) => (
              <tr key={order.id}>
                <td><div className="po-id"><div className="po-icon">▣</div><div><strong>{order.id}</strong><span>Purchase order</span></div></div></td>
                <td><div className="po-vendor"><strong>{order.vendor}</strong><span>Verified supplier</span></div></td>
                <td>{order.category}</td><td><strong>{order.amount}</strong></td><td>{order.date}</td>
                <td><span className={`po-status ${statusClass(order.status)}`}><span />{order.status}</span></td>
                <td><button className="po-view-button" title="View purchase order">→</button></td>
              </tr>
            ))}</tbody>
          </table>
          {filtered.length === 0 && <div className="procurement-empty">No purchase orders match your search.</div>}
        </div>

        <div className="procurement-pagination"><span>Showing <strong>{filtered.length}</strong> of <strong>{orders.length}</strong> purchase orders</span><div><button>‹</button><button className="current">1</button><button>›</button></div></div>
      </section>

      {showModal && (
        <div className="po-modal-overlay" onClick={() => setShowModal(false)}>
          <form className="po-modal" onSubmit={createOrder} onClick={(e) => e.stopPropagation()}>
            <div className="po-modal-header"><div><h2>Create Purchase Order</h2><p>Add a new procurement request.</p></div><button type="button" className="po-modal-close" onClick={() => setShowModal(false)}>×</button></div>
            <div className="po-form-grid"><label className="po-form-group"><span>Vendor</span><input value={vendor} onChange={(e) => setVendor(e.target.value)} placeholder="Vendor name" /></label><label className="po-form-group"><span>Amount</span><input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g. 85000" inputMode="numeric" /></label></div>
            <div className="po-modal-actions"><button type="button" className="cancelled" onClick={() => setShowModal(false)}>Cancel</button><button type="submit" className="po-save">Create Order</button></div>
          </form>
        </div>
      )}
    </div>
  );
}
