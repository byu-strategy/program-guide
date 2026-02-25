import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import DirectoryFilters from "@/components/directory/DirectoryFilters";
import DirectoryGrid from "@/components/directory/DirectoryGrid";
import type { Person } from "@/types/database";

export const metadata: Metadata = {
  title: "Alumni Directory",
};

const PAGE_SIZE = 50;

interface Props {
  searchParams: Promise<Record<string, string | undefined>>;
}

export default async function DirectoryPage({ searchParams }: Props) {
  const params = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("people")
    .select("*")
    .order("last_name", { ascending: true });

  // Search filter
  if (params.q) {
    const term = `%${params.q}%`;
    query = query.or(
      `first_name.ilike.${term},last_name.ilike.${term},current_company.ilike.${term},current_job_title.ilike.${term}`
    );
  }

  // Role bucket filter (requires joining experience — use current_job_title as proxy, or filter client-side)
  // For now we filter by company since role_bucket is on experience
  if (params.mentor_only === "true") {
    query = query.eq("mentor_available", true);
  }

  if (params.grad_year) {
    // grad_year in URL is the graduation year, cohort_year = grad_year - 2
    const cohortYear = parseInt(params.grad_year) - 2;
    query = query.eq("cohort_year", cohortYear);
  }

  // Paginate
  const page = parseInt(params.page || "1");
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE;

  const { data, error } = await query.range(from, to);

  const people = (data || []) as Person[];
  const hasMore = people.length > PAGE_SIZE;
  const displayPeople = hasMore ? people.slice(0, PAGE_SIZE) : people;

  // Build searchParams for client
  const clientParams: Record<string, string> = {};
  if (params.q) clientParams.q = params.q;
  if (params.role_bucket) clientParams.role_bucket = params.role_bucket;
  if (params.mentor_only) clientParams.mentor_only = params.mentor_only;
  if (params.grad_year) clientParams.grad_year = params.grad_year;

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-navy md:text-4xl">
          Alumni Directory
        </h1>
        <p className="mt-2 text-lg text-slate-gray">
          Search and connect with BYU Strategy alumni
        </p>
      </div>

      {error && (
        <p className="mb-4 text-sm text-red">
          Error loading directory. Please try again.
        </p>
      )}

      <DirectoryFilters />

      <div className="mt-8">
        <DirectoryGrid
          initialPeople={displayPeople}
          hasMore={hasMore}
          searchParams={clientParams}
        />
      </div>
    </div>
  );
}
