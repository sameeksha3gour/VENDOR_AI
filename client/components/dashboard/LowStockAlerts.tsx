"use client";

import { TriangleAlert } from "lucide-react";

const items = [
  "Paracetamol - 8 Left",
  "Vitamin C - 5 Left",
  "Face Masks - 12 Left",
];

export default function LowStockAlerts() {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">

      <h2 className="mb-6 text-2xl font-bold">
        Low Stock Alerts
      </h2>

      <div className="space-y-4">

        {items.map((item) => (

          <div
            key={item}
            className="flex items-center gap-4 rounded-xl bg-red-50 p-4"
          >

            <TriangleAlert className="text-red-500" />

            <p>{item}</p>

          </div>

        ))}

      </div>

    </div>
  );
}