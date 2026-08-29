"use client";

import { useState } from "react";

import {
  CreateInventory,
} from "@/types/inventory";

interface Props {
  onSubmit: (
    data: CreateInventory
  ) => Promise<void>;

  onCancel?: () => void;
}

export default function InventoryForm({
  onSubmit,
  onCancel,
}: Props) {
  const [form, setForm] =
    useState<CreateInventory>({
      productName: "",
      sku: "",
      barcode: "",
      hsnCode: "",
      gstRate: 18,
      category: "",
      purchasePrice: 0,
      sellingPrice: 0,
      quantity: 0,
      minimumStock: 5,
      maximumStock: 100,
      warehouse: "",
      supplier: "",
      batchNumber: "",
      manufacturingDate: "",
      expiryDate: "",
      status: "Active",
    });

  const [saving, setSaving] =
    useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    const numberFields = [
      "gstRate",
      "purchasePrice",
      "sellingPrice",
      "quantity",
      "minimumStock",
      "maximumStock",
    ];

    setForm((prev) => ({
      ...prev,
      [name]: numberFields.includes(name)
        ? Number(value)
        : value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!form.productName.trim()) {
      alert("Product name is required.");
      return;
    }

    if (!form.sku.trim()) {
      alert("SKU is required.");
      return;
    }

    if (!form.category.trim()) {
      alert("Category is required.");
      return;
    }

    try {
      setSaving(true);

      await onSubmit(form);

      alert(
        "Product created successfully."
      );
    } catch (error) {
      console.error(
        "Create Product Error:",
        error
      );

      alert(
        "Unable to create product."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-xl bg-white p-6 shadow"
    >
      <h2 className="text-xl font-bold">
        Add Product
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

        <input
          name="productName"
          placeholder="Product Name"
          value={form.productName}
          onChange={handleChange}
          className="rounded-lg border p-3"
          required
        />

        <input
          name="sku"
          placeholder="SKU"
          value={form.sku}
          onChange={handleChange}
          className="rounded-lg border p-3"
          required
        />

        <input
          name="barcode"
          placeholder="Barcode"
          value={form.barcode}
          onChange={handleChange}
          className="rounded-lg border p-3"
        />

        <input
          name="hsnCode"
          placeholder="HSN Code"
          value={form.hsnCode}
          onChange={handleChange}
          className="rounded-lg border p-3"
        />

        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="rounded-lg border p-3"
          required
        />

        <input
          name="warehouse"
          placeholder="Warehouse"
          value={form.warehouse}
          onChange={handleChange}
          className="rounded-lg border p-3"
        />

        <input
          name="quantity"
          type="number"
          min="0"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
          className="rounded-lg border p-3"
        />

        <input
          name="minimumStock"
          type="number"
          min="0"
          placeholder="Minimum Stock"
          value={form.minimumStock}
          onChange={handleChange}
          className="rounded-lg border p-3"
        />

        <input
          name="maximumStock"
          type="number"
          min="0"
          placeholder="Maximum Stock"
          value={form.maximumStock}
          onChange={handleChange}
          className="rounded-lg border p-3"
        />

        <input
          name="purchasePrice"
          type="number"
          min="0"
          placeholder="Purchase Price"
          value={form.purchasePrice}
          onChange={handleChange}
          className="rounded-lg border p-3"
        />

        <input
          name="sellingPrice"
          type="number"
          min="0"
          placeholder="Selling Price"
          value={form.sellingPrice}
          onChange={handleChange}
          className="rounded-lg border p-3"
        />

        <input
          name="gstRate"
          type="number"
          min="0"
          max="100"
          placeholder="GST %"
          value={form.gstRate}
          onChange={handleChange}
          className="rounded-lg border p-3"
        />

        <input
          name="supplier"
          placeholder="Supplier ID"
          value={form.supplier}
          onChange={handleChange}
          className="rounded-lg border p-3"
        />

        <input
          name="batchNumber"
          placeholder="Batch Number"
          value={form.batchNumber}
          onChange={handleChange}
          className="rounded-lg border p-3"
        />

        <div>
          <label className="mb-1 block text-sm">
            Manufacturing Date
          </label>

          <input
            name="manufacturingDate"
            type="date"
            value={
              form.manufacturingDate
            }
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm">
            Expiry Date
          </label>

          <input
            name="expiryDate"
            type="date"
            value={form.expiryDate}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="rounded-lg border p-3"
        >
          <option value="Active">
            Active
          </option>

          <option value="Inactive">
            Inactive
          </option>
        </select>

      </div>

      <div className="flex gap-3">

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border px-5 py-3"
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white disabled:opacity-50"
        >
          {saving
            ? "Saving..."
            : "Save Product"}
        </button>

      </div>
    </form>
  );
}