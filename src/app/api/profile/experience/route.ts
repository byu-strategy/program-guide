import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

async function getPersonId(supabase: Awaited<ReturnType<typeof createClient>>) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("person_id")
    .eq("id", user.id)
    .single();

  return profile?.person_id ?? null;
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const personId = await getPersonId(supabase);
  if (!personId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { error, data } = await supabase
    .from("experience")
    .insert({
      person_id: personId,
      company_name: body.company_name,
      job_title: body.job_title,
      start_date: body.start_date || null,
      end_date: body.end_date || null,
      is_current: body.is_current || false,
      source: "self",
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function PATCH(request: NextRequest) {
  const supabase = await createClient();
  const personId = await getPersonId(supabase);
  if (!personId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  if (!body.id) {
    return NextResponse.json({ error: "Missing experience id" }, { status: 400 });
  }

  const { error } = await supabase
    .from("experience")
    .update({
      company_name: body.company_name,
      job_title: body.job_title,
      start_date: body.start_date || null,
      end_date: body.end_date || null,
      is_current: body.is_current || false,
    })
    .eq("id", body.id)
    .eq("person_id", personId)
    .eq("source", "self");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  const supabase = await createClient();
  const personId = await getPersonId(supabase);
  if (!personId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing experience id" }, { status: 400 });
  }

  const { error } = await supabase
    .from("experience")
    .delete()
    .eq("id", parseInt(id))
    .eq("person_id", personId)
    .eq("source", "self");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
