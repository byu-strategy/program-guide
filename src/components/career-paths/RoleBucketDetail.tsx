"use client";

import { useState } from "react";
import { ROLE_BUCKET_COLORS } from "@/types/database";
import Link from "next/link";

interface RoleBucketData {
  bucket: string;
  count: number;
  topCompanies: { name: string; count: number }[];
  commonTitles: { title: string; count: number }[];
}

interface RoleBucketDetailProps {
  buckets: RoleBucketData[];
}

export default function RoleBucketDetail({ buckets }: RoleBucketDetailProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      {buckets.map((b) => (
        <div key={b.bucket} className="bg-white shadow-xs">
          <button
            onClick={() =>
              setExpanded(expanded === b.bucket ? null : b.bucket)
            }
            className="flex w-full items-center justify-between px-5 py-4 text-left"
          >
            <div className="flex items-center gap-3">
              <div
                className="h-3 w-3 rounded-full"
                style={{
                  backgroundColor: ROLE_BUCKET_COLORS[b.bucket] || "#7C878E",
                }}
              />
              <span className="font-heading text-sm font-bold text-navy">
                {b.bucket}
              </span>
              <span className="font-heading text-xs text-slate-gray">
                {b.count} graduates
              </span>
            </div>
            <svg
              className={`h-4 w-4 text-slate-gray transition-transform ${
                expanded === b.bucket ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
          {expanded === b.bucket && (
            <div className="border-t border-slate-gray/10 px-5 py-4">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <h4 className="mb-2 font-heading text-xs font-semibold uppercase tracking-wider text-slate-gray">
                    Top Companies
                  </h4>
                  <ul className="space-y-1.5">
                    {b.topCompanies.slice(0, 8).map((c) => (
                      <li key={c.name} className="flex items-center justify-between">
                        <Link
                          href={`/career-paths/${encodeURIComponent(c.name)}`}
                          className="text-sm text-royal transition-colors hover:text-navy"
                        >
                          {c.name}
                        </Link>
                        <span className="text-xs text-slate-gray">{c.count}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="mb-2 font-heading text-xs font-semibold uppercase tracking-wider text-slate-gray">
                    Common Titles
                  </h4>
                  <ul className="space-y-1.5">
                    {b.commonTitles.slice(0, 8).map((t) => (
                      <li key={t.title} className="flex items-center justify-between">
                        <span className="text-sm text-slate-gray">{t.title}</span>
                        <span className="text-xs text-slate-gray">{t.count}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
