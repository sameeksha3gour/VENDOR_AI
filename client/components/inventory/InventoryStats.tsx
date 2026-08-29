"use client";

import useInventory from "@/hooks/useInventory";

export default function InventoryStats() {
  const { inventory } = useInventory();

  const totalProducts = inventory.length;

  const lowStock = inventory.filter(
    (item) => item.quantity <= item.minimumStock
  ).length;

  const inventoryValue = inventory.reduce(
    (total, item) =>
      total + item.quantity * item.purchasePrice,
    0
  );

  const expiringProducts = inventory.filter((item) => {
    if (!item.expiryDate) return false;

    const today = new Date();

    const expiry = new Date(item.expiryDate);

    const diff =
      (expiry.getTime() - today.getTime()) /
      (1000 * 60 * 60 * 24);

    return diff <= 30;
  }).length;

  const cards = [
    {
      title: "Total Products",
      value: totalProducts,
    },
    {
      title: "Low Stock",
      value: lowStock,
    },
    {
      title: "Expiring Soon",
      value: expiringProducts,
    },
    {
      title: "Inventory Value",
      value: `₹${inventoryValue.toLocaleString()}`,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-2xl bg-white p-6 shadow-sm"
        >
          <h3 className="text-gray-500">
            {card.title}
          </h3>

          <p className="mt-3 text-3xl font-bold">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}