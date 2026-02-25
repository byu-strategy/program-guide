import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import type { Person, Experience } from "@/types/database";
import { ROLE_BUCKET_COLORS } from "@/types/database";

interface Props {
  params: Promise<{ company: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { company } = await params;
  const name = decodeURIComponent(company);
  return {
    title: `${name} — Career Paths`,
  };
}

export default async function CompanyProfilePage({ params }: Props) {
  const { company } = await params;
  const companyName = decodeURIComponent(company);
  const supabase = await createClient();

  // Get all experience records for this company
  const { data: experiences } = await supabase
    .from("experience")
    .select("*, people!inner(id, first_name, last_name, linkedin_slug, current_job_title, current_company, profile_photo_url, cohort_year)")
    .eq("company_name", companyName)
    .is("removed_at", null)
    .order("start_date", { ascending: false });

  const records = (experiences || []) as (Experience & {
    people: Pick<Person, "id" | "first_name" | "last_name" | "linkedin_slug" | "current_job_title" | "current_company" | "profile_photo_url" | "cohort_year">;
  })[];

  // Group by role bucket
  const byRoleBucket: Record<string, typeof records> = {};
  records.forEach((r) => {
    const bucket = r.role_bucket || "Other";
    if (!byRoleBucket[bucket]) byRoleBucket[bucket] = [];
    byRoleBucket[bucket].push(r);
  });

  // Unique alumni
  const uniqueAlumni = new Map<number, typeof records[0]["people"]>();
  records.forEach((r) => {
    if (!uniqueAlumni.has(r.people.id)) {
      uniqueAlumni.set(r.people.id, r.people);
    }
  });

  // Get unique titles
  const titleCounts: Record<string, number> = {};
  records.forEach((r) => {
    if (r.job_title) {
      titleCounts[r.job_title] = (titleCounts[r.job_title] || 0) + 1;
    }
  });

  const topTitles = Object.entries(titleCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <Link
        href="/career-paths"
        className="mb-6 inline-flex items-center gap-1 font-heading text-sm text-royal transition-colors hover:text-navy"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        Back to Career Paths
      </Link>

      <h1 className="font-heading text-3xl font-bold text-navy">{companyName}</h1>
      <p className="mt-2 text-slate-gray">
        {uniqueAlumni.size} BYU Strategy {uniqueAlumni.size === 1 ? "alum has" : "alumni have"} worked here
      </p>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div className="bg-white p-4 text-center shadow-xs">
          <p className="font-heading text-2xl font-bold text-navy">{uniqueAlumni.size}</p>
          <p className="font-heading text-[10px] uppercase tracking-wider text-slate-gray">Alumni</p>
        </div>
        <div className="bg-white p-4 text-center shadow-xs">
          <p className="font-heading text-2xl font-bold text-navy">{records.length}</p>
          <p className="font-heading text-[10px] uppercase tracking-wider text-slate-gray">Total Roles</p>
        </div>
        <div className="bg-white p-4 text-center shadow-xs">
          <p className="font-heading text-2xl font-bold text-navy">{Object.keys(byRoleBucket).length}</p>
          <p className="font-heading text-[10px] uppercase tracking-wider text-slate-gray">Role Types</p>
        </div>
      </div>

      {/* Common Titles */}
      {topTitles.length > 0 && (
        <div className="mt-8 bg-white p-6 shadow-xs">
          <h2 className="mb-3 font-heading text-lg font-bold text-navy">Common Titles</h2>
          <div className="space-y-2">
            {topTitles.map(([title, count]) => (
              <div key={title} className="flex items-center justify-between">
                <span className="text-sm text-slate-gray">{title}</span>
                <span className="font-heading text-xs font-semibold text-navy">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Role Distribution */}
      <div className="mt-8 bg-white p-6 shadow-xs">
        <h2 className="mb-3 font-heading text-lg font-bold text-navy">By Role Type</h2>
        <div className="flex flex-wrap gap-2">
          {Object.entries(byRoleBucket)
            .sort((a, b) => b[1].length - a[1].length)
            .map(([bucket, recs]) => (
              <span
                key={bucket}
                className="rounded-full px-3 py-1 font-heading text-[10px] font-semibold text-white"
                style={{ backgroundColor: ROLE_BUCKET_COLORS[bucket] || "#7C878E" }}
              >
                {bucket} ({recs.length})
              </span>
            ))}
        </div>
      </div>

      {/* Alumni List */}
      <div className="mt-8 bg-white p-6 shadow-xs">
        <h2 className="mb-3 font-heading text-lg font-bold text-navy">Alumni</h2>
        <div className="space-y-3">
          {Array.from(uniqueAlumni.values())
            .sort((a, b) => a.last_name.localeCompare(b.last_name))
            .map((person) => {
              const slug = person.linkedin_slug || person.id;
              return (
                <Link
                  key={person.id}
                  href={`/directory/${slug}`}
                  className="flex items-center gap-3 rounded-sm p-2 transition-colors hover:bg-stone"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-navy/[0.06]">
                    <span className="font-heading text-xs font-bold text-navy/40">
                      {person.first_name.charAt(0)}{person.last_name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-heading text-sm font-semibold text-navy">
                      {person.first_name} {person.last_name}
                    </p>
                    {person.current_job_title && (
                      <p className="text-xs text-slate-gray">{person.current_job_title}</p>
                    )}
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
}
