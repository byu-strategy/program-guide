import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const body = await request.json();

  if (!body.email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  // Check if already subscribed
  const { data: existing } = await supabase
    .from("newsletter_subscribers")
    .select("id, unsubscribed_at")
    .ilike("email", body.email)
    .single();

  if (existing) {
    if (existing.unsubscribed_at) {
      // Re-subscribe
      const { error } = await supabase
        .from("newsletter_subscribers")
        .update({ unsubscribed_at: null })
        .eq("id", existing.id);

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json({ resubscribed: true });
    }
    // Already subscribed
    return NextResponse.json({ already_subscribed: true });
  }

  // Check if email matches a person in the database
  const { data: emailMatch } = await supabase
    .from("emails")
    .select("person_id")
    .ilike("address", body.email)
    .limit(1)
    .single();

  const { error } = await supabase
    .from("newsletter_subscribers")
    .insert({
      email: body.email,
      person_id: emailMatch?.person_id || null,
      type: emailMatch ? "alumni" : "friend",
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ subscribed: true });
}

export async function DELETE(request: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const { error } = await supabase
    .from("newsletter_subscribers")
    .update({ unsubscribed_at: new Date().toISOString() })
    .ilike("email", email);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ unsubscribed: true });
}
