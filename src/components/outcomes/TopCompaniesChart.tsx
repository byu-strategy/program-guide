"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface TopCompaniesChartProps {
  data: { name: string; count: number }[];
}

export default function TopCompaniesChart({ data }: TopCompaniesChartProps) {
  return (
    <div className="bg-white p-6 shadow-xs">
      <h3 className="mb-4 font-heading text-lg font-bold text-navy">
        Top 25 Employers (First Job)
      </h3>
      <div className="h-[600px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ left: 140, right: 20, top: 10, bottom: 10 }}
          >
            <XAxis type="number" tick={{ fontFamily: "var(--font-heading)", fontSize: 11 }} />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fontFamily: "var(--font-heading)", fontSize: 11 }}
              width={130}
            />
            <Tooltip
              formatter={(value) => [`${value} hires`, "Count"]}
              contentStyle={{
                fontFamily: "var(--font-heading)",
                fontSize: "13px",
                border: "none",
                boxShadow: "0 4px 20px rgba(0,46,93,0.08)",
              }}
            />
            <Bar dataKey="count" radius={[0, 4, 4, 0]}>
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={index < 5 ? "#002E5D" : index < 10 ? "#003DA5" : "#5B7F95"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
