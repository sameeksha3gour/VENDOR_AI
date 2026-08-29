"use client";

import { useState } from "react";

import useVendor from "@/hooks/useVendor";
import useInventory from "@/hooks/useInventory";

interface PurchaseItem {
  product: string;
  quantity: number;
  purchasePrice: number;
  gstRate: number;
}

interface PurchaseFormData {
  vendor: string;
  purchaseDate: string;
  items: PurchaseItem[];
  remarks: string;
  paymentStatus:
    | "Pending"
    | "Partially Paid"
    | "Paid";
}

interface Props {
  onSubmit: (
    data: PurchaseFormData
  ) => void | Promise<void>;
}

export default function PurchaseForm({
  onSubmit,
}: Props) {
  const { vendors } = useVendor();
  const { inventory } = useInventory();

  const [purchase, setPurchase] = useState({
    vendor: "",
    purchaseDate: new Date()
      .toISOString()
      .substring(0, 10),
    remarks: "",
    paymentStatus:
      "Pending" as
        | "Pending"
        | "Partially Paid"
        | "Paid",
  });

  const [items, setItems] =
    useState<PurchaseItem[]>([
      {
        product: "",
        quantity: 1,
        purchasePrice: 0,
        gstRate: 18,
      },
    ]);

  const [saving, setSaving] = useState(false);

  // ==========================================
  // Purchase Details
  // ==========================================

  const handlePurchaseChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
        HTMLSelectElement |
        HTMLTextAreaElement
    >
  ) => {
    setPurchase((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ==========================================
  // Product Selection
  // ==========================================

  const handleProductChange = (
    index: number,
    productId: string
  ) => {
    setItems((prev) => {
      const updated = [...prev];

      updated[index] = {
        ...updated[index],
        product: productId,
      };

      const selectedProduct = inventory.find(
        (product) =>
          product._id === productId
      );

      if (selectedProduct) {
        updated[index].purchasePrice =
          Number(
            selectedProduct.purchasePrice || 0
          );
      }

      return updated;
    });
  };

  // ==========================================
  // Quantity
  // ==========================================

  const handleQuantityChange = (
    index: number,
    quantity: number
  ) => {
    setItems((prev) => {
      const updated = [...prev];

      updated[index] = {
        ...updated[index],
        quantity,
      };

      return updated;
    });
  };

  // ==========================================
  // Purchase Price
  // ==========================================

  const handlePriceChange = (
    index: number,
    purchasePrice: number
  ) => {
    setItems((prev) => {
      const updated = [...prev];

      updated[index] = {
        ...updated[index],
        purchasePrice,
      };

      return updated;
    });
  };

  // ==========================================
  // GST
  // ==========================================

  const handleGSTChange = (
    index: number,
    gstRate: number
  ) => {
    setItems((prev) => {
      const updated = [...prev];

      updated[index] = {
        ...updated[index],
        gstRate,
      };

      return updated;
    });
  };

  // ==========================================
  // Add Product
  // ==========================================

  const addRow = () => {
    setItems((prev) => [
      ...prev,
      {
        product: "",
        quantity: 1,
        purchasePrice: 0,
        gstRate: 18,
      },
    ]);
  };

  // ==========================================
  // Remove Product
  // ==========================================

  const removeRow = (index: number) => {
    if (items.length === 1) {
      return;
    }

    setItems((prev) =>
      prev.filter(
        (_, itemIndex) =>
          itemIndex !== index
      )
    );
  };

  // ==========================================
  // Calculations
  // ==========================================

  const subtotal = items.reduce(
    (sum, item) =>
      sum +
      Number(item.quantity || 0) *
        Number(item.purchasePrice || 0),
    0
  );

  const gstAmount = items.reduce(
    (sum, item) => {
      const itemTotal =
        Number(item.quantity || 0) *
        Number(item.purchasePrice || 0);

      return (
        sum +
        (itemTotal *
          Number(item.gstRate || 0)) /
          100
      );
    },
    0
  );

  const grandTotal =
    subtotal + gstAmount;

  // ==========================================
  // Submit
  // ==========================================

  const handleSubmit = async () => {
    if (!purchase.vendor) {
      alert("Please select a vendor.");
      return;
    }

    const invalidItem = items.some(
      (item) =>
        !item.product ||
        item.quantity <= 0 ||
        item.purchasePrice < 0
    );

    if (invalidItem) {
      alert(
        "Please select a product and enter valid quantity and price."
      );
      return;
    }

    try {
      setSaving(true);

      const payload: PurchaseFormData = {
        vendor: purchase.vendor,
        purchaseDate:
          purchase.purchaseDate,
        items,
        remarks: purchase.remarks,
        paymentStatus:
          purchase.paymentStatus,
      };

      await onSubmit(payload);
    } catch (error) {
      console.error(
        "Purchase Submit Error:",
        error
      );

      alert(
        "Unable to save purchase."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">

      {/* ======================================
          Purchase Information
      ======================================= */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

        <select
          name="vendor"
          value={purchase.vendor}
          onChange={handlePurchaseChange}
          className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500"
        >
          <option value="">
            Select Vendor
          </option>

          {vendors.map((vendor) => (
            <option
              key={vendor._id}
              value={vendor._id}
            >
              {vendor.businessName}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="purchaseDate"
          value={purchase.purchaseDate}
          onChange={handlePurchaseChange}
          className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500"
        />

        <select
          name="paymentStatus"
          value={purchase.paymentStatus}
          onChange={handlePurchaseChange}
          className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500"
        >
          <option value="Pending">
            Pending
          </option>

          <option value="Partially Paid">
            Partially Paid
          </option>

          <option value="Paid">
            Paid
          </option>
        </select>

        <textarea
          name="remarks"
          placeholder="Remarks"
          value={purchase.remarks}
          onChange={handlePurchaseChange}
          className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500"
          rows={1}
        />

      </div>

      {/* ======================================
          Products
      ======================================= */}

      <div className="rounded-xl border">

        <div className="overflow-x-auto">

          <table className="min-w-[850px] w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="p-4 text-left">
                  Product
                </th>

                <th className="p-4 text-left">
                  Quantity
                </th>

                <th className="p-4 text-left">
                  Purchase Price
                </th>

                <th className="p-4 text-left">
                  GST %
                </th>

                <th className="p-4 text-left">
                  Total
                </th>

                <th className="p-4 text-center">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {items.map(
                (item, index) => {

                  const itemTotal =
                    item.quantity *
                    item.purchasePrice;

                  return (
                    <tr
                      key={index}
                      className="border-t"
                    >

                      <td className="p-3">

                        <select
                          value={
                            item.product
                          }
                          onChange={(e) =>
                            handleProductChange(
                              index,
                              e.target.value
                            )
                          }
                          className="w-full min-w-[180px] rounded-lg border border-gray-300 p-2"
                        >

                          <option value="">
                            Select Product
                          </option>

                          {inventory.map(
                            (product) => (
                              <option
                                key={
                                  product._id
                                }
                                value={
                                  product._id
                                }
                              >
                                {
                                  product.productName
                                }
                              </option>
                            )
                          )}

                        </select>

                      </td>

                      <td className="p-3">

                        <input
                          type="number"
                          min="1"
                          value={
                            item.quantity
                          }
                          onChange={(e) =>
                            handleQuantityChange(
                              index,
                              Number(
                                e.target.value
                              )
                            )
                          }
                          className="w-24 rounded-lg border border-gray-300 p-2"
                        />

                      </td>

                      <td className="p-3">

                        <input
                          type="number"
                          min="0"
                          value={
                            item.purchasePrice
                          }
                          onChange={(e) =>
                            handlePriceChange(
                              index,
                              Number(
                                e.target.value
                              )
                            )
                          }
                          className="w-32 rounded-lg border border-gray-300 p-2"
                        />

                      </td>

                      <td className="p-3">

                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={
                            item.gstRate
                          }
                          onChange={(e) =>
                            handleGSTChange(
                              index,
                              Number(
                                e.target.value
                              )
                            )
                          }
                          className="w-20 rounded-lg border border-gray-300 p-2"
                        />

                      </td>

                      <td className="p-3 font-semibold">

                        ₹
                        {itemTotal.toLocaleString(
                          "en-IN",
                          {
                            minimumFractionDigits:
                              2,
                          }
                        )}

                      </td>

                      <td className="p-3 text-center">

                        <button
                          type="button"
                          onClick={() =>
                            removeRow(
                              index
                            )
                          }
                          disabled={
                            items.length ===
                            1
                          }
                          className="rounded-lg bg-red-500 px-3 py-2 text-sm text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          Delete
                        </button>

                      </td>

                    </tr>
                  );
                }
              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* ======================================
          Add Product
      ======================================= */}

      <button
        type="button"
        onClick={addRow}
        className="rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
      >
        + Add Product
      </button>

      {/* ======================================
          Summary
      ======================================= */}

      <div className="flex justify-end">

        <div className="w-full max-w-sm rounded-2xl bg-slate-100 p-4 sm:p-6">

          <div className="mb-3 flex justify-between">
            <span>
              Subtotal
            </span>

            <span>
              ₹
              {subtotal.toLocaleString(
                "en-IN",
                {
                  minimumFractionDigits:
                    2,
                }
              )}
            </span>
          </div>

          <div className="mb-3 flex justify-between">
            <span>
              GST
            </span>

            <span>
              ₹
              {gstAmount.toLocaleString(
                "en-IN",
                {
                  minimumFractionDigits:
                    2,
                }
              )}
            </span>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between text-xl font-bold">

            <span>
              Grand Total
            </span>

            <span>
              ₹
              {grandTotal.toLocaleString(
                "en-IN",
                {
                  minimumFractionDigits:
                    2,
                }
              )}
            </span>

          </div>

        </div>

      </div>

      {/* ======================================
          Save Purchase
      ======================================= */}

      <div className="flex justify-end border-t pt-4">

        <button
          type="button"
          onClick={handleSubmit}
          disabled={saving}
          className="w-full rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          {saving
            ? "Saving Purchase..."
            : "Save Purchase"}
        </button>

      </div>

    </div>
  );
}