"use client";

import Link from "next/link";

interface DirectoryTabsProps {
  active: "alumni" | "students";
}

export default function DirectoryTabs({ active }: DirectoryTabsProps) {
  return (
    <div className="flex border-b border-slate-gray/20">
      <Link
        href="/directory/alumni"
        className={`px-5 py-3 font-heading text-sm font-semibold transition-colors ${
          active === "alumni"
            ? "border-b-2 border-navy text-navy"
            : "text-slate-gray hover:text-navy"
        }`}
      >
        Alumni
      </Link>
      <Link
        href="/directory/students"
        className={`px-5 py-3 font-heading text-sm font-semibold transition-colors ${
          active === "students"
            ? "border-b-2 border-navy text-navy"
            : "text-slate-gray hover:text-navy"
        }`}
      >
        Students
      </Link>
    </div>
  );
}
