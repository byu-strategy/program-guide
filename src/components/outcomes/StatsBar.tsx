"use client";

interface StatsBarProps {
  totalGrads: number;
  consultingPct: number;
  corpStratPct: number;
  productPct: number;
  companiesRepresented: number;
}

export default function StatsBar({
  totalGrads,
  consultingPct,
  corpStratPct,
  productPct,
  companiesRepresented,
}: StatsBarProps) {
  const stats = [
    { value: totalGrads.toLocaleString(), label: "Graduates Tracked" },
    { value: `${consultingPct}%`, label: "Consulting" },
    { value: `${corpStratPct}%`, label: "Corporate Strategy" },
    { value: `${productPct}%`, label: "Product Management" },
    { value: companiesRepresented.toLocaleString(), label: "Companies" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white px-5 py-4 text-center shadow-xs"
        >
          <p className="font-heading text-2xl font-bold text-navy">
            {stat.value}
          </p>
          <p className="mt-1 font-heading text-[10px] font-medium uppercase tracking-wider text-slate-gray">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
