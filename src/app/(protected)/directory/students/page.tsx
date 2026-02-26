import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getUserAccess } from "@/lib/supabase/helpers";
import StudentTable from "@/components/directory/StudentTable";
import DirectoryTabs from "@/components/directory/DirectoryTabs";
import type { Person, UserRole } from "@/types/database";

export const metadata: Metadata = {
  title: "Student Directory",
};

export default async function StudentDirectoryPage() {
  const { user, role, isConsortium } = await getUserAccess();
  if (!user || !role) return null;

  const supabase = await createClient();

  // Fetch students — people linked to user_profiles with role='student'
  // OR people with a non-null track field (student profile fields filled in)
  // For now, query user_profiles for students and join to people
  const { data: studentProfiles } = await supabase
    .from("user_profiles")
    .select("person_id")
    .eq("role", "student")
    .not("person_id", "is", null);

  const studentPersonIds = (studentProfiles || [])
    .map((p) => p.person_id)
    .filter(Boolean) as number[];

  let students: Person[] = [];
  if (studentPersonIds.length > 0) {
    const { data } = await supabase
      .from("people")
      .select("*")
      .in("id", studentPersonIds)
      .order("last_name", { ascending: true });
    students = (data || []) as Person[];
  }

  // Fetch emails (for faculty)
  let emailMap: Record<number, string> = {};
  if (role === "faculty") {
    const { data: emails } = await supabase
      .from("emails")
      .select("person_id, address")
      .eq("is_valid", true)
      .in(
        "person_id",
        studentPersonIds.length > 0 ? studentPersonIds : [0]
      )
      .order("source", { ascending: true });
    if (emails) {
      for (const e of emails) {
        if (!emailMap[e.person_id]) {
          emailMap[e.person_id] = e.address;
        }
      }
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-6">
        <h1 className="font-heading text-3xl font-bold text-navy md:text-4xl">
          Directory
        </h1>
        <p className="mt-2 text-lg text-slate-gray">
          Search and connect with BYU Strategy alumni and students
        </p>
      </div>

      <DirectoryTabs active="students" />

      <div className="mt-6">
        <StudentTable
          students={students}
          emailMap={emailMap}
          userRole={role as UserRole}
          isConsortium={isConsortium}
        />
      </div>
    </div>
  );
}
