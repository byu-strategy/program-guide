import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import StudentEditForm from "@/components/profile/StudentEditForm";
import type { Person } from "@/types/database";

export const metadata: Metadata = {
  title: "Edit Student Profile",
};

export default async function StudentEditPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("person_id, role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "student") {
    return (
      <div className="mx-auto max-w-2xl px-6 py-10">
        <h1 className="font-heading text-3xl font-bold text-navy">Student Profile</h1>
        <p className="mt-4 text-slate-gray">
          This page is only available to students.
        </p>
      </div>
    );
  }

  if (!profile?.person_id) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-10">
        <h1 className="font-heading text-3xl font-bold text-navy">Student Profile</h1>
        <p className="mt-4 text-slate-gray">
          Your account is not linked to a student record. Please contact the program.
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
        <h1 className="font-heading text-3xl font-bold text-navy">Student Profile</h1>
        <p className="mt-4 text-slate-gray">Record not found.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="mb-2 font-heading text-3xl font-bold text-navy">Student Profile</h1>
      <p className="mb-8 text-slate-gray">
        Complete your profile so alumni and employers can learn about you.
      </p>
      <StudentEditForm person={person as Person} />
    </div>
  );
}
