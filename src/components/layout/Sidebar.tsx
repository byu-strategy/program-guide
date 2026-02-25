"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const chapters = [
  { href: "/", label: "Program Overview" },
  { href: "/courses", label: "Courses" },
  { href: "/tracks", label: "Tracks" },
  { href: "/careers", label: "Careers" },
  { href: "/clubs", label: "Clubs" },
  { href: "/mentorship", label: "Mentorship" },
  { href: "/faculty", label: "Faculty" },
  { href: "/apply", label: "Apply" },
  { href: "/faq", label: "FAQ" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 lg:block">
      <nav className="sticky top-20 space-y-0.5 pr-4">
        <p className="mb-3 px-3 font-heading text-xs font-semibold tracking-wider text-slate-gray uppercase">
          Chapters
        </p>
        {chapters.map((ch) => {
          const active = pathname === ch.href;
          return (
            <Link
              key={ch.href}
              href={ch.href}
              className={`block rounded-r-sm border-l-3 px-3 py-2 font-heading text-sm transition-all ${
                active
                  ? "border-yellow bg-navy/5 font-semibold text-navy"
                  : "border-transparent text-slate-gray hover:border-slate-gray/30 hover:text-navy"
              }`}
            >
              {ch.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
