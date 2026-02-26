"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import type { UserRole } from "@/types/database";

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
      if (user) {
        supabase
          .from("user_profiles")
          .select("role")
          .eq("id", user.id)
          .single()
          .then(({ data }) => {
            if (data) setRole(data.role as UserRole);
          });
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session?.user) setRole(null);
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

  return <UserMenu user={user} role={role} />;
}

const roleBadgeColors: Record<string, string> = {
  faculty: "bg-yellow/20 text-brown",
  student: "bg-royal/10 text-royal",
  alumni: "bg-navy/10 text-navy",
  employer: "bg-orange/10 text-orange",
};

function UserMenu({ user, role }: { user: User; role: UserRole | null }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

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
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-sm px-3 py-2 font-heading text-sm transition-colors hover:text-navy"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-navy text-xs font-bold text-white">
          {displayName.charAt(0).toUpperCase()}
        </span>
        <span className="hidden text-slate-gray sm:inline">{displayName}</span>
        {role && (
          <span className={`hidden rounded-full px-1.5 py-0.5 font-heading text-[9px] font-semibold uppercase tracking-wider sm:inline ${roleBadgeColors[role] || "bg-stone text-slate-gray"}`}>
            {role}
          </span>
        )}
        <svg
          className={`h-3 w-3 text-slate-gray transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      {open && (
        <div className="animate-dropdown-enter absolute right-0 top-full z-50 mt-2 min-w-[200px] overflow-hidden rounded-md bg-white shadow-lg">
          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="block px-4 py-2.5 font-heading text-sm text-slate-gray transition-colors hover:bg-stone/70 hover:text-navy"
          >
            Dashboard
          </Link>
          <Link
            href={role === "student" ? "/profile/student-edit" : "/profile/edit"}
            onClick={() => setOpen(false)}
            className="block px-4 py-2.5 font-heading text-sm text-slate-gray transition-colors hover:bg-stone/70 hover:text-navy"
          >
            Edit Profile
          </Link>
          <hr className="border-slate-gray/10" />
          <button
            onClick={handleSignOut}
            className="block w-full px-4 py-2.5 text-left font-heading text-sm text-slate-gray transition-colors hover:bg-stone/70 hover:text-red"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
