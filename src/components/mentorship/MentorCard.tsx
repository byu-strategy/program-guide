import Link from "next/link";
import Image from "next/image";
import type { Person } from "@/types/database";

interface MentorCardProps {
  person: Person;
  onRequest: (personId: number) => void;
}

export default function MentorCard({ person, onRequest }: MentorCardProps) {
  const location = [person.location_city, person.location_state]
    .filter(Boolean)
    .join(", ");
  const slug = person.linkedin_slug || person.id;

  return (
    <div className="flex flex-col bg-white p-5 shadow-xs">
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
          <Link
            href={`/directory/${slug}`}
            className="font-heading text-sm font-bold text-navy transition-colors hover:text-royal"
          >
            {person.first_name} {person.last_name}
          </Link>
          {person.current_job_title && (
            <p className="mt-0.5 text-xs text-slate-gray">{person.current_job_title}</p>
          )}
          {person.current_company && (
            <p className="text-xs font-medium text-navy/70">{person.current_company}</p>
          )}
          {location && (
            <p className="mt-1 text-[10px] text-slate-gray">{location}</p>
          )}
        </div>
      </div>

      {person.bio && (
        <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-slate-gray/80">
          {person.bio}
        </p>
      )}

      <div className="mt-auto pt-4">
        <button
          onClick={() => onRequest(person.id)}
          className="w-full bg-navy py-2 font-heading text-xs font-semibold text-white transition-colors hover:bg-royal"
        >
          Request Mentorship
        </button>
      </div>
    </div>
  );
}
