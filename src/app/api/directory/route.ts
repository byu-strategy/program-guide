import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

const PAGE_SIZE = 50;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const supabase = await createClient();

  // Verify authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let query = supabase
    .from("people")
    .select("*")
    .order("last_name", { ascending: true });

  const q = searchParams.get("q");
  if (q) {
    const term = `%${q}%`;
    query = query.or(
      `first_name.ilike.${term},last_name.ilike.${term},current_company.ilike.${term},current_job_title.ilike.${term}`
    );
  }

  if (searchParams.get("mentor_only") === "true") {
    query = query.eq("mentor_available", true);
  }

  const gradYear = searchParams.get("grad_year");
  if (gradYear) {
    const cohortYear = parseInt(gradYear) - 2;
    query = query.eq("cohort_year", cohortYear);
  }

  const page = parseInt(searchParams.get("page") || "1");
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE;

  const { data, error } = await query.range(from, to);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const people = data || [];
  const hasMore = people.length > PAGE_SIZE;

  return NextResponse.json({
    people: hasMore ? people.slice(0, PAGE_SIZE) : people,
    hasMore,
  });
}
