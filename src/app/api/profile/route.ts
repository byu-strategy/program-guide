import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get person_id from user_profiles
  const { data: profile } = await supabase
    .from("user_profiles")
    .select("person_id")
    .eq("id", user.id)
    .single();

  if (!profile?.person_id) {
    return NextResponse.json({ error: "No linked alumni record" }, { status: 400 });
  }

  const body = await request.json();
  const allowedFields = [
    "bio",
    "mentor_available",
    "contact_preference",
    "current_job_title",
    "current_company",
    "location_city",
    "location_state",
  ];

  const updates: Record<string, unknown> = { self_updated_at: new Date().toISOString() };
  for (const field of allowedFields) {
    if (field in body) {
      updates[field] = body[field];
    }
  }

  const { error } = await supabase
    .from("people")
    .update(updates)
    .eq("id", profile.person_id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
