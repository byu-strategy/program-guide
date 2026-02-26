import type { Metadata } from "next";
import Link from "next/link";
import CTAButton from "@/components/ui/CTAButton";

export const metadata: Metadata = {
  title: "Give Back",
};

const engagementOptions = [
  {
    title: "Donate",
    description:
      "Your financial support directly funds student scholarships, case competitions, recruiting resources, and program operations. Every contribution strengthens the next generation of strategic leaders.",
    cta: "Donate Now",
    href: "https://donate.churchofjesuschrist.org/contribute/byu?funds=30124393",
    external: true,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    ),
  },
  {
    title: "Mentor",
    description:
      "All Strategy alumni are mentors. Students reach out via LinkedIn through the Alumni Directory. Update your profile so students can find and connect with you.",
    cta: "View Directory",
    href: "/directory/alumni",
    external: false,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
  },
  {
    title: "Recruit",
    description:
      "Post job and internship openings on our job board to reach BYU Strategy students and alumni. Join the Employer Consortium for premium recruiting access.",
    cta: "Post a Job",
    href: "/jobs",
    external: false,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
      </svg>
    ),
  },
  {
    title: "Guest Lecture",
    description:
      "Share your expertise with current students through a guest lecture. Topics can range from industry insights to career advice to specific functional expertise.",
    cta: "Express Interest",
    href: "mailto:scott.murff@byu.edu?subject=Guest%20Lecture%20Interest",
    external: true,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
      </svg>
    ),
  },
  {
    title: "Share Your Story",
    description:
      "Update your profile with your career journey. Your bio and experience help current students envision their own paths and discover unexpected career possibilities.",
    cta: "Update Profile",
    href: "/profile/edit",
    external: false,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
      </svg>
    ),
  },
];

export default function GiveBackPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-10">
        <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.25em] text-yellow">
          Alumni Engagement
        </p>
        <h1 className="mt-2 font-heading text-3xl font-bold text-navy md:text-4xl">
          Give Back
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-gray">
          The Strategy program thrives because alumni stay connected. Whether through
          mentorship, recruiting, financial support, or simply sharing your story,
          your engagement strengthens the community for everyone.
        </p>
      </div>

      <div className="space-y-6">
        {engagementOptions.map((option) => (
          <div
            key={option.title}
            className="flex flex-col gap-5 bg-white p-6 shadow-xs sm:flex-row sm:items-start"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy/[0.06] text-navy">
              {option.icon}
            </div>
            <div className="flex-1">
              <h2 className="font-heading text-lg font-bold text-navy">
                {option.title}
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-slate-gray">
                {option.description}
              </p>
              <div className="mt-3">
                <CTAButton href={option.href} external={option.external}>
                  {option.cta}
                </CTAButton>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Employer Consortium CTA */}
      <div className="mt-10 bg-navy p-8 text-center">
        <h2 className="font-heading text-2xl font-bold text-white">
          Employer Consortium
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-white/60">
          For companies that want structured access to BYU Strategy talent.
          Premium job listings, recruiting events, and direct student engagement.
        </p>
        <div className="mt-5">
          <Link
            href="/consortium"
            className="inline-block bg-yellow px-6 py-3 font-heading text-sm font-semibold text-navy transition-colors hover:bg-yellow/90"
          >
            Learn About the Consortium
          </Link>
        </div>
      </div>
    </div>
  );
}
