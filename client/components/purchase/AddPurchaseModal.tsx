"use client";

import PurchaseForm from "./PurchaseForm";
import usePurchase from "@/hooks/usePurchase";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AddPurchaseModal({
  open,
  onClose,
}: Props) {
  const { addPurchase } = usePurchase();

  if (!open) {
    return null;
  }

  const handleSubmit = async (data: any) => {
    try {
      await addPurchase(data);

      alert("Purchase created successfully");

      onClose();
    } catch (error) {
      console.error(
        "Purchase Creation Error:",
        error
      );

      alert(
        "Unable to create purchase. Please try again."
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-5">

      <div className="flex max-h-[95vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex shrink-0 items-center justify-between border-b px-4 py-4 sm:px-6">

          <div>
            <h2 className="text-xl font-bold sm:text-2xl">
              New Purchase
            </h2>

            <p className="text-sm text-gray-500">
              Add products purchased from a vendor
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-gray-200 px-3 py-2 text-sm font-medium hover:bg-gray-300 sm:px-4"
          >
            Close
          </button>

        </div>

        {/* Form */}

        <div className="overflow-y-auto p-4 sm:p-6">
          <PurchaseForm
            onSubmit={handleSubmit}
          />
        </div>

      </div>

    </div>
  );
}