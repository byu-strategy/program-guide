"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import AuthButton from "@/components/auth/AuthButton";
import { createClient } from "@/lib/supabase/client";

type NavLink = { href: string; label: string; authOnly?: boolean };
type NavDropdown = { label: string; children: NavLink[]; authOnly?: boolean };
type NavItem = NavLink | NavDropdown;

const navItems: NavItem[] = [
  { href: "/", label: "Program" },
  {
    label: "Academics",
    children: [
      { href: "/courses", label: "Courses" },
      { href: "/tracks", label: "Career Tracks" },
    ],
  },
  { href: "/careers", label: "Careers" },
  { href: "/outcomes", label: "Outcomes" },
  {
    label: "Community",
    children: [
      { href: "/clubs", label: "Clubs" },
      { href: "/mentorship", label: "Mentorship" },
      { href: "/faculty", label: "Faculty" },
    ],
  },
  { href: "/faq", label: "FAQ" },
  { href: "/consortium", label: "Consortium" },
  { href: "/directory", label: "Directory", authOnly: true },
  { href: "/career-paths", label: "Career Paths", authOnly: true },
  { href: "/jobs", label: "Jobs", authOnly: true },
];

const mobileLinks: NavLink[] = [
  { href: "/", label: "Program" },
  { href: "/courses", label: "Courses" },
  { href: "/tracks", label: "Career Tracks" },
  { href: "/careers", label: "Careers" },
  { href: "/outcomes", label: "Outcomes" },
  { href: "/clubs", label: "Clubs" },
  { href: "/mentorship", label: "Mentorship" },
  { href: "/faculty", label: "Faculty" },
  { href: "/faq", label: "FAQ" },
  { href: "/consortium", label: "Consortium" },
  { href: "/directory", label: "Directory", authOnly: true },
  { href: "/career-paths", label: "Career Paths", authOnly: true },
  { href: "/jobs", label: "Jobs", authOnly: true },
  { href: "/dashboard", label: "Dashboard", authOnly: true },
];

function Dropdown({
  label,
  children,
}: {
  label: string;
  children: { href: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isActive = children.some((c) => c.href === pathname);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1 rounded-sm px-3 py-2 font-heading text-sm transition-colors hover:text-navy ${
          isActive ? "text-navy" : "text-slate-gray"
        }`}
      >
        {label}
        <svg
          className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 min-w-[180px] overflow-hidden bg-white shadow-md">
          {children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              onClick={() => setOpen(false)}
              className={`block px-4 py-2.5 font-heading text-sm transition-colors hover:bg-stone hover:text-navy ${
                pathname === child.href ? "text-royal font-semibold" : "text-slate-gray"
              }`}
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setIsAuthed(!!user);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthed(!!session?.user);
    });
    return () => subscription.unsubscribe();
  }, []);

  const visibleNavItems = navItems.filter(
    (item) => !("authOnly" in item && item.authOnly && !isAuthed)
  );

  const visibleMobileLinks = mobileLinks.filter(
    (link) => !(link.authOnly && !isAuthed)
  );

  return (
    <header className="sticky top-0 z-50 bg-stone shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/Strategy_left_blue_grey_rgb.png"
            alt="BYU Strategy"
            width={140}
            height={44}
            className="h-16 w-auto"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 lg:flex">
          {visibleNavItems.map((item) =>
            "children" in item ? (
              <Dropdown
                key={item.label}
                label={item.label}
                children={(item as NavDropdown).children}
              />
            ) : (
              <Link
                key={(item as NavLink).href}
                href={(item as NavLink).href}
                className={`rounded-sm px-3 py-2 font-heading text-sm transition-colors hover:text-navy ${
                  pathname === (item as NavLink).href ? "text-navy font-semibold" : "text-slate-gray"
                }`}
              >
                {item.label}
              </Link>
            )
          )}
          <div className="ml-2 border-l border-slate-gray/20 pl-2">
            <AuthButton />
          </div>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center justify-center rounded-sm p-2 text-navy lg:hidden"
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="border-t border-navy/10 bg-stone px-4 pb-4 lg:hidden">
          {visibleMobileLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block px-3 py-2.5 font-heading text-sm transition-colors hover:text-navy ${
                pathname === link.href
                  ? "text-navy font-semibold"
                  : "text-slate-gray"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-2 border-t border-navy/10 px-3 pt-3">
            <AuthButton />
          </div>
        </nav>
      )}
    </header>
  );
}
