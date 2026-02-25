"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import MentorCard from "@/components/mentorship/MentorCard";
import MentorRequestModal from "@/components/mentorship/MentorRequestModal";
import type { Person } from "@/types/database";

export default function FindMentorPage() {
  const [mentors, setMentors] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [requestTarget, setRequestTarget] = useState<Person | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchMentors() {
      const supabase = createClient();
      const { data } = await supabase
        .from("people")
        .select("*")
        .eq("mentor_available", true)
        .order("last_name", { ascending: true });

      setMentors((data || []) as Person[]);
      setLoading(false);
    }
    fetchMentors();
  }, []);

  const filtered = mentors.filter((m) => {
    if (!search) return true;
    const term = search.toLowerCase();
    return (
      m.first_name.toLowerCase().includes(term) ||
      m.last_name.toLowerCase().includes(term) ||
      (m.current_company || "").toLowerCase().includes(term) ||
      (m.current_job_title || "").toLowerCase().includes(term)
    );
  });

  function handleRequest(personId: number) {
    const person = mentors.find((m) => m.id === personId);
    if (person) setRequestTarget(person);
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-navy md:text-4xl">
          Find a Mentor
        </h1>
        <p className="mt-2 text-lg text-slate-gray">
          Connect with Strategy alumni who are available to mentor
        </p>
      </div>

      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, company, or title..."
          className="w-full max-w-md border border-slate-gray/20 bg-white px-4 py-2.5 text-sm transition-colors focus:border-royal focus:outline-none"
        />
      </div>

      {loading ? (
        <p className="text-slate-gray">Loading mentors...</p>
      ) : filtered.length === 0 ? (
        <p className="text-slate-gray">No mentors found matching your search.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((mentor) => (
            <MentorCard
              key={mentor.id}
              person={mentor}
              onRequest={handleRequest}
            />
          ))}
        </div>
      )}

      {requestTarget && (
        <MentorRequestModal
          mentorPersonId={requestTarget.id}
          mentorName={`${requestTarget.first_name} ${requestTarget.last_name}`}
          onClose={() => setRequestTarget(null)}
        />
      )}
    </div>
  );
}
