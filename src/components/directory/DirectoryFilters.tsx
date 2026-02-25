"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { ROLE_BUCKETS } from "@/types/database";

export default function DirectoryFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [q, setQ] = useState(searchParams.get("q") || "");

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page"); // Reset pagination
    startTransition(() => {
      router.push(`/directory?${params.toString()}`);
    });
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    updateFilter("q", q);
  }

  return (
    <div className={`space-y-4 ${isPending ? "opacity-60" : ""}`}>
      {/* Search */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name, company, or title..."
          className="flex-1 border border-slate-gray/20 bg-white px-4 py-2.5 text-sm transition-colors focus:border-royal focus:outline-none"
        />
        <button
          type="submit"
          className="bg-navy px-5 py-2.5 font-heading text-sm font-semibold text-white transition-colors hover:bg-royal"
        >
          Search
        </button>
      </form>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <select
          value={searchParams.get("role_bucket") || ""}
          onChange={(e) => updateFilter("role_bucket", e.target.value)}
          className="border border-slate-gray/20 bg-white px-3 py-2 font-heading text-xs text-slate-gray"
        >
          <option value="">All Roles</option>
          {ROLE_BUCKETS.map((bucket) => (
            <option key={bucket} value={bucket}>
              {bucket}
            </option>
          ))}
        </select>

        <select
          value={searchParams.get("mentor_only") || ""}
          onChange={(e) => updateFilter("mentor_only", e.target.value)}
          className="border border-slate-gray/20 bg-white px-3 py-2 font-heading text-xs text-slate-gray"
        >
          <option value="">All Alumni</option>
          <option value="true">Mentors Only</option>
        </select>

        <select
          value={searchParams.get("grad_year") || ""}
          onChange={(e) => updateFilter("grad_year", e.target.value)}
          className="border border-slate-gray/20 bg-white px-3 py-2 font-heading text-xs text-slate-gray"
        >
          <option value="">All Years</option>
          {Array.from({ length: 20 }, (_, i) => 2026 - i).map((year) => (
            <option key={year} value={year}>
              Class of {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
