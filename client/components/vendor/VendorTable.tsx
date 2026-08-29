"use client";

import useVendor from "@/hooks/useVendor";
import VendorRow from "./VendorRow";
import { Vendor } from "@/types/vendor";

interface VendorTableProps {
  search: string;
  onView: (vendor: Vendor) => void;
}

export default function VendorTable({
  search,
  onView,
}: VendorTableProps) {
  const { vendors, loading, removeVendor } = useVendor();

  if (loading) {
    return (
      <div className="mt-8 rounded-2xl bg-white p-8 shadow-sm">
        <h2 className="text-center text-lg font-semibold">
          Loading Vendors...
        </h2>
      </div>
    );
  }

  const filteredVendors = vendors.filter((vendor: Vendor) =>
    vendor.businessName
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow-sm">
      <table className="w-full">

        <thead className="bg-slate-100">
          <tr>
            <th className="p-4 text-left">Business Name</th>
            <th className="text-left">GST Number</th>
            <th className="text-left">Phone</th>
            <th className="text-left">Risk</th>
            <th className="text-left">Outstanding</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>

        <tbody>

          {filteredVendors.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="p-8 text-center text-gray-500"
              >
                No Vendors Found
              </td>
            </tr>
          ) : (
            filteredVendors.map((vendor: Vendor) => (
              <VendorRow
                key={vendor._id}
                vendor={vendor}
                onView={onView}
                onEdit={() => {
                  console.log("Edit:", vendor);
                }}
                onDelete={(id) => removeVendor(id)}
              />
            ))
          )}

        </tbody>

      </table>
    </div>
  );
}