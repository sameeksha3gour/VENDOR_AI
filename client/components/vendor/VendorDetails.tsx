"use client";

import { Vendor } from "@/types/vendor";

interface VendorDetailsProps {
  vendor: Vendor | null;
  onClose: () => void;
}

export default function VendorDetails({
  vendor,
  onClose,
}: VendorDetailsProps) {
  if (!vendor) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30">

      <div className="h-full w-[450px] bg-white shadow-xl p-6 overflow-y-auto">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            Vendor Details
          </h2>

          <button
            onClick={onClose}
            className="text-xl"
          >
            ✕
          </button>

        </div>

        <div className="space-y-5">

          <Info label="Business Name" value={vendor.businessName} />

          <Info label="Owner" value={vendor.ownerName} />

          <Info label="Email" value={vendor.email} />

          <Info label="Phone" value={vendor.phone} />

          <Info label="GST Number" value={vendor.gstNumber} />

          <Info label="Address" value={vendor.address} />

          <Info label="City" value={vendor.city} />

          <Info label="State" value={vendor.state} />

          <Info label="Pincode" value={vendor.pincode} />

          <Info
            label="Outstanding"
            value={`₹${vendor.outstandingAmount}`}
          />

          <Info
            label="Risk"
            value={vendor.riskLevel}
          />

          <Info
            label="Rating"
            value={`⭐ ${vendor.vendorRating}`}
          />

        </div>

      </div>

    </div>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: any;
}) {
  return (
    <div>

      <p className="text-sm text-gray-500">
        {label}
      </p>

      <h3 className="text-lg font-semibold">
        {value || "-"}
      </h3>

    </div>
  );
}