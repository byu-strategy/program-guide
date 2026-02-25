"use client";

import { useState, useTransition } from "react";
import type { Person } from "@/types/database";
import AlumniCard from "./AlumniCard";

interface DirectoryGridProps {
  initialPeople: Person[];
  hasMore: boolean;
  searchParams: Record<string, string>;
}

export default function DirectoryGrid({
  initialPeople,
  hasMore: initialHasMore,
  searchParams,
}: DirectoryGridProps) {
  const [people, setPeople] = useState(initialPeople);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isPending, startTransition] = useTransition();
  const [page, setPage] = useState(1);

  async function loadMore() {
    const nextPage = page + 1;
    const params = new URLSearchParams(searchParams);
    params.set("page", String(nextPage));

    startTransition(async () => {
      const res = await fetch(`/api/directory?${params.toString()}`);
      const data = await res.json();
      setPeople((prev) => [...prev, ...data.people]);
      setHasMore(data.hasMore);
      setPage(nextPage);
    });
  }

  if (people.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="font-heading text-lg text-slate-gray">
          No alumni found matching your filters.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {people.map((person) => (
          <AlumniCard key={person.id} person={person} />
        ))}
      </div>
      {hasMore && (
        <div className="mt-8 text-center">
          <button
            onClick={loadMore}
            disabled={isPending}
            className="bg-navy px-8 py-3 font-heading text-sm font-semibold text-white transition-colors hover:bg-royal disabled:opacity-50"
          >
            {isPending ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </>
  );
}
