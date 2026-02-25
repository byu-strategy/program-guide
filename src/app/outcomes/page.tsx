import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import PageHeader from "@/components/ui/PageHeader";
import StatsBar from "@/components/outcomes/StatsBar";
import RoleBucketChart from "@/components/outcomes/RoleBucketChart";
import TopCompaniesChart from "@/components/outcomes/TopCompaniesChart";
import EraTrendsChart from "@/components/outcomes/EraTrendsChart";
import CTAButton from "@/components/ui/CTAButton";
import { type FirstPostGradJob, ROLE_BUCKET_COLORS } from "@/types/database";

export const metadata: Metadata = {
  title: "Outcomes",
  description: "Career outcomes and placement analytics for BYU Strategy graduates",
};

function getEra(cohortYear: number | null): string {
  if (!cohortYear) return "Unknown";
  if (cohortYear <= 2012) return "2007-2012";
  if (cohortYear <= 2016) return "2013-2016";
  if (cohortYear <= 2020) return "2017-2020";
  return "2021-2025";
}

export default async function OutcomesPage() {
  const supabase = await createClient();

  // Fetch first jobs from the view
  const { data: jobs, error } = await supabase
    .from("first_post_grad_job")
    .select("*")
    .eq("job_rank", 1);

  if (error || !jobs) {
    return (
      <article className="prose">
        <PageHeader
          title="Outcomes"
          subtitle="Career outcomes and placement analytics"
        />
        <p className="text-slate-gray">
          Unable to load outcomes data. Please ensure the database views are configured.
        </p>
      </article>
    );
  }

  const firstJobs = jobs as FirstPostGradJob[];
  const total = firstJobs.length;

  // Role bucket aggregation
  const roleCounts: Record<string, number> = {};
  firstJobs.forEach((j) => {
    const bucket = j.role_bucket || "Other";
    roleCounts[bucket] = (roleCounts[bucket] || 0) + 1;
  });

  const roleBucketData = Object.entries(roleCounts)
    .map(([name, value]) => ({
      name,
      value,
      pct: Math.round((value / total) * 100),
    }))
    .sort((a, b) => b.value - a.value);

  // Stats
  const consultingPct = roleBucketData.find((d) => d.name === "Consulting")?.pct ?? 0;
  const corpStratPct = roleBucketData.find((d) => d.name === "Corporate Strategy")?.pct ?? 0;
  const productPct = roleBucketData.find((d) => d.name === "Product Management")?.pct ?? 0;

  const uniqueCompanies = new Set(firstJobs.map((j) => j.company_name).filter(Boolean));

  // Top companies
  const companyCounts: Record<string, number> = {};
  firstJobs.forEach((j) => {
    if (j.company_name) {
      companyCounts[j.company_name] = (companyCounts[j.company_name] || 0) + 1;
    }
  });

  const topCompanies = Object.entries(companyCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 25);

  // Era trends
  const eraRoleCounts: Record<string, Record<string, number>> = {};
  firstJobs.forEach((j) => {
    const era = getEra(j.cohort_year);
    if (era === "Unknown") return;
    if (!eraRoleCounts[era]) eraRoleCounts[era] = {};
    const bucket = j.role_bucket || "Other";
    eraRoleCounts[era][bucket] = (eraRoleCounts[era][bucket] || 0) + 1;
  });

  // Get role buckets that appear in the data
  const activeRoleBuckets = [...new Set(firstJobs.map((j) => j.role_bucket || "Other"))].sort(
    (a, b) => (roleCounts[b] || 0) - (roleCounts[a] || 0)
  );

  const eraTrends = Object.entries(eraRoleCounts)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([era, counts]) => ({
      era,
      ...counts,
    }));

  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-12">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.25em] text-yellow">
            Data-Driven
          </p>
          <h1 className="mt-2 font-heading text-3xl font-bold text-white md:text-4xl">
            Career Outcomes
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/60">
            Real placement data from {total} BYU Strategy graduates across {uniqueCompanies.size} companies.
            Built from verified alumni career records and classified by job function.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-stone py-8">
        <div className="mx-auto max-w-6xl px-6">
          <StatsBar
            totalGrads={total}
            consultingPct={consultingPct}
            corpStratPct={corpStratPct}
            productPct={productPct}
            companiesRepresented={uniqueCompanies.size}
          />
        </div>
      </section>

      {/* Charts */}
      <section className="bg-stone pb-16 pt-8">
        <div className="mx-auto max-w-6xl space-y-8 px-6">
          <div className="grid gap-8 lg:grid-cols-2">
            <RoleBucketChart data={roleBucketData} />
            <div className="bg-white p-6 shadow-xs">
              <h3 className="mb-4 font-heading text-lg font-bold text-navy">
                Role Breakdown
              </h3>
              <div className="space-y-2">
                {roleBucketData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{
                          backgroundColor: ROLE_BUCKET_COLORS[item.name] || "#adb5bd",
                        }}
                      />
                      <span className="font-heading text-sm text-slate-gray">
                        {item.name}
                      </span>
                    </div>
                    <span className="font-heading text-sm font-semibold text-navy">
                      {item.value}{" "}
                      <span className="font-normal text-slate-gray">
                        ({item.pct}%)
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <TopCompaniesChart data={topCompanies} />
          <EraTrendsChart data={eraTrends} roleBuckets={activeRoleBuckets} />

          <div className="text-center">
            <CTAButton href="/careers#explore-placement-data">
              Explore Detailed Placement Data
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}
