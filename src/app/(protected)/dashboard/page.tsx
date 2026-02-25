import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import type { Person, Job, MentorRequest } from "@/types/database";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fetch user profile
  const { data: profile } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", user!.id)
    .single();

  // Fetch linked person if exists
  let person: Person | null = null;
  if (profile?.person_id) {
    const { data } = await supabase
      .from("people")
      .select("*")
      .eq("id", profile.person_id)
      .single();
    person = data as Person | null;
  }

  // Profile completeness
  const fields = person
    ? [
        person.bio,
        person.profile_photo_url,
        person.current_job_title,
        person.current_company,
        person.location_city,
        person.contact_preference,
      ]
    : [];
  const completedFields = fields.filter(Boolean).length;
  const totalFields = fields.length;
  const completeness = totalFields > 0 ? Math.round((completedFields / totalFields) * 100) : 0;

  // Fetch recent jobs
  const { data: recentJobs } = await supabase
    .from("jobs")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(5);

  // Fetch mentor requests (if person is a mentor)
  let mentorRequests: MentorRequest[] = [];
  if (person?.mentor_available && person.id) {
    const { data } = await supabase
      .from("mentor_requests")
      .select("*")
      .eq("mentor_person_id", person.id)
      .eq("status", "pending");
    mentorRequests = (data || []) as MentorRequest[];
  }

  const displayName = profile?.display_name || user!.email?.split("@")[0] || "User";

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-navy">
          Welcome, {displayName}
        </h1>
        <p className="mt-1 text-slate-gray">
          {profile?.role === "admin" && (
            <span className="mr-2 rounded-full bg-yellow/20 px-2 py-0.5 font-heading text-[10px] font-semibold uppercase tracking-wider text-brown">
              Admin
            </span>
          )}
          Your Strategy program dashboard
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Completeness */}
        <div className="bg-white p-6 shadow-xs">
          <h2 className="mb-3 font-heading text-sm font-bold text-navy">Profile Completeness</h2>
          <div className="mb-2 h-2 overflow-hidden rounded-full bg-stone">
            <div
              className="h-full rounded-full bg-navy transition-all"
              style={{ width: `${completeness}%` }}
            />
          </div>
          <p className="mb-4 text-xs text-slate-gray">{completeness}% complete</p>
          {person ? (
            <Link
              href="/profile/edit"
              className="inline-block bg-navy px-4 py-2 font-heading text-xs font-semibold text-white transition-colors hover:bg-royal"
            >
              Edit Profile
            </Link>
          ) : (
            <p className="text-xs text-slate-gray">
              No alumni record linked. Contact the program to get linked.
            </p>
          )}
        </div>

        {/* Quick Links */}
        <div className="bg-white p-6 shadow-xs">
          <h2 className="mb-3 font-heading text-sm font-bold text-navy">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/directory" className="text-sm text-royal transition-colors hover:text-navy">
                Browse Alumni Directory
              </Link>
            </li>
            <li>
              <Link href="/career-paths" className="text-sm text-royal transition-colors hover:text-navy">
                Explore Career Paths
              </Link>
            </li>
            <li>
              <Link href="/jobs" className="text-sm text-royal transition-colors hover:text-navy">
                View Job Board
              </Link>
            </li>
            <li>
              <Link href="/mentorship/find" className="text-sm text-royal transition-colors hover:text-navy">
                Find a Mentor
              </Link>
            </li>
            <li>
              <Link href="/give-back" className="text-sm text-royal transition-colors hover:text-navy">
                Give Back
              </Link>
            </li>
          </ul>
        </div>

        {/* Mentor Requests */}
        {person?.mentor_available && (
          <div className="bg-white p-6 shadow-xs">
            <h2 className="mb-3 font-heading text-sm font-bold text-navy">
              Mentor Requests
              {mentorRequests.length > 0 && (
                <span className="ml-2 rounded-full bg-yellow px-2 py-0.5 font-heading text-[10px] font-bold text-navy">
                  {mentorRequests.length}
                </span>
              )}
            </h2>
            {mentorRequests.length === 0 ? (
              <p className="text-xs text-slate-gray">No pending requests</p>
            ) : (
              <p className="text-xs text-slate-gray">
                You have {mentorRequests.length} pending mentorship{" "}
                {mentorRequests.length === 1 ? "request" : "requests"}.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Recent Jobs */}
      {recentJobs && recentJobs.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-4 font-heading text-xl font-bold text-navy">Recent Job Postings</h2>
          <div className="space-y-3">
            {(recentJobs as Job[]).map((job) => (
              <div key={job.id} className="flex items-center justify-between bg-white px-5 py-4 shadow-xs">
                <div>
                  <p className="font-heading text-sm font-bold text-navy">{job.title}</p>
                  <p className="text-xs text-slate-gray">{job.company_name}</p>
                </div>
                <div className="flex items-center gap-2">
                  {job.job_type && (
                    <span className="rounded-full bg-stone px-2 py-0.5 font-heading text-[9px] uppercase tracking-wider text-slate-gray">
                      {job.job_type}
                    </span>
                  )}
                  <Link
                    href="/jobs"
                    className="font-heading text-xs text-royal transition-colors hover:text-navy"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
