"use client";

import type { Experience } from "@/types/database";
import { ROLE_BUCKET_COLORS } from "@/types/database";

interface CareerTimelineProps {
  experiences: Experience[];
}

export default function CareerTimeline({ experiences }: CareerTimelineProps) {
  // Sort by start_date descending (most recent first), active removed_at excluded
  const sorted = experiences
    .filter((e) => !e.removed_at)
    .sort((a, b) => {
      if (!a.start_date && !b.start_date) return 0;
      if (!a.start_date) return 1;
      if (!b.start_date) return -1;
      return b.start_date.localeCompare(a.start_date);
    });

  if (sorted.length === 0) {
    return (
      <p className="text-sm text-slate-gray">No experience records available.</p>
    );
  }

  return (
    <div className="relative ml-4 border-l-2 border-navy/10 pl-6 space-y-6">
      {sorted.map((exp) => (
        <div key={exp.id} className="relative">
          {/* Dot */}
          <div className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-white bg-navy" />

          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <p className="font-heading text-sm font-bold text-navy">
                {exp.job_title || "Unknown Role"}
              </p>
              <p className="text-sm text-slate-gray">
                {exp.company_name || "Unknown Company"}
              </p>
            </div>
            {exp.role_bucket && (
              <span
                className="rounded-full px-2.5 py-0.5 font-heading text-[9px] font-semibold uppercase tracking-wider text-white"
                style={{
                  backgroundColor: ROLE_BUCKET_COLORS[exp.role_bucket] || "#7C878E",
                }}
              >
                {exp.role_bucket}
              </span>
            )}
          </div>

          <p className="mt-0.5 text-xs text-slate-gray/70">
            {exp.start_date || "?"} &ndash; {exp.end_date || "Present"}
            {exp.is_current && (
              <span className="ml-2 font-semibold text-green">Current</span>
            )}
          </p>
        </div>
      ))}
    </div>
  );
}
