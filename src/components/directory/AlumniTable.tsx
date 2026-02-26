"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import type { Person, Experience, Education, UserRole } from "@/types/database";
import { ROLE_BUCKETS, ROLE_BUCKET_COLORS } from "@/types/database";
import ExpandableRow from "./ExpandableRow";

interface AlumniTableProps {
  people: Person[];
  experience: Experience[];
  education: Education[];
  emailMap: Record<number, string>;
  userRole: UserRole;
}

type SortKey = "name" | "title" | "company" | "location" | "year";
type SortDir = "asc" | "desc";

function getGradYear(person: Person): number | null {
  if (person.grad_date) {
    const year = parseInt(person.grad_date.slice(0, 4));
    return isNaN(year) ? null : year;
  }
  if (person.cohort_year) return person.cohort_year + 2;
  return null;
}

function getFirstRoleBucket(experiences: Experience[]): string | null {
  const current = experiences.find((e) => e.is_current && e.role_bucket);
  if (current) return current.role_bucket;
  const first = experiences.find((e) => e.role_bucket);
  return first?.role_bucket ?? null;
}

export default function AlumniTable({
  people,
  experience,
  education,
  emailMap,
  userRole,
}: AlumniTableProps) {
  const [search, setSearch] = useState("");
  const [roleBucketFilter, setRoleBucketFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Build experience/education maps
  const expByPerson = useMemo(() => {
    const map: Record<number, Experience[]> = {};
    for (const e of experience) {
      if (!map[e.person_id]) map[e.person_id] = [];
      map[e.person_id].push(e);
    }
    return map;
  }, [experience]);

  const eduByPerson = useMemo(() => {
    const map: Record<number, Education[]> = {};
    for (const e of education) {
      if (!map[e.person_id]) map[e.person_id] = [];
      map[e.person_id].push(e);
    }
    return map;
  }, [education]);

  // Filter
  const filtered = useMemo(() => {
    let result = people;

    if (search) {
      const term = search.toLowerCase();
      result = result.filter(
        (p) =>
          `${p.first_name} ${p.last_name}`.toLowerCase().includes(term) ||
          (p.current_company || "").toLowerCase().includes(term) ||
          (p.current_job_title || "").toLowerCase().includes(term)
      );
    }

    if (roleBucketFilter) {
      result = result.filter((p) => {
        const exps = expByPerson[p.id] || [];
        return exps.some((e) => e.role_bucket === roleBucketFilter);
      });
    }

    if (yearFilter) {
      const yr = parseInt(yearFilter);
      result = result.filter((p) => getGradYear(p) === yr);
    }

    return result;
  }, [people, search, roleBucketFilter, yearFilter, expByPerson]);

  // Sort
  const sorted = useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "name":
          cmp = (a.last_name || "").localeCompare(b.last_name || "");
          break;
        case "title":
          cmp = (a.current_job_title || "").localeCompare(b.current_job_title || "");
          break;
        case "company":
          cmp = (a.current_company || "").localeCompare(b.current_company || "");
          break;
        case "location": {
          const locA = [a.location_city, a.location_state].filter(Boolean).join(", ");
          const locB = [b.location_city, b.location_state].filter(Boolean).join(", ");
          cmp = locA.localeCompare(locB);
          break;
        }
        case "year":
          cmp = (getGradYear(a) || 0) - (getGradYear(b) || 0);
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

  function handleExpand(personId: number) {
    if (expandedId === personId) {
      setExpandedId(null);
    } else {
      setExpandedId(personId);
      // Log profile_view
      fetch("/api/directory/clicks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ person_id: personId, click_type: "profile_view" }),
      }).catch(() => {});
    }
  }

  function handleLinkedInClick(personId: number) {
    fetch("/api/directory/clicks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ person_id: personId, click_type: "linkedin_click" }),
    }).catch(() => {});
  }

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <span className="ml-1 text-slate-gray/30">&#8597;</span>;
    return <span className="ml-1">{sortDir === "asc" ? "&#8593;" : "&#8595;"}</span>;
  };

  // Available years for filter
  const years = useMemo(() => {
    const yrs = new Set<number>();
    people.forEach((p) => {
      const yr = getGradYear(p);
      if (yr) yrs.add(yr);
    });
    return Array.from(yrs).sort((a, b) => b - a);
  }, [people]);

  return (
    <div>
      {/* Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, company, or title..."
            className="flex-1 border border-slate-gray/20 bg-white px-4 py-2.5 text-sm transition-colors focus:border-royal focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <select
            value={roleBucketFilter}
            onChange={(e) => setRoleBucketFilter(e.target.value)}
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
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="border border-slate-gray/20 bg-white px-3 py-2 font-heading text-xs text-slate-gray"
          >
            <option value="">All Years</option>
            {years.map((yr) => (
              <option key={yr} value={yr}>
                Class of {yr}
              </option>
            ))}
          </select>
          <span className="self-center font-heading text-xs text-slate-gray">
            {sorted.length} {sorted.length === 1 ? "result" : "results"}
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
                onClick={() => toggleSort("title")}
              >
                Title <SortIcon col="title" />
              </th>
              <th
                className="cursor-pointer px-3 py-3 font-heading text-xs font-semibold uppercase tracking-wider text-slate-gray"
                onClick={() => toggleSort("company")}
              >
                Company <SortIcon col="company" />
              </th>
              <th
                className="hidden cursor-pointer px-3 py-3 font-heading text-xs font-semibold uppercase tracking-wider text-slate-gray md:table-cell"
                onClick={() => toggleSort("location")}
              >
                Location <SortIcon col="location" />
              </th>
              <th
                className="hidden cursor-pointer px-3 py-3 font-heading text-xs font-semibold uppercase tracking-wider text-slate-gray lg:table-cell"
                onClick={() => toggleSort("year")}
              >
                Class <SortIcon col="year" />
              </th>
              <th className="hidden px-3 py-3 font-heading text-xs font-semibold uppercase tracking-wider text-slate-gray lg:table-cell">
                Role
              </th>
              <th className="px-3 py-3 font-heading text-xs font-semibold uppercase tracking-wider text-slate-gray">
                LinkedIn
              </th>
              {userRole === "faculty" && (
                <th className="px-3 py-3 font-heading text-xs font-semibold uppercase tracking-wider text-slate-gray">
                  Email
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {sorted.map((person) => {
              const exps = expByPerson[person.id] || [];
              const edus = eduByPerson[person.id] || [];
              const roleBucket = getFirstRoleBucket(exps);
              const gradYear = getGradYear(person);
              const isExpanded = expandedId === person.id;
              const location = [person.location_city, person.location_state]
                .filter(Boolean)
                .join(", ");

              return (
                <tbody key={person.id}>
                  <tr
                    className={`cursor-pointer border-b border-slate-gray/10 transition-colors hover:bg-stone/50 ${
                      isExpanded ? "bg-stone/30" : ""
                    }`}
                    onClick={() => handleExpand(person.id)}
                  >
                    <td className="px-3 py-3">
                      {person.profile_photo_url ? (
                        <Image
                          src={person.profile_photo_url}
                          alt=""
                          width={32}
                          height={32}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                      ) : (
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy/10 font-heading text-xs font-bold text-navy">
                          {person.first_name?.charAt(0)}
                          {person.last_name?.charAt(0)}
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-3 font-heading text-sm font-semibold text-navy">
                      {person.first_name} {person.last_name}
                    </td>
                    <td className="max-w-[200px] truncate px-3 py-3 text-slate-gray">
                      {person.current_job_title || "—"}
                    </td>
                    <td className="max-w-[180px] truncate px-3 py-3 text-slate-gray">
                      {person.current_company || "—"}
                    </td>
                    <td className="hidden max-w-[150px] truncate px-3 py-3 text-slate-gray md:table-cell">
                      {location || "—"}
                    </td>
                    <td className="hidden px-3 py-3 text-slate-gray lg:table-cell">
                      {gradYear || "—"}
                    </td>
                    <td className="hidden px-3 py-3 lg:table-cell">
                      {roleBucket && (
                        <span
                          className="inline-block rounded-full px-2 py-0.5 font-heading text-[9px] font-semibold uppercase tracking-wider text-white"
                          style={{
                            backgroundColor:
                              ROLE_BUCKET_COLORS[roleBucket] || "#7C878E",
                          }}
                        >
                          {roleBucket}
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-3">
                      {person.linkedin_url && (
                        <a
                          href={person.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLinkedInClick(person.id);
                          }}
                          className="text-royal transition-colors hover:text-navy"
                        >
                          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        </a>
                      )}
                    </td>
                    {userRole === "faculty" && (
                      <td className="max-w-[180px] truncate px-3 py-3 text-xs text-slate-gray">
                        {emailMap[person.id] || "—"}
                      </td>
                    )}
                  </tr>
                  {isExpanded && (
                    <tr>
                      <td
                        colSpan={userRole === "faculty" ? 9 : 8}
                        className="bg-stone/20 px-6 py-6"
                      >
                        <ExpandableRow
                          person={person}
                          experiences={exps}
                          education={edus}
                        />
                      </td>
                    </tr>
                  )}
                </tbody>
              );
            })}
          </tbody>
        </table>

        {sorted.length === 0 && (
          <div className="py-12 text-center">
            <p className="font-heading text-lg text-slate-gray">
              No alumni match your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
