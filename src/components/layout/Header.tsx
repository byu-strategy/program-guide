"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import AuthButton from "@/components/auth/AuthButton";
import { createClient } from "@/lib/supabase/client";

/* ── Icon Components (16x16 inline SVGs) ── */

function IconBook({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 2.5h4c1.1 0 2 .9 2 2v9a1.5 1.5 0 0 0-1.5-1.5H2V2.5Z" />
      <path d="M14 2.5h-4c-1.1 0-2 .9-2 2v9a1.5 1.5 0 0 1 1.5-1.5H14V2.5Z" />
    </svg>
  );
}

function IconTarget({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="6" />
      <circle cx="8" cy="8" r="3" />
      <circle cx="8" cy="8" r="0.5" fill="currentColor" />
    </svg>
  );
}

function IconChart({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 14V8l3-3 3 3 4-6 2 2" />
      <path d="M2 14h12" />
    </svg>
  );
}

function IconRoute({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="4" cy="4" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <path d="M5.5 4H10a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2H6a2 2 0 0 0-2 2v0a2 2 0 0 0 2 2h4.5" />
    </svg>
  );
}

function IconBriefcase({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1.5" y="5" width="13" height="8" rx="1.5" />
      <path d="M5.5 5V3.5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1V5" />
    </svg>
  );
}

function IconUsers({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="5" r="2" />
      <path d="M2 13v-1a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v1" />
      <circle cx="11.5" cy="5.5" r="1.5" />
      <path d="M14 13v-.5a3 3 0 0 0-2.5-2.95" />
    </svg>
  );
}

function IconGradCap({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2 1 6l7 4 7-4-7-4Z" />
      <path d="M3 7.5v4c0 1.1 2.2 2 5 2s5-.9 5-2v-4" />
    </svg>
  );
}

function IconHandshake({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1.5 6.5 4 4l3 1 2.5-1.5L12 4l2.5 2.5" />
      <path d="M1.5 6.5 6 11l2-1 2.5 1.5L14.5 6.5" />
    </svg>
  );
}

function IconStar({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 1.5l1.85 3.75L14 5.85l-3 2.92.71 4.13L8 10.88 4.29 12.9 5 8.77 2 5.85l4.15-.6L8 1.5Z" />
    </svg>
  );
}

function IconClub({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="5" height="5" rx="1" />
      <rect x="9" y="2" width="5" height="5" rx="1" />
      <rect x="2" y="9" width="5" height="5" rx="1" />
      <rect x="9" y="9" width="5" height="5" rx="1" />
    </svg>
  );
}

function IconBuilding({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="1.5" width="10" height="13" rx="1" />
      <path d="M6 5h1M9 5h1M6 8h1M9 8h1" />
      <path d="M6 11h4v3.5H6z" />
    </svg>
  );
}

function IconShield({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 1.5 2.5 4v4c0 3.5 2.5 5.5 5.5 6.5 3-1 5.5-3 5.5-6.5V4L8 1.5Z" />
      <path d="M6 8l1.5 1.5L10 6" />
    </svg>
  );
}

function IconHeart({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 14s-5.5-3.5-5.5-7A3 3 0 0 1 8 4.5 3 3 0 0 1 13.5 7C13.5 10.5 8 14 8 14Z" />
    </svg>
  );
}

/* ── Nav Data Types ── */

type NavChild = {
  href: string;
  label: string;
  description: string;
  icon: ReactNode;
  authOnly?: boolean;
};

type NavDropdownItem = {
  label: string;
  children: NavChild[];
};

type NavLinkItem = {
  href: string;
  label: string;
};

type NavItem = NavLinkItem | NavDropdownItem;

function isDropdown(item: NavItem): item is NavDropdownItem {
  return "children" in item;
}

/* ── Nav Configuration ── */

