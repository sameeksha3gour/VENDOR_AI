"use client";

import { useState } from "react";

import useInventory from "@/hooks/useInventory";

import InventoryForm from "./InventoryForm";

export default function InventoryDashboard() {
  const {
    inventory,
    loading,
    addInventory,
  } = useInventory();

  const [showForm, setShowForm] =
    useState(false);

  return (
    <div className="min-h-screen bg-slate-50 p-6">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Inventory
          </h1>

          <p className="text-gray-500">
            Manage Products
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            setShowForm(true)
          }
          className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white"
        >
          + Add Product
        </button>

      </div>

      {/* Stats */}

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">

        <div className="rounded-xl bg-white p-5 shadow">
          <p className="text-gray-500">
            Total Products
          </p>

          <h2 className="text-3xl font-bold">
            {inventory.length}
          </h2>
        </div>

        <div className="rounded-xl bg-white p-5 shadow">
          <p className="text-gray-500">
            Low Stock
          </p>

          <h2 className="text-3xl font-bold">
            {
              inventory.filter(
                (item) =>
                  item.quantity <=
                  item.minimumStock
              ).length
            }
          </h2>
        </div>

        <div className="rounded-xl bg-white p-5 shadow">
          <p className="text-gray-500">
            Expiring Soon
          </p>

          <h2 className="text-3xl font-bold">
            0
          </h2>
        </div>

        <div className="rounded-xl bg-white p-5 shadow">
          <p className="text-gray-500">
            Inventory Value
          </p>

          <h2 className="text-3xl font-bold">
            ₹
            {inventory
              .reduce(
                (total, item) =>
                  total +
                  item.quantity *
                    item.purchasePrice,
                0
              )
              .toFixed(2)}
          </h2>
        </div>

      </div>

      {/* Add Product */}

      {showForm && (
        <div className="mb-6">

          <InventoryForm
            onSubmit={async (data) => {
              await addInventory(data);
              setShowForm(false);
            }}
            onCancel={() =>
              setShowForm(false)
            }
          />

        </div>
      )}

      {/* Products */}

      <div className="overflow-x-auto rounded-xl bg-white shadow">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>
              <th className="p-3 text-left">
                SKU
              </th>

              <th className="p-3 text-left">
                Product
              </th>

              <th className="p-3 text-left">
                Category
              </th>

              <th className="p-3 text-left">
                Quantity
              </th>

              <th className="p-3 text-left">
                Warehouse
              </th>

              <th className="p-3 text-left">
                Status
              </th>
            </tr>

          </thead>

          <tbody>

            {loading ? (
              <tr>
                <td
                  colSpan={6}
                  className="p-6 text-center"
                >
                  Loading...
                </td>
              </tr>
            ) : inventory.length ===
              0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="p-6 text-center"
                >
                  No Products Found
                </td>
              </tr>
            ) : (
              inventory.map(
                (item) => (
                  <tr
                    key={item._id}
                    className="border-t"
                  >
                    <td className="p-3">
                      {item.sku}
                    </td>

                    <td className="p-3">
                      {item.productName}
                    </td>

                    <td className="p-3">
                      {item.category}
                    </td>

                    <td className="p-3">
                      {item.quantity}
                    </td>

                    <td className="p-3">
                      {item.warehouse ||
                        "-"}
                    </td>

                    <td className="p-3">
                      {item.status ||
                        "Active"}
                    </td>
                  </tr>
                )
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}