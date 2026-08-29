"use client";

interface DashboardCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
}

export default function DashboardCard({
  title,
  value,
  subtitle,
}: DashboardCardProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border">

      <p className="text-gray-500 text-sm">

        {title}

      </p>

      <h2 className="mt-3 text-3xl font-bold">

        {value}

      </h2>

      {subtitle && (

        <p className="mt-2 text-green-600 text-sm">

          {subtitle}

        </p>

      )}

    </div>
  );
}