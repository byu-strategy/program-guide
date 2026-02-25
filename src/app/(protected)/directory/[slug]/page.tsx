import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import CareerTimeline from "@/components/directory/CareerTimeline";
import type { Person, Experience, Education } from "@/types/database";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();

  // Try linkedin_slug first, then id
  let query = supabase.from("people").select("first_name, last_name");
  if (/^\d+$/.test(slug)) {
    query = query.eq("id", parseInt(slug));
  } else {
    query = query.eq("linkedin_slug", slug);
  }

  const { data } = await query.single();
  if (!data) return { title: "Alumni Profile" };

  return {
    title: `${data.first_name} ${data.last_name}`,
  };
}

export default async function AlumniProfilePage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  // Fetch person
  let personQuery = supabase.from("people").select("*");
  if (/^\d+$/.test(slug)) {
    personQuery = personQuery.eq("id", parseInt(slug));
  } else {
    personQuery = personQuery.eq("linkedin_slug", slug);
  }

  const { data: person } = await personQuery.single();
  if (!person) notFound();

  const p = person as Person;

  // Fetch experience and education in parallel
  const [{ data: experiences }, { data: education }] = await Promise.all([
    supabase
      .from("experience")
      .select("*")
      .eq("person_id", p.id)
      .is("removed_at", null)
      .order("start_date", { ascending: false }),
    supabase
      .from("education")
      .select("*")
      .eq("person_id", p.id)
      .order("end_date", { ascending: false }),
  ]);

  const location = [p.location_city, p.location_state, p.location_country]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <Link
        href="/directory"
        className="mb-6 inline-flex items-center gap-1 font-heading text-sm text-royal transition-colors hover:text-navy"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        Back to Directory
      </Link>

      {/* Profile Header */}
      <div className="flex flex-col gap-6 bg-white p-6 shadow-xs sm:flex-row sm:items-start">
        <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full bg-navy/[0.06]">
          {p.profile_photo_url ? (
            <Image
              src={p.profile_photo_url}
              alt={`${p.first_name} ${p.last_name}`}
              width={96}
              height={96}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="font-heading text-3xl font-bold text-navy/30">
              {p.first_name.charAt(0)}
              {p.last_name.charAt(0)}
            </span>
          )}
        </div>
        <div className="flex-1">
          <h1 className="font-heading text-2xl font-bold text-navy">
            {p.first_name} {p.last_name}
          </h1>
          {p.current_job_title && (
            <p className="mt-1 text-base text-slate-gray">{p.current_job_title}</p>
          )}
          {p.current_company && (
            <p className="text-base font-medium text-navy/70">{p.current_company}</p>
          )}
          <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-gray">
            {location && (
              <span className="flex items-center gap-1">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0 1 15 0Z" />
                </svg>
                {location}
              </span>
            )}
            {p.cohort_year && <span>Class of {p.cohort_year + 2}</span>}
            {p.type && <span>{p.type}</span>}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {p.mentor_available && (
              <span className="rounded-full bg-green-light/20 px-3 py-1 font-heading text-[10px] font-semibold uppercase tracking-wider text-green">
                Available to Mentor
              </span>
            )}
            {p.linkedin_url && (
              <a
                href={p.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-blue/10 px-3 py-1 font-heading text-[10px] font-semibold uppercase tracking-wider text-blue transition-colors hover:bg-blue/20"
              >
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Bio */}
      {p.bio && (
        <div className="mt-6 bg-white p-6 shadow-xs">
          <h2 className="mb-3 font-heading text-lg font-bold text-navy">About</h2>
          <p className="text-sm leading-relaxed text-slate-gray">{p.bio}</p>
        </div>
      )}

      {/* Experience */}
      <div className="mt-6 bg-white p-6 shadow-xs">
        <h2 className="mb-4 font-heading text-lg font-bold text-navy">
          Experience
        </h2>
        <CareerTimeline experiences={(experiences || []) as Experience[]} />
      </div>

      {/* Education */}
      {education && education.length > 0 && (
        <div className="mt-6 bg-white p-6 shadow-xs">
          <h2 className="mb-4 font-heading text-lg font-bold text-navy">
            Education
          </h2>
          <div className="space-y-4">
            {(education as Education[]).map((edu) => (
              <div key={edu.id}>
                <p className="font-heading text-sm font-bold text-navy">
                  {edu.school_name}
                </p>
                {edu.degree && (
                  <p className="text-sm text-slate-gray">
                    {edu.degree}
                    {edu.major ? ` — ${edu.major}` : ""}
                  </p>
                )}
                <p className="text-xs text-slate-gray/70">
                  {edu.start_date || "?"} &ndash; {edu.end_date || "Present"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
