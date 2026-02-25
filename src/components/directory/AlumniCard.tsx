import Link from "next/link";
import Image from "next/image";
import type { Person } from "@/types/database";

interface AlumniCardProps {
  person: Person;
}

export default function AlumniCard({ person }: AlumniCardProps) {
  const location = [person.location_city, person.location_state]
    .filter(Boolean)
    .join(", ");

  const slug = person.linkedin_slug || person.id;

  return (
    <Link
      href={`/directory/${slug}`}
      className="group flex flex-col bg-white p-5 shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
    >
      {/* Photo + Name */}
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-navy/[0.06]">
          {person.profile_photo_url ? (
            <Image
              src={person.profile_photo_url}
              alt={`${person.first_name} ${person.last_name}`}
              width={56}
              height={56}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="font-heading text-lg font-bold text-navy/40">
              {person.first_name.charAt(0)}
              {person.last_name.charAt(0)}
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-heading text-sm font-bold text-navy group-hover:text-royal">
            {person.first_name} {person.last_name}
          </h3>
          {person.current_job_title && (
            <p className="mt-0.5 truncate text-xs text-slate-gray">
              {person.current_job_title}
            </p>
          )}
          {person.current_company && (
            <p className="truncate text-xs font-medium text-navy/70">
              {person.current_company}
            </p>
          )}
        </div>
      </div>

      {/* Meta */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {location && (
          <span className="inline-flex items-center gap-1 text-[10px] text-slate-gray">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0 1 15 0Z" />
            </svg>
            {location}
          </span>
        )}
        {person.cohort_year && (
          <span className="text-[10px] text-slate-gray">
            Class of {person.cohort_year + 2}
          </span>
        )}
        {person.mentor_available && (
          <span className="rounded-full bg-green-light/20 px-2 py-0.5 font-heading text-[9px] font-semibold uppercase tracking-wider text-green">
            Mentor
          </span>
        )}
      </div>
    </Link>
  );
}
