"use client";

export default function VendorStats() {
  const stats = [
    {
      title: "Total Vendors",
      value: "0",
    },
    {
      title: "Preferred Vendors",
      value: "0",
    },
    {
      title: "High Risk",
      value: "0",
    },
    {
      title: "Outstanding",
      value: "₹0",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => (
        <div
          key={item.title}
          className="rounded-2xl border bg-white p-6 shadow-sm"
        >
          <p className="text-sm text-gray-500">
            {item.title}
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {item.value}
          </h2>
        </div>
      ))}
    </div>
  );
}