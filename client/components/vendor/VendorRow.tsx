"use client";

import { Vendor } from "@/types/vendor";

interface Props {
  vendor: Vendor;
  onEdit: (vendor: Vendor) => void;
  onDelete: (id: string) => void;
  onView: (vendor: Vendor) => void;
}

export default function VendorRow({
  vendor,
  onEdit,
  onDelete,
  onView,
}: Props) {
  return (
    <tr className="border-b hover:bg-slate-50">

      <td className="p-4 font-medium">
        {vendor.businessName}
      </td>

      <td>{vendor.gstNumber}</td>

      <td>{vendor.phone}</td>

      <td>⭐ {vendor.vendorRating}</td>

      <td>

        <span
          className={`rounded-full px-3 py-1 text-sm text-white
            ${
              vendor.riskLevel === "Low"
                ? "bg-green-500"
                : vendor.riskLevel === "Medium"
                ? "bg-yellow-500"
                : "bg-red-500"
            }
          `}
        >
          {vendor.riskLevel}
        </span>

      </td>

      <td className="space-x-2">

        <button
          onClick={() => onView(vendor)}
          className="rounded bg-blue-500 px-3 py-1 text-white"
        >
          View
        </button>

        <button
          onClick={() => onEdit(vendor)}
          className="rounded bg-yellow-500 px-3 py-1 text-white"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(vendor._id)}
          className="rounded bg-red-500 px-3 py-1 text-white"
        >
          Delete
        </button>

      </td>

    </tr>
  );
}