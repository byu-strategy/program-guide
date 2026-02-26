"use client";

import { useState } from "react";
import type { UserRole } from "@/types/database";

interface RoleToggleWidgetProps {
  currentRole: UserRole;
}

const VIEWABLE_ROLES: { value: UserRole | "reset"; label: string }[] = [
  { value: "reset", label: "Faculty (actual)" },
  { value: "student", label: "View as Student" },
  { value: "alumni", label: "View as Alumni" },
  { value: "employer", label: "View as Employer" },
];

export default function RoleToggleWidget({ currentRole }: RoleToggleWidgetProps) {
  const [viewAs, setViewAs] = useState<string>("reset");

  function handleChange(value: string) {
    setViewAs(value);
    if (value === "reset") {
      document.cookie = "viewAs=; path=/; max-age=0";
    } else {
      document.cookie = `viewAs=${value}; path=/; max-age=86400`;
    }
    window.location.reload();
  }

  return (
    <div className="bg-white p-5 shadow-xs">
      <h3 className="mb-3 font-heading text-sm font-bold text-navy">
        Role Switcher
      </h3>
      <p className="mb-3 text-[11px] text-slate-gray">
        Preview the site as a different role. Your actual role: <span className="font-semibold">{currentRole}</span>
      </p>
      <div className="flex flex-wrap gap-2">
        {VIEWABLE_ROLES.map((r) => (
          <button
            key={r.value}
            onClick={() => handleChange(r.value)}
            className={`rounded-full px-3 py-1.5 font-heading text-xs font-semibold transition-colors ${
              viewAs === r.value
                ? "bg-navy text-white"
                : "bg-stone text-slate-gray hover:bg-navy/10"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>
    </div>
  );
}
