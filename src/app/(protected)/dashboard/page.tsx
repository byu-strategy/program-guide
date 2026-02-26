import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getUserAccess } from "@/lib/supabase/helpers";
import Link from "next/link";
import type { Person, Job, UserRole } from "@/types/database";
import RoleToggleWidget from "@/components/admin/RoleToggleWidget";
import AdminStats from "@/components/admin/AdminStats";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const { user, profile, role } = await getUserAccess();
  if (!user || !profile) return null;

  const supabase = await createClient();

  // Fetch linked person if exists
  let person: Person | null = null;
  if (profile.person_id) {
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

  // Faculty admin stats
  let adminStats = null;
  if (role === "faculty") {
    const { data: profiles } = await supabase
      .from("user_profiles")
      .select("role, created_at");

    const byRole: Record<string, number> = {};
    let recentSignups = 0;
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    (profiles || []).forEach((p: { role: string; created_at: string }) => {
      byRole[p.role] = (byRole[p.role] || 0) + 1;
      if (new Date(p.created_at) > thirtyDaysAgo) recentSignups++;
    });

    const { count: profileViews } = await supabase
      .from("directory_clicks")
      .select("*", { count: "exact", head: true })
      .eq("click_type", "profile_view");

    const { count: linkedinClicks } = await supabase
      .from("directory_clicks")
      .select("*", { count: "exact", head: true })
      .eq("click_type", "linkedin_click");

    adminStats = {
      totalUsers: (profiles || []).length,
      byRole,
      recentSignups,
      totalClicks: (profileViews || 0) + (linkedinClicks || 0),
      profileViews: profileViews || 0,
      linkedinClicks: linkedinClicks || 0,
    };
  }

  const displayName = profile.display_name || user.email?.split("@")[0] || "User";

  const roleBadgeColors: Record<string, string> = {
    faculty: "bg-yellow/20 text-brown",
    student: "bg-royal/10 text-royal",
    alumni: "bg-navy/10 text-navy",
    employer: "bg-orange/10 text-orange",
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-navy">
          Welcome, {displayName}
        </h1>
        <p className="mt-1 text-slate-gray">
          {role && (
            <span className={`mr-2 rounded-full px-2 py-0.5 font-heading text-[10px] font-semibold uppercase tracking-wider ${roleBadgeColors[role] || "bg-stone text-slate-gray"}`}>
              {role}
            </span>
          )}
          Your Strategy program dashboard
        </p>
      </div>

      {/* Faculty Admin Section */}
      {role === "faculty" && (
        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          <RoleToggleWidget currentRole={role as UserRole} />
          {adminStats && <AdminStats stats={adminStats} />}
        </div>
      )}

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
              href={role === "student" ? "/profile/student-edit" : "/profile/edit"}
              className="inline-block bg-navy px-4 py-2 font-heading text-xs font-semibold text-white transition-colors hover:bg-royal"
            >
              Edit Profile
            </Link>
          ) : (
            <p className="text-xs text-slate-gray">
              No record linked. Contact the program to get linked.
            </p>
          )}
        </div>

        {/* Quick Links */}
        <div className="bg-white p-6 shadow-xs">
          <h2 className="mb-3 font-heading text-sm font-bold text-navy">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/directory/alumni" className="text-sm text-royal transition-colors hover:text-navy">
                Browse Alumni Directory
              </Link>
            </li>
            <li>
              <Link href="/directory/students" className="text-sm text-royal transition-colors hover:text-navy">
                Browse Student Directory
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
              <Link href="/give-back" className="text-sm text-royal transition-colors hover:text-navy">
                Give Back
              </Link>
            </li>
          </ul>
        </div>

        {/* Role-specific info */}
        <div className="bg-white p-6 shadow-xs">
          <h2 className="mb-3 font-heading text-sm font-bold text-navy">
            {role === "student" ? "Student Resources" : "Stay Connected"}
          </h2>
          {role === "student" ? (
            <ul className="space-y-2">
              <li>
                <Link href="/profile/student-edit" className="text-sm text-royal transition-colors hover:text-navy">
                  Update Student Profile
                </Link>
              </li>
              <li>
                <Link href="/mentorship" className="text-sm text-royal transition-colors hover:text-navy">
                  Mentorship Resources
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="space-y-2">
              <li>
                <Link href="/profile/edit" className="text-sm text-royal transition-colors hover:text-navy">
                  Update Profile
                </Link>
              </li>
              <li>
                <Link href="/give-back" className="text-sm text-royal transition-colors hover:text-navy">
                  Ways to Give Back
                </Link>
              </li>
            </ul>
          )}
        </div>
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
