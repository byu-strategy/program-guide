import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import CareerFlowDiagram from "@/components/career-paths/CareerFlowDiagram";
import RoleBucketDetail from "@/components/career-paths/RoleBucketDetail";
import type { FirstPostGradJob } from "@/types/database";

export const metadata: Metadata = {
  title: "Career Paths",
  description: "Explore career trajectories of BYU Strategy alumni",
};

export default async function CareerPathsPage() {
  const supabase = await createClient();

  // Fetch first 3 jobs for transition analysis
  const { data: jobs, error } = await supabase
    .from("first_post_grad_job")
    .select("*")
    .lte("job_rank", 3);

  if (error || !jobs) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="font-heading text-3xl font-bold text-navy">Career Paths</h1>
        <p className="mt-2 text-slate-gray">
          Unable to load career path data. Please ensure the database views are configured.
        </p>
      </div>
    );
  }

  const allJobs = jobs as FirstPostGradJob[];
  const firstJobs = allJobs.filter((j) => j.job_rank === 1);
  const secondJobs = allJobs.filter((j) => j.job_rank === 2);

  // Build Sankey flow data (first job -> second job)
  const flowMap: Record<string, number> = {};
  const secondJobByPerson: Record<number, string> = {};
  secondJobs.forEach((j) => {
    secondJobByPerson[j.person_id] = j.role_bucket || "Other";
  });

  firstJobs.forEach((j) => {
    const source = j.role_bucket || "Other";
    const target = secondJobByPerson[j.person_id];
    if (target) {
      const key = `${source}|${target}`;
      flowMap[key] = (flowMap[key] || 0) + 1;
    }
  });

  const flows = Object.entries(flowMap).map(([key, value]) => {
    const [source, target] = key.split("|");
    return { source, target, value };
  });

  // Get unique labels sorted by count
  const sourceCounts: Record<string, number> = {};
  const targetCounts: Record<string, number> = {};
  flows.forEach((f) => {
    sourceCounts[f.source] = (sourceCounts[f.source] || 0) + f.value;
    targetCounts[f.target] = (targetCounts[f.target] || 0) + f.value;
  });

  const sourceLabels = Object.entries(sourceCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([k]) => k);
  const targetLabels = Object.entries(targetCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([k]) => k);

  // Build role bucket detail data
  const bucketData: Record<
    string,
    {
      count: number;
      companies: Record<string, number>;
      titles: Record<string, number>;
    }
  > = {};

  firstJobs.forEach((j) => {
    const bucket = j.role_bucket || "Other";
    if (!bucketData[bucket]) {
      bucketData[bucket] = { count: 0, companies: {}, titles: {} };
    }
    bucketData[bucket].count++;
    if (j.company_name) {
      bucketData[bucket].companies[j.company_name] =
        (bucketData[bucket].companies[j.company_name] || 0) + 1;
    }
    if (j.job_title) {
      bucketData[bucket].titles[j.job_title] =
        (bucketData[bucket].titles[j.job_title] || 0) + 1;
    }
  });

  const buckets = Object.entries(bucketData)
    .map(([bucket, data]) => ({
      bucket,
      count: data.count,
      topCompanies: Object.entries(data.companies)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count),
      commonTitles: Object.entries(data.titles)
        .map(([title, count]) => ({ title, count }))
        .sort((a, b) => b.count - a.count),
    }))
    .sort((a, b) => b.count - a.count);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-navy md:text-4xl">
          Career Paths
        </h1>
        <p className="mt-2 text-lg text-slate-gray">
          Explore how BYU Strategy alumni progress through their careers
        </p>
      </div>

      <div className="space-y-8">
        {flows.length > 0 && (
          <CareerFlowDiagram
            flows={flows}
            sourceLabels={sourceLabels}
            targetLabels={targetLabels}
          />
        )}

        <div>
          <h2 className="mb-4 font-heading text-xl font-bold text-navy">
            Role Categories
          </h2>
          <p className="mb-4 text-sm text-slate-gray">
            Click a role category to see top companies and common titles.
          </p>
          <RoleBucketDetail buckets={buckets} />
        </div>
      </div>
    </div>
  );
}
