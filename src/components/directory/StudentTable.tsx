"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import type { Person, UserRole } from "@/types/database";

interface StudentTableProps {
  students: Person[];
  emailMap: Record<number, string>;
  userRole: UserRole;
  isConsortium: boolean;
}

type SortKey = "name" | "track" | "year" | "target_roles";
type SortDir = "asc" | "desc";

function getGradYear(person: Person): number | null {
  if (person.grad_date) {
    const year = parseInt(person.grad_date.slice(0, 4));
    return isNaN(year) ? null : year;
  }
  if (person.cohort_year) return person.cohort_year + 2;
  return null;
}

export default function StudentTable({
  students,
  emailMap,
  userRole,
  isConsortium,
}: StudentTableProps) {
  const [search, setSearch] = useState("");
  const [trackFilter, setTrackFilter] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const canSeeResume = userRole === "alumni" || userRole === "faculty" || isConsortium;
  const canSeeGpa = userRole === "faculty" || isConsortium;
  const canSeeEmail = userRole === "faculty";

  // Available tracks for filter
  const tracks = useMemo(() => {
    const set = new Set<string>();
    students.forEach((s) => {
      if (s.track) set.add(s.track);
    });
    return Array.from(set).sort();
  }, [students]);

  const filtered = useMemo(() => {
    let result = students;

    if (search) {
      const term = search.toLowerCase();
      result = result.filter(
        (s) =>
          `${s.first_name} ${s.last_name}`.toLowerCase().includes(term) ||
          (s.target_roles || "").toLowerCase().includes(term) ||
          (s.internship_experience || "").toLowerCase().includes(term)
      );
    }

    if (trackFilter) {
      result = result.filter((s) => s.track === trackFilter);
    }

    return result;
  }, [students, search, trackFilter]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "name":
          cmp = (a.last_name || "").localeCompare(b.last_name || "");
          break;
        case "track":
          cmp = (a.track || "").localeCompare(b.track || "");
          break;
        case "year":
          cmp = (getGradYear(a) || 0) - (getGradYear(b) || 0);
          break;
        case "target_roles":
          cmp = (a.target_roles || "").localeCompare(b.target_roles || "");
          break;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
    return arr;
  }, [filtered, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <span className="ml-1 text-slate-gray/30">&#8597;</span>;
    return <span className="ml-1">{sortDir === "asc" ? "&#8593;" : "&#8595;"}</span>;
  };

  return (
    <div>
      {/* Filters */}
      <div className="mb-6 space-y-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, target roles, or experience..."
          className="w-full border border-slate-gray/20 bg-white px-4 py-2.5 text-sm transition-colors focus:border-royal focus:outline-none"
        />
        <div className="flex flex-wrap gap-3">
          <select
            value={trackFilter}
            onChange={(e) => setTrackFilter(e.target.value)}
            className="border border-slate-gray/20 bg-white px-3 py-2 font-heading text-xs text-slate-gray"
          >
            <option value="">All Tracks</option>
            {tracks.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <span className="self-center font-heading text-xs text-slate-gray">
            {sorted.length} {sorted.length === 1 ? "student" : "students"}
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-navy/10 text-left">
              <th className="w-10 px-3 py-3"></th>
              <th
                className="cursor-pointer px-3 py-3 font-heading text-xs font-semibold uppercase tracking-wider text-slate-gray"
                onClick={() => toggleSort("name")}
              >
                Name <SortIcon col="name" />
              </th>
              <th
                className="cursor-pointer px-3 py-3 font-heading text-xs font-semibold uppercase tracking-wider text-slate-gray"
                onClick={() => toggleSort("track")}
              >
                Track <SortIcon col="track" />
              </th>
              <th
                className="cursor-pointer px-3 py-3 font-heading text-xs font-semibold uppercase tracking-wider text-slate-gray"
                onClick={() => toggleSort("year")}
              >
                Grad Year <SortIcon col="year" />
              </th>
              <th
                className="hidden cursor-pointer px-3 py-3 font-heading text-xs font-semibold uppercase tracking-wider text-slate-gray md:table-cell"
                onClick={() => toggleSort("target_roles")}
              >
                Target Roles <SortIcon col="target_roles" />
              </th>
              <th className="hidden px-3 py-3 font-heading text-xs font-semibold uppercase tracking-wider text-slate-gray lg:table-cell">
                Internship Experience
              </th>
              {canSeeResume && (
                <th className="px-3 py-3 font-heading text-xs font-semibold uppercase tracking-wider text-slate-gray">
                  Resume
                </th>
              )}
              {canSeeGpa && (
                <th className="px-3 py-3 font-heading text-xs font-semibold uppercase tracking-wider text-slate-gray">
                  GPA
                </th>
              )}
              <th className="px-3 py-3 font-heading text-xs font-semibold uppercase tracking-wider text-slate-gray">
                LinkedIn
              </th>
              {canSeeEmail && (
                <th className="px-3 py-3 font-heading text-xs font-semibold uppercase tracking-wider text-slate-gray">
                  Email
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {sorted.map((student) => {
              const gradYear = getGradYear(student);
              return (
                <tr
                  key={student.id}
                  className="border-b border-slate-gray/10 transition-colors hover:bg-stone/50"
                >
                  <td className="px-3 py-3">
                    {student.profile_photo_url ? (
                      <Image
                        src={student.profile_photo_url}
                        alt=""
                        width={32}
                        height={32}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy/10 font-heading text-xs font-bold text-navy">
                        {student.first_name?.charAt(0)}
                        {student.last_name?.charAt(0)}
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-3 font-heading text-sm font-semibold text-navy">
                    {student.first_name} {student.last_name}
                  </td>
                  <td className="px-3 py-3 text-slate-gray">
                    {student.track || "—"}
                  </td>
                  <td className="px-3 py-3 text-slate-gray">
                    {gradYear || "—"}
                  </td>
                  <td className="hidden max-w-[200px] truncate px-3 py-3 text-slate-gray md:table-cell">
                    {student.target_roles || "—"}
                  </td>
                  <td className="hidden max-w-[200px] truncate px-3 py-3 text-slate-gray lg:table-cell">
                    {student.internship_experience || "—"}
                  </td>
                  {canSeeResume && (
                    <td className="px-3 py-3">
                      {student.resume_url ? (
                        <a
                          href={student.resume_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-heading text-xs font-semibold text-royal transition-colors hover:text-navy"
                        >
                          PDF
                        </a>
                      ) : (
                        <span className="text-xs text-slate-gray/40">—</span>
                      )}
                    </td>
                  )}
                  {canSeeGpa && (
                    <td className="px-3 py-3 text-slate-gray">
                      {student.gpa ? student.gpa.toFixed(2) : "—"}
                    </td>
                  )}
                  <td className="px-3 py-3">
                    {student.linkedin_url && (
                      <a
                        href={student.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-royal transition-colors hover:text-navy"
                      >
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                    )}
                  </td>
                  {canSeeEmail && (
                    <td className="max-w-[180px] truncate px-3 py-3 text-xs text-slate-gray">
                      {emailMap[student.id] || "—"}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>

        {sorted.length === 0 && (
          <div className="py-12 text-center">
            <p className="font-heading text-lg text-slate-gray">
              {students.length === 0
                ? "No students have created profiles yet."
                : "No students match your filters."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
