"use client";

import { Sparkles } from "lucide-react";

export default function AIAssistant() {
  return (
    <div className="rounded-3xl bg-gradient-to-r from-blue-700 to-cyan-500 p-8 text-white shadow-lg">

      <div className="flex items-center gap-4">

        <Sparkles size={34} />

        <div>

          <h2 className="text-2xl font-bold">
            AI Business Insight
          </h2>

          <p className="mt-2 text-blue-100">
            Revenue increased by 12% this week.
            Consider restocking your top-selling products.
          </p>

        </div>

      </div>

    </div>
  );
}