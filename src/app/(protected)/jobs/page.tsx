import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getUserAccess } from "@/lib/supabase/helpers";
import JobCard from "@/components/jobs/JobCard";
import JobPostForm from "@/components/jobs/JobPostForm";
import type { Job } from "@/types/database";

export const metadata: Metadata = {
  title: "Job Board",
};

export default async function JobsPage() {
  const { role } = await getUserAccess();
  const supabase = await createClient();

  const canPost = role === "alumni" || role === "employer" || role === "faculty";

  // Fetch active jobs — consortium priority first, then by date
  const { data: jobs } = await supabase
    .from("jobs")
    .select("*")
    .eq("is_active", true)
    .order("is_consortium_priority", { ascending: false })
    .order("created_at", { ascending: false });

  const allJobs = (jobs || []) as Job[];

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-navy md:text-4xl">
          Job Board
        </h1>
        <p className="mt-2 text-lg text-slate-gray">
          Opportunities posted by BYU Strategy alumni and employer partners
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Job Listings */}
        <div className={canPost ? "lg:col-span-2" : "lg:col-span-3"}>
          {allJobs.length === 0 ? (
            <div className="bg-white p-8 text-center shadow-xs">
              <p className="font-heading text-lg text-slate-gray">
                No jobs posted yet.{canPost ? " Be the first!" : ""}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {allJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>

        {/* Post Form — only for alumni, employers, faculty */}
        {canPost && (
          <div>
            <JobPostForm />
          </div>
        )}
      </div>
    </div>
  );
}
