import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);

  let query = supabase
    .from("jobs")
    .select("*")
    .eq("is_active", true)
    .order("is_consortium_priority", { ascending: false })
    .order("created_at", { ascending: false });

  const roleBucket = searchParams.get("role_bucket");
  if (roleBucket) query = query.eq("role_bucket", roleBucket);

  const jobType = searchParams.get("job_type");
  if (jobType) query = query.eq("job_type", jobType);

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  if (!body.title || !body.company_name) {
    return NextResponse.json(
      { error: "Title and company are required" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("jobs")
    .insert({
      posted_by: user.id,
      title: body.title,
      company_name: body.company_name,
      description: body.description || null,
      location: body.location || null,
      job_type: body.job_type || null,
      role_bucket: body.role_bucket || null,
      url: body.url || null,
      contact_email: body.contact_email || null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
