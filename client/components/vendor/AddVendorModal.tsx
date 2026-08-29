"use client";

import { useState } from "react";
import { X } from "lucide-react";
import useVendor from "@/hooks/useVendor";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddVendorModal({
  open,
  onClose,
  onSuccess,
}: Props) {
  const { addVendor } = useVendor();

  const [form, setForm] = useState({
    businessName: "",
    ownerName: "",
    gstNumber: "",
    email: "",
    phone: "",
    address: "",
    category: "",
  });

  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
  if (
    !form.businessName.trim() ||
    !form.ownerName.trim() ||
    !form.gstNumber.trim() ||
    !form.email.trim() ||
    !form.phone.trim() ||
    !form.address.trim() ||
    !form.category.trim()
  ) {
    alert("Please fill all vendor fields.");
    return;
  }

  try {
    await addVendor(form);

    setForm({
      businessName: "",
      ownerName: "",
      gstNumber: "",
      email: "",
      phone: "",
      address: "",
      category: "",
    });

    onSuccess();
    onClose();
  } catch (error: any) {
    console.error("ADD VENDOR ERROR:", error);

    const message =
      error?.response?.data?.message ||
      "Unable to create vendor.";

    alert(message);
  }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-2xl">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Add Vendor
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Add a new supplier to your vendor database
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <div className="grid gap-5 md:grid-cols-2">

          <input
            name="businessName"
            placeholder="Business Name *"
            value={form.businessName}
            onChange={handleChange}
            className="rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500"
          />

          <input
            name="ownerName"
            placeholder="Owner Name"
            value={form.ownerName}
            onChange={handleChange}
            className="rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500"
          />

          <input
            name="gstNumber"
            placeholder="GST Number"
            value={form.gstNumber}
            onChange={handleChange}
            className="rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500"
          />

          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500"
          />

          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500"
          />
        </div>

        {/* Address */}
        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="mt-5 w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500"
        />

        {/* Buttons */}
        <div className="mt-8 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-1/3 rounded-xl border border-gray-300 py-3 font-semibold text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="w-2/3 rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Save Vendor
          </button>
        </div>

      </div>
    </div>
  );
}