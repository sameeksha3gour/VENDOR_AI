"use client";

import {
  Plus,
  FileText,
  ShoppingCart,
  Users,
} from "lucide-react";

const actions = [
  {
    title: "New Invoice",
    icon: FileText,
  },
  {
    title: "Add Vendor",
    icon: Users,
  },
  {
    title: "New Sale",
    icon: ShoppingCart,
  },
  {
    title: "Create",
    icon: Plus,
  },
];

export default function QuickActions() {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">

      <h2 className="mb-6 text-2xl font-bold">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-5">

        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              className="rounded-2xl border p-6 transition hover:bg-blue-600 hover:text-white"
            >
              <Icon className="mx-auto mb-3" />

              <p>{action.title}</p>

            </button>
          );
        })}

      </div>

    </div>
  );
}