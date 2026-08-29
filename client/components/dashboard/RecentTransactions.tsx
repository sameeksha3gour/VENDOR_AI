"use client";

const transactions = [
  {
    customer: "ABC Medical",
    invoice: "INV-1001",
    amount: "₹12,500",
    status: "Paid",
  },
  {
    customer: "Sun Pharma",
    invoice: "INV-1002",
    amount: "₹8,400",
    status: "Pending",
  },
  {
    customer: "Apollo Pharmacy",
    invoice: "INV-1003",
    amount: "₹21,000",
    status: "Paid",
  },
];

export default function RecentTransactions() {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">

      <h2 className="text-2xl font-bold mb-6">
        Recent Transactions
      </h2>

      <table className="w-full">

        <thead>

          <tr className="text-left border-b">

            <th className="pb-3">Customer</th>

            <th className="pb-3">Invoice</th>

            <th className="pb-3">Amount</th>

            <th className="pb-3">Status</th>

          </tr>

        </thead>

        <tbody>

          {transactions.map((item) => (

            <tr
              key={item.invoice}
              className="border-b last:border-none"
            >

              <td className="py-4">
                {item.customer}
              </td>

              <td>{item.invoice}</td>

              <td>{item.amount}</td>

              <td>

                <span
                  className={`rounded-full px-3 py-1 text-sm ${
                    item.status === "Paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {item.status}
                </span>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}