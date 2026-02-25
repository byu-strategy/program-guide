import type { Job } from "@/types/database";
import { ROLE_BUCKET_COLORS } from "@/types/database";

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  const daysAgo = Math.floor(
    (Date.now() - new Date(job.created_at).getTime()) / (1000 * 60 * 60 * 24)
  );
  const postedLabel = daysAgo === 0 ? "Today" : daysAgo === 1 ? "1 day ago" : `${daysAgo} days ago`;

  return (
    <div className="group flex flex-col bg-white p-5 shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-heading text-sm font-bold text-navy group-hover:text-royal">
              {job.title}
            </h3>
            {job.is_consortium_priority && (
              <span className="rounded-full bg-yellow px-2 py-0.5 font-heading text-[8px] font-bold uppercase tracking-wider text-navy">
                Featured
              </span>
            )}
          </div>
          <p className="mt-0.5 text-sm text-slate-gray">{job.company_name}</p>
        </div>
        <span className="shrink-0 text-[10px] text-slate-gray/70">{postedLabel}</span>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {job.location && (
          <span className="flex items-center gap-1 text-[10px] text-slate-gray">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0 1 15 0Z" />
            </svg>
            {job.location}
          </span>
        )}
        {job.job_type && (
          <span className="rounded-full bg-stone px-2 py-0.5 font-heading text-[9px] uppercase tracking-wider text-slate-gray">
            {job.job_type}
          </span>
        )}
        {job.role_bucket && (
          <span
            className="rounded-full px-2 py-0.5 font-heading text-[9px] font-semibold uppercase tracking-wider text-white"
            style={{
              backgroundColor: ROLE_BUCKET_COLORS[job.role_bucket] || "#7C878E",
            }}
          >
            {job.role_bucket}
          </span>
        )}
      </div>

      {job.description && (
        <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-slate-gray/80">
          {job.description}
        </p>
      )}

      <div className="mt-auto pt-4">
        {job.url ? (
          <a
            href={job.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-heading text-xs font-semibold text-royal transition-colors hover:text-navy"
          >
            Apply &rarr;
          </a>
        ) : job.contact_email ? (
          <a
            href={`mailto:${job.contact_email}`}
            className="font-heading text-xs font-semibold text-royal transition-colors hover:text-navy"
          >
            Contact &rarr;
          </a>
        ) : null}
      </div>
    </div>
  );
}
