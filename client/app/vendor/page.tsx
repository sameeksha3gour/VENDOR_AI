"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import AddVendorModal from "@/components/vendor/AddVendorModal";

interface Vendor {
  _id: string;
  businessName: string;
  ownerName?: string;
  email?: string;
  phone?: string;
  gstNumber?: string;
  address?: string;
  category?: string;
}

export default function VendorPage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const loadVendors = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/vendors"
      );

      setVendors(response.data.vendors || []);
    } catch (error) {
      console.error("Failed to load vendors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVendors();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 p-6">

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Vendor Management
          </h1>

          <p className="mt-1 text-gray-600">
            Manage your suppliers and vendors
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          + Add Vendor
        </button>
      </div>

      {/* Vendor Table */}
      <div className="overflow-hidden rounded-xl bg-white shadow">

        <div className="border-b p-5">
          <h2 className="text-xl font-bold text-gray-900">
            Vendors
          </h2>

          <p className="text-sm text-gray-500">
            {vendors.length} vendor(s)
          </p>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-500">
            Loading vendors...
          </div>
        ) : vendors.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            <p className="text-lg font-medium">
              No vendors found.
            </p>

            <p className="mt-1">
              Click "+ Add Vendor" to create your first vendor.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4 text-left">Business Name</th>
                  <th className="p-4 text-left">Owner</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Phone</th>
                  <th className="p-4 text-left">GST Number</th>
                  <th className="p-4 text-left">Category</th>
                </tr>
              </thead>

              <tbody>
                {vendors.map((vendor) => (
                  <tr
                    key={vendor._id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-4 font-medium">
                      {vendor.businessName}
                    </td>

                    <td className="p-4">
                      {vendor.ownerName || "-"}
                    </td>

                    <td className="p-4">
                      {vendor.email || "-"}
                    </td>

                    <td className="p-4">
                      {vendor.phone || "-"}
                    </td>

                    <td className="p-4">
                      {vendor.gstNumber || "-"}
                    </td>

                    <td className="p-4">
                      {vendor.category || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Vendor Modal */}
      <AddVendorModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={loadVendors}
      />

    </main>
  );
}