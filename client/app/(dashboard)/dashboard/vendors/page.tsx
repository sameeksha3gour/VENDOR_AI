"use client";

import { useMemo, useState } from "react";
import "./vendors.css";

type Vendor = {
  id: number;
  name: string;
  category: string;
  contact: string;
  spend: string;
  orders: number;
  rating: number;
  status: "Active" | "Review" | "Inactive";
  risk: "Low" | "Medium" | "High";
};

const initialVendors: Vendor[] = [
  {
    id: 1,
    name: "TechNova Solutions",
    category: "Technology",
    contact: "contact@technova.com",
    spend: "₹2.84L",
    orders: 18,
    rating: 4.8,
    status: "Active",
    risk: "Medium",
  },
  {
    id: 2,
    name: "Apex Supplies",
    category: "Office Supplies",
    contact: "sales@apexsupplies.com",
    spend: "₹1.62L",
    orders: 14,
    rating: 4.6,
    status: "Active",
    risk: "Low",
  },
  {
    id: 3,
    name: "CloudMatrix",
    category: "Software",
    contact: "hello@cloudmatrix.io",
    spend: "₹1.24L",
    orders: 11,
    rating: 4.2,
    status: "Review",
    risk: "High",
  },
  {
    id: 4,
    name: "Shree Logistics",
    category: "Logistics",
    contact: "support@shreelogistics.in",
    spend: "₹1.38L",
    orders: 16,
    rating: 4.7,
    status: "Active",
    risk: "Low",
  },
  {
    id: 5,
    name: "GreenCore Industries",
    category: "Raw Materials",
    contact: "sales@greencore.in",
    spend: "₹96,500",
    orders: 9,
    rating: 4.1,
    status: "Review",
    risk: "Medium",
  },
  {
    id: 6,
    name: "Prime Packaging",
    category: "Packaging",
    contact: "orders@primepack.com",
    spend: "₹74,800",
    orders: 7,
    rating: 4.5,
    status: "Active",
    risk: "Low",
  },
];

