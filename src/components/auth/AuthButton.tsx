"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div className="h-9 w-20" />;
  }

  if (!user) {
    return (
      <Link
        href="/login"
        className="rounded-sm bg-navy px-4 py-2 font-heading text-sm font-semibold text-white transition-colors hover:bg-royal"
      >
        Sign In
      </Link>
    );
  }

  return <UserMenu user={user} />;
}

function UserMenu({ user }: { user: User }) {
  const [open, setOpen] = useState(false);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  const displayName =
    user.user_metadata?.full_name ||
    user.email?.split("@")[0] ||
    "User";

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-sm px-3 py-2 font-heading text-sm transition-colors hover:text-navy"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-navy text-xs font-bold text-white">
          {displayName.charAt(0).toUpperCase()}
        </span>
        <span className="hidden text-slate-gray sm:inline">{displayName}</span>
        <svg
          className={`h-3 w-3 text-slate-gray transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 min-w-[180px] overflow-hidden bg-white shadow-md">
          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="block px-4 py-2.5 font-heading text-sm text-slate-gray transition-colors hover:bg-stone hover:text-navy"
          >
            Dashboard
          </Link>
          <Link
            href="/profile/edit"
            onClick={() => setOpen(false)}
            className="block px-4 py-2.5 font-heading text-sm text-slate-gray transition-colors hover:bg-stone hover:text-navy"
          >
            Edit Profile
          </Link>
          <Link
            href="/give-back"
            onClick={() => setOpen(false)}
            className="block px-4 py-2.5 font-heading text-sm text-slate-gray transition-colors hover:bg-stone hover:text-navy"
          >
            Give Back
          </Link>
          <hr className="border-slate-gray/10" />
          <button
            onClick={handleSignOut}
            className="block w-full px-4 py-2.5 text-left font-heading text-sm text-slate-gray transition-colors hover:bg-stone hover:text-red"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
