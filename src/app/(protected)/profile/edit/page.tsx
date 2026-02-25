import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ProfileEditForm from "@/components/profile/ProfileEditForm";
import type { Person } from "@/types/database";

export const metadata: Metadata = {
  title: "Edit Profile",
};

export default async function ProfileEditPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Get user profile
  const { data: profile } = await supabase
    .from("user_profiles")
    .select("person_id")
    .eq("id", user.id)
    .single();

  if (!profile?.person_id) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-10">
        <h1 className="font-heading text-3xl font-bold text-navy">Edit Profile</h1>
        <p className="mt-4 text-slate-gray">
          Your account is not linked to an alumni record. Please contact the program administrator
          to link your account.
        </p>
      </div>
    );
  }

  const { data: person } = await supabase
    .from("people")
    .select("*")
    .eq("id", profile.person_id)
    .single();

  if (!person) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-10">
        <h1 className="font-heading text-3xl font-bold text-navy">Edit Profile</h1>
        <p className="mt-4 text-slate-gray">Alumni record not found.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="mb-2 font-heading text-3xl font-bold text-navy">Edit Profile</h1>
      <p className="mb-8 text-slate-gray">
        Update your information to stay connected with the Strategy community.
      </p>
      <ProfileEditForm person={person as Person} />
    </div>
  );
}
