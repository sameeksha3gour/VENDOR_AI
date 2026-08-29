"use client";

export default function BusinessHealth() {
  return (
    <div className="rounded-3xl bg-gradient-to-r from-emerald-500 to-green-600 p-8 text-white shadow-lg">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold">
            Business Health
          </h2>

          <p className="mt-2 text-green-100">
            Overall Performance Score
          </p>

        </div>

        <div className="text-6xl font-extrabold">
          94%
        </div>

      </div>

      <div className="mt-6 h-3 rounded-full bg-white/20">

        <div className="h-3 w-[94%] rounded-full bg-white" />

      </div>

    </div>
  );
}