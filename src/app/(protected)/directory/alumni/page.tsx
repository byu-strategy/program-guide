import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getUserAccess } from "@/lib/supabase/helpers";
import AlumniTable from "@/components/directory/AlumniTable";
import DirectoryTabs from "@/components/directory/DirectoryTabs";
import type { Person, Experience, Education, UserRole } from "@/types/database";

export const metadata: Metadata = {
  title: "Alumni Directory",
};

export default async function AlumniDirectoryPage() {
  const { user, role, isConsortium } = await getUserAccess();
  if (!user || !role) return null;

  const supabase = await createClient();

  // Fetch all people (paginate past 1000 limit)
  const allPeople: Person[] = [];
  let offset = 0;
  const PAGE_SIZE = 1000;
  let hasMore = true;
  while (hasMore) {
    const { data } = await supabase
      .from("people")
      .select("*")
      .order("last_name", { ascending: true })
      .range(offset, offset + PAGE_SIZE - 1);
    if (!data || data.length === 0) break;
    allPeople.push(...(data as Person[]));
    hasMore = data.length === PAGE_SIZE;
    offset += PAGE_SIZE;
  }

  // Fetch all experience (for expandable rows)
  const allExperience: Experience[] = [];
  offset = 0;
  hasMore = true;
  while (hasMore) {
    const { data } = await supabase
      .from("experience")
      .select("*")
      .is("removed_at", null)
      .order("start_date", { ascending: false })
      .range(offset, offset + PAGE_SIZE - 1);
    if (!data || data.length === 0) break;
    allExperience.push(...(data as Experience[]));
    hasMore = data.length === PAGE_SIZE;
    offset += PAGE_SIZE;
  }

  // Fetch all education
  const allEducation: Education[] = [];
  offset = 0;
  hasMore = true;
  while (hasMore) {
    const { data } = await supabase
      .from("education")
      .select("*")
      .order("end_date", { ascending: false })
      .range(offset, offset + PAGE_SIZE - 1);
    if (!data || data.length === 0) break;
    allEducation.push(...(data as Education[]));
    hasMore = data.length === PAGE_SIZE;
    offset += PAGE_SIZE;
  }

  // Fetch emails (for faculty)
  let emailMap: Record<number, string> = {};
  if (role === "faculty") {
    const { data: emails } = await supabase
      .from("emails")
      .select("person_id, address")
      .eq("is_valid", true)
      .order("source", { ascending: true });
    if (emails) {
      // One email per person (first valid by source order)
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

      <DirectoryTabs active="alumni" />

      <div className="mt-6">
        <AlumniTable
          people={allPeople}
          experience={allExperience}
          education={allEducation}
          emailMap={emailMap}
          userRole={role as UserRole}
        />
      </div>
    </div>
  );
}
