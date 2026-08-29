"use client";

import useInventory from "@/hooks/useInventory";

interface Props {
  search: string;
}

export default function InventoryTable({
  search,
}: Props) {

  const {
    inventory,
    loading,
    removeProduct,
  } = useInventory();

  if (loading) {
    return (
      <div className="mt-8 rounded-xl bg-white p-10 shadow-sm text-center">
        Loading Inventory...
      </div>
    );
  }

  const filteredProducts = inventory.filter((item) =>
    item.productName
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow-sm">

      <table className="w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="p-4 text-left">SKU</th>

            <th className="text-left">Product</th>

            <th className="text-left">Category</th>

            <th className="text-left">Quantity</th>

            <th className="text-left">Warehouse</th>

            <th className="text-left">Expiry</th>

            <th className="text-center">Status</th>

            <th className="text-center">Actions</th>

          </tr>

        </thead>

        <tbody>

          {filteredProducts.length === 0 ? (

            <tr>

              <td
                colSpan={8}
                className="p-10 text-center text-gray-500"
              >
                No Products Found
              </td>

            </tr>

          ) : (

            filteredProducts.map((item) => {

              const status =
                item.quantity <= item.minimumStock
                  ? "Low Stock"
                  : "In Stock";

              return (

                <tr
                  key={item._id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-4 font-medium">
                    {item.sku}
                  </td>

                  <td>{item.productName}</td>

                  <td>{item.category}</td>

                  <td>{item.quantity}</td>

                  <td>{item.warehouse}</td>

                  <td>
                    {item.expiryDate
                      ? item.expiryDate.slice(0, 10)
                      : "-"}
                  </td>

                  <td className="text-center">

                    <span
                      className={`rounded-full px-3 py-1 text-sm text-white ${
                        status === "Low Stock"
                          ? "bg-red-500"
                          : "bg-green-500"
                      }`}
                    >
                      {status}
                    </span>

                  </td>

                  <td className="space-x-2 text-center">

                    <button
                      className="rounded-lg bg-blue-500 px-3 py-1 text-white"
                    >
                      View
                    </button>

                    <button
                      className="rounded-lg bg-yellow-500 px-3 py-1 text-white"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => removeProduct(item._id!)}
                      className="rounded-lg bg-red-500 px-3 py-1 text-white"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              );

            })

          )}

        </tbody>

      </table>

    </div>
  );
}