import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  if (!body.mentor_person_id) {
    return NextResponse.json(
      { error: "mentor_person_id is required" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("mentor_requests")
    .insert({
      student_id: user.id,
      mentor_person_id: body.mentor_person_id,
      message: body.message || null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
