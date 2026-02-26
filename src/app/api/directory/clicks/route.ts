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

  if (!body.person_id || !body.click_type) {
    return NextResponse.json(
      { error: "person_id and click_type are required" },
      { status: 400 }
    );
  }

  if (!["profile_view", "linkedin_click"].includes(body.click_type)) {
    return NextResponse.json(
      { error: "Invalid click_type" },
      { status: 400 }
    );
  }

  const { error } = await supabase.from("directory_clicks").insert({
    clicked_by: user.id,
    person_id: body.person_id,
    click_type: body.click_type,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