const publicNavItems: NavItem[] = [
  { href: "/", label: "Program" },
  {
    label: "Academics",
    children: [
      { href: "/courses", label: "Courses", description: "Required classes & prereqs", icon: <IconBook className="text-slate-gray" /> },
      { href: "/tracks", label: "Career Tracks", description: "Four specialization paths", icon: <IconTarget className="text-slate-gray" /> },
    ],
  },
  {
    label: "Careers",
    children: [
      { href: "/outcomes", label: "Career Outcomes", description: "Placement data & trends", icon: <IconChart className="text-slate-gray" /> },
    ],
  },
  {
    label: "Community",
    children: [
      { href: "/clubs", label: "Clubs", description: "Student organizations", icon: <IconClub className="text-slate-gray" /> },
      { href: "/mentorship", label: "Mentorship", description: "Connect with alumni mentors", icon: <IconHandshake className="text-slate-gray" /> },
      { href: "/faculty", label: "Faculty", description: "Meet your professors", icon: <IconGradCap className="text-slate-gray" /> },
    ],
  },
  { href: "/faq", label: "FAQ" },
  { href: "/consortium", label: "Consortium" },
];

const authedNavItems: NavItem[] = [
  { href: "/", label: "Program" },
  {
    label: "Academics",
    children: [
      { href: "/courses", label: "Courses", description: "Required classes & prereqs", icon: <IconBook className="text-slate-gray" /> },
      { href: "/tracks", label: "Career Tracks", description: "Four specialization paths", icon: <IconTarget className="text-slate-gray" /> },
    ],
  },
  {
    label: "Careers",
    children: [
      { href: "/outcomes", label: "Outcomes", description: "Placement data & trends", icon: <IconChart className="text-slate-gray" /> },
      { href: "/career-paths", label: "Career Paths", description: "Role flows & company deep-dives", icon: <IconRoute className="text-slate-gray" />, authOnly: true },
      { href: "/jobs", label: "Jobs", description: "Browse & post opportunities", icon: <IconBriefcase className="text-slate-gray" />, authOnly: true },
    ],
  },
  {
    label: "Community",
    children: [
      { href: "/directory/alumni", label: "Alumni Directory", description: "Search alumni profiles", icon: <IconUsers className="text-slate-gray" />, authOnly: true },
      { href: "/directory/students", label: "Student Directory", description: "Find current students", icon: <IconGradCap className="text-slate-gray" />, authOnly: true },
      { href: "/clubs", label: "Clubs", description: "Student organizations", icon: <IconClub className="text-slate-gray" /> },
      { href: "/mentorship", label: "Mentorship", description: "Connect with alumni mentors", icon: <IconHandshake className="text-slate-gray" /> },
      { href: "/faculty", label: "Faculty", description: "Meet your professors", icon: <IconStar className="text-slate-gray" /> },
    ],
  },
  { href: "/faq", label: "FAQ" },
  {
    label: "Resources",
    children: [
      { href: "/consortium", label: "Consortium", description: "Employer partnership program", icon: <IconBuilding className="text-slate-gray" /> },
      { href: "/advisory-board", label: "Advisory Board", description: "Strategy Advisory Board", icon: <IconShield className="text-slate-gray" />, authOnly: true },
      { href: "/give-back", label: "Give Back", description: "Donate, mentor & recruit", icon: <IconHeart className="text-slate-gray" />, authOnly: true },
    ],
  },
];

/* ── Mobile Nav Groups ── */

type MobileGroup = {
  label: string;
  links: { href: string; label: string; authOnly?: boolean }[];
};

const publicMobileGroups: MobileGroup[] = [
  { label: "Program", links: [{ href: "/", label: "Program Overview" }] },
  { label: "Academics", links: [{ href: "/courses", label: "Courses" }, { href: "/tracks", label: "Career Tracks" }] },
  { label: "Careers", links: [{ href: "/outcomes", label: "Career Outcomes" }] },
  { label: "Community", links: [{ href: "/clubs", label: "Clubs" }, { href: "/mentorship", label: "Mentorship" }, { href: "/faculty", label: "Faculty" }] },
  { label: "More", links: [{ href: "/faq", label: "FAQ" }, { href: "/consortium", label: "Consortium" }] },
];

