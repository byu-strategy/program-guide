"use client";

import { useEffect, useState, useMemo } from "react";

interface AlumRow {
  degree_type: string;
  grad_year_band: string;
  "company.name": string;
}

export default function PivotTable() {
  const [data, setData] = useState<AlumRow[]>([]);
  const [filterCompany, setFilterCompany] = useState("");
  const [filterYear, setFilterYear] = useState("");

  useEffect(() => {
    fetch("/data/alum-first-job.csv")
      .then((res) => res.text())
      .then((csv) => {
        const lines = csv.trim().split("\n");
        const headers = lines[0].split(",");
        const rows: AlumRow[] = [];

        for (let i = 1; i < lines.length; i++) {
          const values: string[] = [];
          let current = "";
          let inQuotes = false;

          for (const char of lines[i]) {
            if (char === '"') {
              inQuotes = !inQuotes;
            } else if (char === "," && !inQuotes) {
              values.push(current.trim());
              current = "";
            } else {
              current += char;
            }
          }
          values.push(current.trim());

          const row: Record<string, string> = {};
          headers.forEach((h, idx) => {
            row[h.trim()] = values[idx] || "";
          });

          if (row["company.name"] && row["company.name"].trim() !== "") {
            rows.push(row as unknown as AlumRow);
          }
        }
        setData(rows);
      });
  }, []);

  const yearBands = useMemo(() => {
    const s = new Set(data.map((r) => r.grad_year_band));
    return Array.from(s).sort();
  }, [data]);

  const filtered = useMemo(() => {
    return data.filter((r) => {
      if (filterYear && r.grad_year_band !== filterYear) return false;
      if (
        filterCompany &&
        !r["company.name"].toLowerCase().includes(filterCompany.toLowerCase())
      )
        return false;
      return true;
    });
  }, [data, filterYear, filterCompany]);

  const companyCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    filtered.forEach((r) => {
      const name = r["company.name"];
      counts[name] = (counts[name] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [filtered]);

  if (!data.length) {
    return (
      <div className="my-8 rounded-md bg-white p-8 text-center text-slate-gray shadow-sm">
        Loading placement data...
      </div>
    );
  }

  return (
    <div className="not-prose my-8">
      <div className="mb-4 flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Filter by company..."
          value={filterCompany}
          onChange={(e) => setFilterCompany(e.target.value)}
          className="rounded-sm border border-slate-gray/20 bg-white px-3 py-2 text-sm focus:border-navy focus:outline-none"
        />
        <select
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value)}
          className="rounded-sm border border-slate-gray/20 bg-white px-3 py-2 text-sm focus:border-navy focus:outline-none"
        >
          <option value="">All Years</option>
          {yearBands.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
        <span className="flex items-center text-xs text-slate-gray">
          {filtered.length} records &middot; {companyCounts.length} companies
        </span>
      </div>

      <div className="max-h-[600px] overflow-auto rounded-md shadow-sm">
        <table className="w-full border-collapse text-sm">
          <thead className="sticky top-0">
            <tr>
              <th className="border-b-2 border-navy bg-navy px-4 py-3 text-left font-heading text-xs font-semibold tracking-wider text-white uppercase">
                Company
              </th>
              <th className="border-b-2 border-navy bg-navy px-4 py-3 text-right font-heading text-xs font-semibold tracking-wider text-white uppercase">
                Count
              </th>
              <th className="border-b-2 border-navy bg-navy px-4 py-3 text-left font-heading text-xs font-semibold tracking-wider text-white uppercase">
                Distribution
              </th>
            </tr>
          </thead>
          <tbody>
            {companyCounts.map(([company, count], i) => {
              const maxCount = companyCounts[0]?.[1] || 1;
              const pct = (count / maxCount) * 100;
              return (
                <tr
                  key={company}
                  className={i % 2 === 0 ? "bg-white" : "bg-stone"}
                >
                  <td className="border-b border-slate-gray/10 px-4 py-2.5">
                    {company}
                  </td>
                  <td className="border-b border-slate-gray/10 px-4 py-2.5 text-right font-semibold">
                    {count}
                  </td>
                  <td className="border-b border-slate-gray/10 px-4 py-2.5">
                    <div className="h-4 w-full rounded-pill bg-stone">
                      <div
                        className="h-4 rounded-pill bg-navy/20"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
