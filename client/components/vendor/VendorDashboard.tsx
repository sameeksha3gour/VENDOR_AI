"use client";

import { useState } from "react";

import useVendor from "@/hooks/useVendor";

export default function VendorDashboard() {
  const {
    vendors,
    loading,
    addVendor,
    removeVendor,
  } = useVendor();

  const [showForm, setShowForm] =
    useState(false);

  const [form, setForm] = useState({
    businessName: "",
    ownerName: "",
    email: "",
    phone: "",
    gstNumber: "",
    address: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!form.businessName.trim()) {
      alert("Business name is required.");
      return;
    }

    if (!form.ownerName.trim()) {
      alert("Owner name is required.");
      return;
    }

    try {
      await addVendor(form as any);

      setForm({
        businessName: "",
        ownerName: "",
        email: "",
        phone: "",
        gstNumber: "",
        address: "",
      });

      setShowForm(false);

      alert("Vendor created successfully.");
    } catch (error) {
      console.error(
        "Create Vendor Error:",
        error
      );

      alert("Unable to create vendor.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Vendor Management
          </h1>

          <p className="text-gray-500">
            Manage your vendors and suppliers
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            setShowForm(!showForm)
          }
          className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white"
        >
          {showForm
            ? "Close"
            : "+ Add Vendor"}
        </button>

      </div>

      {/* Add Vendor Form */}

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-6 rounded-xl bg-white p-6 shadow"
        >

          <h2 className="mb-5 text-xl font-bold">
            Add New Vendor
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

            <input
              name="businessName"
              placeholder="Business Name"
              value={form.businessName}
              onChange={handleChange}
              className="rounded-lg border p-3"
              required
            />

            <input
              name="ownerName"
              placeholder="Owner Name"
              value={form.ownerName}
              onChange={handleChange}
              className="rounded-lg border p-3"
              required
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="rounded-lg border p-3"
            />

            <input
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              className="rounded-lg border p-3"
            />

            <input
              name="gstNumber"
              placeholder="GST Number"
              value={form.gstNumber}
              onChange={handleChange}
              className="rounded-lg border p-3"
            />

            <input
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              className="rounded-lg border p-3"
            />

          </div>

          <button
            type="submit"
            className="mt-5 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white"
          >
            Save Vendor
          </button>

        </form>
      )}

      {/* Vendor Table */}

      <div className="overflow-x-auto rounded-xl bg-white shadow">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>
              <th className="p-3 text-left">
                Business Name
              </th>

              <th className="p-3 text-left">
                Owner
              </th>

              <th className="p-3 text-left">
                GST Number
              </th>

              <th className="p-3 text-left">
                Phone
              </th>

              <th className="p-3 text-left">
                Email
              </th>

              <th className="p-3 text-left">
                Action
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
                  Loading vendors...
                </td>
              </tr>
            ) : vendors.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="p-6 text-center"
                >
                  No Vendors Found
                </td>
              </tr>
            ) : (
              vendors.map((vendor) => (
                <tr
                  key={vendor._id}
                  className="border-t"
                >

                  <td className="p-3">
                    {vendor.businessName}
                  </td>

                  <td className="p-3">
                    {vendor.ownerName}
                  </td>

                  <td className="p-3">
                    {vendor.gstNumber || "-"}
                  </td>

                  <td className="p-3">
                    {vendor.phone || "-"}
                  </td>

                  <td className="p-3">
                    {vendor.email || "-"}
                  </td>

                  <td className="p-3">
                    <button
                      type="button"
                      onClick={async () => {
                        if (
                          !vendor._id
                        ) {
                          return;
                        }

                        if (
                          confirm(
                            "Delete this vendor?"
                          )
                        ) {
                          await removeVendor(
                            vendor._id
                          );
                        }
                      }}
                      className="rounded-lg bg-red-500 px-3 py-2 text-white"
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}