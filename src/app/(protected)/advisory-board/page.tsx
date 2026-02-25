import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Strategy Advisory Board",
  description:
    "Apply to join the Strategy Advisory Board and help build the program",
};

const expectations = [
  {
    title: "Annual financial contribution",
    desc: "A donation to fund scholarships, events, and program development. Amount discussed individually.",
  },
  {
    title: "Mentor at least one student per year",
    desc: "Through the program's mentorship platform, guide a current student on career decisions.",
  },
  {
    title: "Attend the annual session",
    desc: "Join the annual Zoom with students, alumni, and faculty for program updates and upskilling.",
  },
  {
    title: "Recruit or refer",
    desc: "Help place students by recruiting from BYU Strategy or referring candidates within your network.",
  },
  {
    title: "Advise on curriculum and direction",
    desc: "Provide feedback on what the program should teach based on what you see in the field.",
  },
];

export default function AdvisoryBoardPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.25em] text-yellow">
            Alumni Leadership
          </p>
          <h1 className="mt-3 font-heading text-3xl font-bold text-white md:text-4xl">
            Strategy Advisory Board
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/60">
            A small group of alumni who invest their time, expertise,
            and resources to build the program that built them.
          </p>
        </div>
      </section>

      {/* About */}
      <section className="bg-stone py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-6 font-heading text-2xl font-bold text-navy">
            About the Board
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-slate-gray">
            <p>
              The Strategy Advisory Board is 15&ndash;20 alumni who commit to
              actively supporting the BYU Strategic Management Program. Members
              serve three-year terms, renewable once.
            </p>
            <p>
              This is not an honorary title. Board members donate, mentor, help
              with recruiting, and advise faculty on curriculum. The goal is a
              tight, accountable group that moves the program forward.
            </p>
          </div>
        </div>
      </section>

      {/* Expectations */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-8 font-heading text-2xl font-bold text-navy">
            What&apos;s Expected
          </h2>
          <div className="space-y-6">
            {expectations.map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <span className="mt-1.5 block h-2.5 w-2.5 shrink-0 rounded-full bg-navy" />
                <div>
                  <h3 className="font-heading text-sm font-bold text-navy">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-gray">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Structure */}
      <section className="bg-stone py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { label: "Members", value: "15\u201320" },
              { label: "Term", value: "3 years" },
              { label: "Renewable", value: "Once" },
            ].map((item) => (
              <div key={item.label} className="bg-white p-6 text-center shadow-xs">
                <p className="font-heading text-2xl font-bold text-navy">
                  {item.value}
                </p>
                <p className="mt-1 font-heading text-xs font-semibold uppercase tracking-wider text-slate-gray">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apply */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-heading text-2xl font-bold text-navy">
            Apply to Serve
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-gray">
            If you&apos;re a BYU Strategy alum and want to help build the
            program, we&apos;d like to hear from you. Tell us what you&apos;d
            bring to the board and why you&apos;re interested.
          </p>
          <a
            href="mailto:scott.murff@byu.edu?subject=Advisory%20Board%20Application"
            className="mt-6 inline-block bg-navy px-8 py-3.5 font-heading text-sm font-semibold text-white transition-colors hover:bg-royal"
          >
            Submit Your Interest
          </a>
          <p className="mt-4 text-xs text-slate-gray/60">
            Applications are reviewed by the program director. You&apos;ll hear back within two weeks.
          </p>
        </div>
      </section>
    </>
  );
}
