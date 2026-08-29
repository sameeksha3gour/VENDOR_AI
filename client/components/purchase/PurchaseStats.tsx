"use client";

import usePurchase from "@/hooks/usePurchase";

export default function PurchaseStats() {
  const { purchases, loading } = usePurchase();

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-28 animate-pulse rounded-2xl bg-gray-200"
          />
        ))}
      </div>
    );
  }

  // ==========================================
  // Calculate Statistics
  // ==========================================

  const totalPurchases = purchases.length;

  const totalAmount = purchases.reduce(
    (sum, purchase) =>
      sum + Number(purchase.grandTotal || 0),
    0
  );

  const pendingPurchases = purchases.filter(
    (purchase) =>
      purchase.paymentStatus === "Pending"
  ).length;

  const partiallyPaidPurchases =
    purchases.filter(
      (purchase) =>
        purchase.paymentStatus ===
        "Partially Paid"
    ).length;

  const paidPurchases = purchases.filter(
    (purchase) =>
      purchase.paymentStatus === "Paid"
  ).length;

  const outstandingAmount =
    purchases
      .filter(
        (purchase) =>
          purchase.paymentStatus !== "Paid"
      )
      .reduce(
        (sum, purchase) =>
          sum +
          Number(purchase.grandTotal || 0),
        0
      );

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

      {/* Total Purchases */}

      <div className="rounded-2xl bg-white p-6 shadow-sm">

        <p className="text-sm font-medium text-gray-500">
          Total Purchases
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          {totalPurchases}
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          All purchase records
        </p>

      </div>

      {/* Purchase Value */}

      <div className="rounded-2xl bg-white p-6 shadow-sm">

        <p className="text-sm font-medium text-gray-500">
          Purchase Value
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          ₹
          {totalAmount.toLocaleString(
            "en-IN",
            {
              minimumFractionDigits: 2,
            }
          )}
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Total purchase amount
        </p>

      </div>

      {/* Outstanding */}

      <div className="rounded-2xl bg-white p-6 shadow-sm">

        <p className="text-sm font-medium text-gray-500">
          Outstanding
        </p>

        <h2 className="mt-2 text-3xl font-bold text-red-600">
          ₹
          {outstandingAmount.toLocaleString(
            "en-IN",
            {
              minimumFractionDigits: 2,
            }
          )}
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Pending vendor payments
        </p>

      </div>

      {/* Paid */}

      <div className="rounded-2xl bg-white p-6 shadow-sm">

        <p className="text-sm font-medium text-gray-500">
          Paid Purchases
        </p>

        <h2 className="mt-2 text-3xl font-bold text-green-600">
          {paidPurchases}
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          {pendingPurchases} pending ·{" "}
          {partiallyPaidPurchases} partial
        </p>

      </div>

    </div>
  );
}