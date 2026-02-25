"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ROLE_BUCKET_COLORS } from "@/types/database";

interface EraTrendsChartProps {
  data: Record<string, string | number>[];
  roleBuckets: string[];
}

export default function EraTrendsChart({ data, roleBuckets }: EraTrendsChartProps) {
  return (
    <div className="bg-white p-6 shadow-xs">
      <h3 className="mb-4 font-heading text-lg font-bold text-navy">
        Role Distribution by Cohort Era
      </h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ left: 10, right: 10, top: 10, bottom: 10 }}
          >
            <XAxis
              dataKey="era"
              tick={{ fontFamily: "var(--font-heading)", fontSize: 12 }}
            />
            <YAxis tick={{ fontFamily: "var(--font-heading)", fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                fontFamily: "var(--font-heading)",
                fontSize: "12px",
                border: "none",
                boxShadow: "0 4px 20px rgba(0,46,93,0.08)",
              }}
            />
            <Legend
              wrapperStyle={{
                fontFamily: "var(--font-heading)",
                fontSize: "10px",
              }}
            />
            {roleBuckets.map((bucket) => (
              <Bar
                key={bucket}
                dataKey={bucket}
                stackId="a"
                fill={ROLE_BUCKET_COLORS[bucket] || "#adb5bd"}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
