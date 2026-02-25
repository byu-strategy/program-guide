"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  type PieLabelRenderProps,
} from "recharts";
import { ROLE_BUCKET_COLORS } from "@/types/database";

interface RoleBucketChartProps {
  data: { name: string; value: number; pct: number }[];
}

export default function RoleBucketChart({ data }: RoleBucketChartProps) {
  return (
    <div className="bg-white p-6 shadow-xs">
      <h3 className="mb-4 font-heading text-lg font-bold text-navy">
        First Job by Role
      </h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={140}
              paddingAngle={2}
              dataKey="value"
              nameKey="name"
              label={(props: PieLabelRenderProps) => {
                const name = props.name as string;
                const percent = props.percent as number;
                return percent >= 0.05 ? `${name} (${Math.round(percent * 100)}%)` : "";
              }}
              labelLine={false}
            >
              {data.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={ROLE_BUCKET_COLORS[entry.name] || "#adb5bd"}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [
                `${value} graduates`,
                name,
              ]}
              contentStyle={{
                fontFamily: "var(--font-heading)",
                fontSize: "13px",
                border: "none",
                boxShadow: "0 4px 20px rgba(0,46,93,0.08)",
              }}
            />
            <Legend
              wrapperStyle={{
                fontFamily: "var(--font-heading)",
                fontSize: "11px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
