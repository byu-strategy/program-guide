"use client";

import type { Person, Experience, Education } from "@/types/database";
import { ROLE_BUCKET_COLORS } from "@/types/database";

interface ExpandableRowProps {
  person: Person;
  experiences: Experience[];
  education: Education[];
}

type TimelineItem =
  | { type: "job"; data: Experience; date: string }
  | { type: "edu"; data: Education; date: string };

function formatDate(d: string | null): string {
  if (!d) return "";
  // Handle YYYY-MM format
  const parts = d.split("-");
  if (parts.length >= 2) {
    const months = [
      "", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    const month = parseInt(parts[1]);
    return `${months[month] || ""} ${parts[0]}`;
  }
  return d;
}

export default function ExpandableRow({
  person,
  experiences,
  education,
}: ExpandableRowProps) {
  // Merge experiences and education into a single timeline, sorted by date descending
  const items: TimelineItem[] = [];

  for (const exp of experiences) {
    items.push({
      type: "job",
      data: exp,
      date: exp.start_date || "0000",
    });
  }

  for (const edu of education) {
    items.push({
      type: "edu",
      data: edu,
      date: edu.end_date || edu.start_date || "0000",
    });
  }

  items.sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="max-w-2xl">
      {/* Bio */}
      {person.bio && (
        <p className="mb-4 text-sm leading-relaxed text-slate-gray">
          {person.bio}
        </p>
      )}

      {/* Location + contact */}
      <div className="mb-4 flex flex-wrap gap-4 text-xs text-slate-gray">
        {person.location_city && (
          <span>
            {[person.location_city, person.location_state, person.location_country]
              .filter(Boolean)
              .join(", ")}
          </span>
        )}
        {person.grad_date && (
          <span>Graduated {formatDate(person.grad_date)}</span>
        )}
      </div>

      {/* Timeline */}
      {items.length > 0 ? (
        <div className="relative ml-3 border-l-2 border-navy/10 pl-5 space-y-5">
          {items.map((item, i) => {
            if (item.type === "job") {
              const exp = item.data as Experience;
              return (
                <div key={`exp-${exp.id}`} className="relative">
                  <div className="absolute -left-[25px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-navy" />
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="font-heading text-sm font-bold text-navy">
                        {exp.job_title || "Unknown Role"}
                      </p>
                      <p className="text-xs text-slate-gray">
                        {exp.company_name || "Unknown Company"}
                      </p>
                    </div>
                    {exp.role_bucket && (
                      <span
                        className="rounded-full px-2 py-0.5 font-heading text-[9px] font-semibold uppercase tracking-wider text-white"
                        style={{
                          backgroundColor:
                            ROLE_BUCKET_COLORS[exp.role_bucket] || "#7C878E",
                        }}
                      >
                        {exp.role_bucket}
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-[11px] text-slate-gray/60">
                    {formatDate(exp.start_date) || "?"} &ndash;{" "}
                    {exp.is_current ? (
                      <span className="font-semibold text-green">Present</span>
                    ) : (
                      formatDate(exp.end_date) || "?"
                    )}
                  </p>
                </div>
              );
            } else {
              const edu = item.data as Education;
              return (
                <div key={`edu-${edu.id}`} className="relative">
                  <div className="absolute -left-[25px] top-1.5 flex h-2.5 w-2.5 items-center justify-center rounded-full border-2 border-white bg-yellow" />
                  <div>
                    <p className="font-heading text-sm font-bold text-navy">
                      <span className="mr-1.5">&#127891;</span>
                      {edu.degree || "Degree"}{" "}
                      {edu.major && (
                        <span className="font-normal text-slate-gray">
                          in {edu.major}
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-slate-gray">
                      {edu.school_name || "Unknown School"}
                    </p>
                  </div>
                  <p className="mt-0.5 text-[11px] text-slate-gray/60">
                    {formatDate(edu.start_date) || "?"} &ndash;{" "}
                    {formatDate(edu.end_date) || "?"}
                  </p>
                </div>
              );
            }
          })}
        </div>
      ) : (
        <p className="text-sm text-slate-gray">No career records available.</p>
      )}
    </div>
  );
}
