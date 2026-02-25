import type { Metadata } from "next";
import TierCard from "@/components/consortium/TierCard";

export const metadata: Metadata = {
  title: "Employer Consortium",
  description: "Partner with the BYU Strategy Program to access top undergraduate talent",
};

const tiers = [
  {
    name: "Partner",
    price: "$2,500",
    benefits: [
      "Job board access — post unlimited listings",
      "Company logo on program website",
      "1 on-campus recruiting event per year",
      "Access to student resumes (opt-in)",
      "Quarterly program updates",
    ],
  },
  {
    name: "Premier",
    price: "$5,000",
    highlighted: true,
    benefits: [
      "Everything in Partner",
      "Priority job listings (pinned at top)",
      "Searchable student talent directory",
      "2 recruiting events per year",
      "Newsletter sponsor slot",
      "Direct email intros to matched candidates",
    ],
  },
  {
    name: "Strategic",
    price: "$10,000",
    benefits: [
      "Everything in Premier",
      "Dedicated case competition sponsorship",
      "Guest lecture slot in curriculum",
      "Co-branded content and research",
      "Unlimited recruiting events",
      "Advisory board seat",
    ],
  },
];

export default function ConsortiumPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.25em] text-yellow">
            Employer Partnership
          </p>
          <h1 className="mt-3 font-heading text-3xl font-bold text-white md:text-4xl">
            Employer Consortium
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/60">
            Structured access to the premier undergraduate strategy talent pipeline.
            Partner with BYU&apos;s Strategic Management Program to recruit, engage, and
            develop top-tier analysts, consultants, and product managers.
          </p>
        </div>
      </section>

      {/* Why Partner */}
      <section className="bg-stone py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-center font-heading text-2xl font-bold text-navy">
            Why Partner With Us?
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                stat: "100%",
                label: "Placement Rate",
                desc: "Every graduate lands a full-time role",
              },
              {
                stat: "1,100+",
                label: "Alumni Network",
                desc: "Across consulting, strategy, PM, and finance",
              },
              {
                stat: "Top",
                label: "Starting Salaries",
                desc: "Highest average in the Marriott School",
              },
            ].map((item) => (
              <div key={item.label} className="bg-white p-6 text-center shadow-xs">
                <p className="font-heading text-3xl font-bold text-navy">{item.stat}</p>
                <p className="mt-1 font-heading text-sm font-semibold text-yellow">{item.label}</p>
                <p className="mt-2 text-xs text-slate-gray">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-2 text-center font-heading text-2xl font-bold text-navy">
            Membership Tiers
          </h2>
          <p className="mb-10 text-center text-sm text-slate-gray">
            Choose the partnership level that fits your recruiting needs.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {tiers.map((tier) => (
              <TierCard key={tier.name} {...tier} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-stone py-16">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-heading text-2xl font-bold text-navy">
            Ready to Partner?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-gray">
            Contact us to learn more about the Employer Consortium and how we can
            tailor a partnership to your recruiting needs.
          </p>
          <a
            href="mailto:scott.murff@byu.edu?subject=Employer%20Consortium%20Inquiry"
            className="mt-6 inline-block bg-navy px-8 py-3.5 font-heading text-sm font-semibold text-white transition-colors hover:bg-royal"
          >
            Contact Us
          </a>
        </div>
      </section>
    </>
  );
}
