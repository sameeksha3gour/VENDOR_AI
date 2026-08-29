"use client";

export default function RevenueChart() {
  return (
    <div className="mt-8 rounded-3xl bg-white p-8 shadow-sm">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-slate-800">
            Revenue Analytics
          </h2>

          <p className="mt-2 text-gray-500">
            Monthly revenue overview
          </p>

        </div>

        <select className="rounded-xl border px-4 py-2 outline-none">

          <option>This Month</option>

          <option>Last Month</option>

          <option>This Year</option>

        </select>

      </div>

      {/* Temporary Chart Placeholder */}

      <div className="mt-8 flex h-72 items-end justify-between gap-4">

        {[55, 82, 48, 95, 68, 90, 76].map((height, index) => (

          <div
            key={index}
            className="flex flex-1 flex-col items-center"
          >

            <div
              className="w-full rounded-t-xl bg-gradient-to-t from-blue-700 to-cyan-400 transition-all hover:scale-105"
              style={{
                height: `${height}%`,
              }}
            />

            <span className="mt-3 text-sm text-gray-500">

              {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][index]}

            </span>

          </div>

        ))}

      </div>

    </div>
  );
}