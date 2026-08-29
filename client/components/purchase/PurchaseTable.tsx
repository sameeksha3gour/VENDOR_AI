"use client";

import usePurchase from "@/hooks/usePurchase";

interface Props {
  search: string;
}

export default function PurchaseTable({
  search,
}: Props) {
  const {
    purchases,
    loading,
    removePurchase,
    changePaymentStatus,
  } = usePurchase();

  if (loading) {
    return (
      <div className="mt-8 rounded-2xl bg-white p-10 text-center shadow-sm">
        Loading Purchases...
      </div>
    );
  }

  const filteredPurchases =
    purchases.filter((purchase) =>
      purchase.purchaseNumber
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

  const getStatusClass = (
    status: string
  ) => {
    if (status === "Paid") {
      return "bg-green-100 text-green-700";
    }

    if (status === "Partially Paid") {
      return "bg-yellow-100 text-yellow-700";
    }

    return "bg-red-100 text-red-700";
  };

  return (
    <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow-sm">

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-4 text-left">
                Purchase No.
              </th>

              <th className="text-left">
                Vendor
              </th>

              <th className="text-left">
                Date
              </th>

              <th className="text-left">
                Amount
              </th>

              <th className="text-left">
                Payment Status
              </th>

              <th className="text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredPurchases.length ===
            0 ? (
              <tr>

                <td
                  colSpan={6}
                  className="p-10 text-center text-gray-500"
                >
                  No Purchases Found
                </td>

              </tr>
            ) : (
              filteredPurchases.map(
                (purchase) => (

                  <tr
                    key={purchase._id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="p-4 font-semibold">
                      {
                        purchase.purchaseNumber
                      }
                    </td>

                    <td>
                      {typeof purchase.vendor ===
                      "object"
                        ? purchase.vendor
                            ?.businessName
                        : purchase.vendor}
                    </td>

                    <td>
                      {purchase.purchaseDate
                        ? new Date(
                            purchase.purchaseDate
                          ).toLocaleDateString(
                            "en-IN"
                          )
                        : "-"}
                    </td>

                    <td className="font-semibold">
                      ₹
                      {purchase.grandTotal.toLocaleString(
                        "en-IN",
                        {
                          minimumFractionDigits: 2,
                        }
                      )}
                    </td>

                    <td>

                      <select
                        value={
                          purchase.paymentStatus
                        }
                        onChange={(e) =>
                          changePaymentStatus(
                            purchase._id!,
                            e.target.value as
                              | "Pending"
                              | "Partially Paid"
                              | "Paid"
                          )
                        }
                        className={`rounded-full border-none px-3 py-1 text-sm font-medium ${getStatusClass(
                          purchase.paymentStatus
                        )}`}
                      >

                        <option value="Pending">
                          Pending
                        </option>

                        <option value="Partially Paid">
                          Partially Paid
                        </option>

                        <option value="Paid">
                          Paid
                        </option>

                      </select>

                    </td>

                    <td className="space-x-2 text-center">

                      <button
                        className="rounded-lg bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                      >
                        View
                      </button>

                      <button
                        className="rounded-lg bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                        onClick={() => {
                          if (
                            window.confirm(
                              "Delete this purchase?"
                            )
                          ) {
                            removePurchase(
                              purchase._id!
                            );
                          }
                        }}
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                )
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}