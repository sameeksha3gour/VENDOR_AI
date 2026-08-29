"use client";

import { useState } from "react";

import PurchaseStats from "./PurchaseStats";
import PurchaseTable from "./PurchaseTable";
import AddPurchaseModal from "./AddPurchaseModal";

export default function PurchaseDashboard() {
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] =
    useState(false);

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Purchase Management
          </h1>

          <p className="mt-1 text-gray-500">
            Manage purchases, vendors and stock
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          + New Purchase
        </button>

      </div>

      {/* Statistics */}

      <PurchaseStats />

      {/* Search */}

      <div className="rounded-2xl bg-white p-5 shadow-sm">

        <input
          type="text"
          placeholder="Search by purchase number..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full rounded-xl border border-gray-200 p-3 outline-none transition focus:border-blue-500"
        />

      </div>

      {/* Purchase Table */}

      <PurchaseTable search={search} />

      {/* Add Purchase Modal */}

      <AddPurchaseModal
        open={showAddModal}
        onClose={() =>
          setShowAddModal(false)
        }
      />

    </div>
  );
}