const authedMobileGroups: MobileGroup[] = [
  { label: "Program", links: [{ href: "/", label: "Program Overview" }] },
  { label: "Academics", links: [{ href: "/courses", label: "Courses" }, { href: "/tracks", label: "Career Tracks" }] },
  { label: "Careers", links: [{ href: "/outcomes", label: "Outcomes" }, { href: "/career-paths", label: "Career Paths" }, { href: "/jobs", label: "Jobs" }] },
  { label: "Community", links: [{ href: "/directory/alumni", label: "Alumni Directory" }, { href: "/directory/students", label: "Student Directory" }, { href: "/clubs", label: "Clubs" }, { href: "/mentorship", label: "Mentorship" }, { href: "/faculty", label: "Faculty" }] },
  { label: "Resources", links: [{ href: "/faq", label: "FAQ" }, { href: "/consortium", label: "Consortium" }, { href: "/advisory-board", label: "Advisory Board" }, { href: "/give-back", label: "Give Back" }] },
  { label: "Account", links: [{ href: "/dashboard", label: "Dashboard" }, { href: "/profile/edit", label: "Edit Profile" }] },
];

/* ── Dropdown Component ── */

function Dropdown({ label, children }: { label: string; children: NavChild[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isActive = children.some((c) => pathname === c.href || pathname.startsWith(c.href + "/"));

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
        className={`relative flex items-center gap-1 px-3 py-2 font-heading text-sm transition-colors hover:text-navy ${
          isActive ? "text-navy" : "text-slate-gray"
        }`}
      >
        {label}
        <svg
          className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
        {/* Active indicator */}
        {isActive && (
          <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-navy rounded-full" />
        )}
      </button>

      {open && (
        <div className="animate-dropdown-enter absolute left-0 top-full z-50 mt-2 w-[280px] overflow-hidden rounded-md bg-white shadow-lg">
          {children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              onClick={() => setOpen(false)}
              className={`flex items-start gap-3 px-4 py-3 transition-colors hover:bg-stone/70 ${
                pathname === child.href ? "bg-stone/50" : ""
              }`}
            >
              <span className="mt-0.5 shrink-0">{child.icon}</span>
              <span>
                <span className={`block font-heading text-sm ${
                  pathname === child.href ? "text-navy font-semibold" : "text-navy"
                }`}>
                  {child.label}
                </span>
                <span className="block text-xs text-slate-gray leading-snug mt-0.5">
                  {child.description}
                </span>
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Header ── */

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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navItems = isAuthed ? authedNavItems : publicNavItems;
  const mobileGroups = isAuthed ? authedMobileGroups : publicMobileGroups;

  return (
    <header className="sticky top-0 z-50 bg-stone shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
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
          {navItems.map((item) =>
            isDropdown(item) ? (
              <Dropdown
                key={item.label}
                label={item.label}
                children={item.children}
              />
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3 py-2 font-heading text-sm transition-colors hover:text-navy ${
                  pathname === item.href ? "text-navy" : "text-slate-gray"
                }`}
              >
                {item.label}
                {/* Active indicator */}
                {pathname === item.href && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-navy rounded-full" />
                )}
              </Link>
            )
          )}
          <div className="ml-3 border-l border-slate-gray/20 pl-3">
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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile full-screen overlay */}
      {menuOpen && (
        <div className="animate-mobile-nav-enter fixed inset-0 z-50 overflow-y-auto bg-stone lg:hidden">
          {/* Overlay header */}
          <div className="flex items-center justify-between px-6 py-4">
            <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center">
              <Image
                src="/images/Strategy_left_blue_grey_rgb.png"
                alt="BYU Strategy"
                width={140}
                height={44}
                className="h-16 w-auto"
                priority
              />
            </Link>
            <button
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center rounded-sm p-2 text-navy"
              aria-label="Close menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Grouped links */}
          <nav className="px-6 pb-8">
            {mobileGroups.map((group, gi) => (
              <div
                key={group.label}
                className="animate-mobile-group-enter mb-6"
                style={{ animationDelay: `${gi * 0.06}s` }}
              >
                <p className="mb-2 font-heading text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-gray">
                  {group.label}
                </p>
                <div className="space-y-0.5">
                  {group.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`block rounded-sm px-3 py-2.5 font-heading text-[15px] transition-colors hover:bg-white/60 hover:text-navy ${
                        pathname === link.href
                          ? "text-navy font-semibold bg-white/40"
                          : "text-navy/80"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {/* Auth section at bottom */}
            <div
              className="animate-mobile-group-enter border-t border-navy/10 pt-4"
              style={{ animationDelay: `${mobileGroups.length * 0.06}s` }}
            >
              <AuthButton />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