export default function VendorsPage() {
  const [vendorList, setVendorList] = useState(initialVendors);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  const [showModal, setShowModal] = useState(false);

  const [vendorName, setVendorName] = useState("");
  const [vendorCategory, setVendorCategory] = useState("Technology");
  const [vendorEmail, setVendorEmail] = useState("");
  const [vendorPhone, setVendorPhone] = useState("");

  const categories = [
    "All",
    ...Array.from(
      new Set(vendorList.map((vendor) => vendor.category))
    ),
  ];

  const filteredVendors = useMemo(() => {
    return vendorList.filter((vendor) => {
      const matchesSearch =
        vendor.name.toLowerCase().includes(search.toLowerCase()) ||
        vendor.contact.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || vendor.category === category;

      const matchesStatus =
        status === "All" || vendor.status === status;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );
    });
  }, [vendorList, search, category, status]);

  const handleAddVendor = (e: React.FormEvent) => {
    e.preventDefault();

    if (!vendorName.trim() || !vendorEmail.trim()) {
      return;
    }

    const newVendor: Vendor = {
      id: Date.now(),
      name: vendorName.trim(),
      category: vendorCategory,
      contact: vendorEmail.trim(),
      spend: "₹0",
      orders: 0,
      rating: 0,
      status: "Active",
      risk: "Low",
    };

    setVendorList((current) => [
      newVendor,
      ...current,
    ]);

    setVendorName("");
    setVendorCategory("Technology");
    setVendorEmail("");
    setVendorPhone("");
    setShowModal(false);
  };

  return (
    <div className="vendor-main">

      {/* ================= MAIN ================= */}

      <section className="vendors-content">

        <header className="vendors-header">

          <div>
            <span className="page-label">
              SUPPLIER MANAGEMENT
            </span>

            <h1>Vendors</h1>

            <p>
              Manage suppliers, monitor performance and
              track procurement spending.
            </p>
          </div>

          <button
            className="add-vendor-button"
            onClick={() => setShowModal(true)}
          >
            + Add Vendor
          </button>

        </header>

        {/* ================= SUMMARY ================= */}

        <section className="vendor-summary">

          <div className="summary-card">
            <span>ACTIVE VENDORS</span>
            <strong>
              {
                vendorList.filter(
                  (v) => v.status === "Active"
                ).length
              }
            </strong>
            <small>
              Currently active
            </small>
          </div>

          <div className="summary-card">
            <span>TOTAL SPEND</span>
            <strong>₹8.42L</strong>
            <small>
              Across active vendors
            </small>
          </div>

          <div className="summary-card">
            <span>UNDER REVIEW</span>
            <strong>
              {
                vendorList.filter(
                  (v) => v.status === "Review"
                ).length
              }
            </strong>
            <small>
              Requires attention
            </small>
          </div>

          <div className="summary-card ai-summary">
            <span>AI RECOMMENDATIONS</span>
            <strong>3</strong>
            <small>
              Potential savings detected
            </small>
          </div>

        </section>

        {/* ================= TABLE ================= */}

        <section className="vendors-card">

          <div className="vendors-toolbar">

            <div>
              <h2>Vendor Directory</h2>

              <p>
                {filteredVendors.length} vendors displayed
              </p>
            </div>

            <div className="vendor-controls">

              <div className="vendor-search">
                <span>⌕</span>

                <input
                  type="text"
                  placeholder="Search vendors..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                />
              </div>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
              >
                {categories.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
              >
                <option value="All">
                  All Status
                </option>

                <option value="Active">
                  Active
                </option>

                <option value="Review">
                  Review
                </option>

                <option value="Inactive">
                  Inactive
                </option>
              </select>

            </div>

          </div>

          <div className="vendor-table-wrapper">

            <table className="vendor-table">

              <thead>
                <tr>
                  <th>VENDOR</th>
                  <th>CATEGORY</th>
                  <th>SPEND</th>
                  <th>ORDERS</th>
                  <th>RATING</th>
                  <th>AI RISK</th>
                  <th>STATUS</th>
                  <th />
                </tr>
              </thead>

              <tbody>

                {filteredVendors.map((vendor) => (

                  <tr key={vendor.id}>

                    <td>
                      <div className="vendor-name">

                        <div className="vendor-avatar">
                          {vendor.name
                            .split(" ")
                            .map(
                              (word) =>
                                word[0]
                            )
                            .slice(0, 2)
                            .join("")}
                        </div>

                        <div>
                          <strong>
                            {vendor.name}
                          </strong>

                          <span>
                            {vendor.contact}
                          </span>
                        </div>

                      </div>
                    </td>

                    <td>
                      {vendor.category}
                    </td>

                    <td>
                      <strong>
                        {vendor.spend}
                      </strong>
                    </td>

                    <td>
                      {vendor.orders}
                    </td>

                    <td>
                      <span className="rating">
                        {vendor.rating > 0
                          ? `★ ${vendor.rating}`
                          : "New"}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`risk risk-${vendor.risk.toLowerCase()}`}
                      >
                        {vendor.risk}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`vendor-status status-${vendor.status.toLowerCase()}`}
                      >
                        {vendor.status}
                      </span>
                    </td>

                    <td>
                      <button
                        className="more-button"
                        aria-label={`Options for ${vendor.name}`}
                      >
                        •••
                      </button>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

            {filteredVendors.length === 0 && (
              <div className="empty-vendors">
                <strong>
                  No vendors found
                </strong>

                <span>
                  Try changing your search or filters.
                </span>
              </div>
            )}

          </div>

        </section>

        {/* ================= AI ================= */}

        <section className="vendor-ai-card">

          <div className="vendor-ai-icon">
            ✦
          </div>

          <div className="vendor-ai-content">

            <span>
              AI VENDOR INTELLIGENCE
            </span>

            <h2>
              3 vendors may require your attention
            </h2>

            <p>
              Pricing changes, vendor performance
              and procurement patterns were detected.
            </p>

          </div>

          <button>
            View AI Analysis →
          </button>

        </section>

      </section>

      {/* ================= ADD VENDOR MODAL ================= */}

      {showModal && (
        <div
          className="vendor-modal-overlay"
          onClick={() => setShowModal(false)}
        >

          <div
            className="vendor-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="modal-header">

              <div>
                <span>
                  VENDOR MANAGEMENT
                </span>

                <h2>
                  Add new vendor
                </h2>

                <p>
                  Add supplier information to your
                  vendor directory.
                </p>
              </div>

              <button
                className="modal-close"
                onClick={() =>
                  setShowModal(false)
                }
              >
                ×
              </button>

            </div>

            <form
              className="vendor-form"
              onSubmit={handleAddVendor}
            >

              <div className="modal-form-group">
                <label htmlFor="vendorName">
                  Vendor name
                </label>

                <input
                  id="vendorName"
                  type="text"
                  placeholder="e.g. Acme Industries"
                  value={vendorName}
                  onChange={(e) =>
                    setVendorName(e.target.value)
                  }
                  autoFocus
                />
              </div>

              <div className="modal-form-group">
                <label htmlFor="vendorCategory">
                  Category
                </label>

                <select
                  id="vendorCategory"
                  value={vendorCategory}
                  onChange={(e) =>
                    setVendorCategory(e.target.value)
                  }
                >
                  <option>Technology</option>
                  <option>Office Supplies</option>
                  <option>Software</option>
                  <option>Logistics</option>
                  <option>Raw Materials</option>
                  <option>Packaging</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="modal-form-group">
                <label htmlFor="vendorEmail">
                  Email address
                </label>

                <input
                  id="vendorEmail"
                  type="email"
                  placeholder="vendor@company.com"
                  value={vendorEmail}
                  onChange={(e) =>
                    setVendorEmail(e.target.value)
                  }
                />
              </div>

              <div className="modal-form-group">
                <label htmlFor="vendorPhone">
                  Phone number
                </label>

                <input
                  id="vendorPhone"
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  value={vendorPhone}
                  onChange={(e) =>
                    setVendorPhone(e.target.value)
                  }
                />
              </div>

              <div className="modal-actions">

                <button
                  type="button"
                  className="cancel-button"
                  onClick={() =>
                    setShowModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-vendor-button"
                >
                  Add Vendor
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}