import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Employer Consortium",
  description: "Partner with the BYU Strategy Program to access top undergraduate talent",
};

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
            Help us build the premier undergraduate strategy program.
            In return, get direct access to our students and alumni.
          </p>
        </div>
      </section>

      {/* What You Get */}
      <section className="bg-stone py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-center font-heading text-2xl font-bold text-navy">
            What Consortium Members Receive
          </h2>
          <div className="bg-white p-8 shadow-xs">
            <ul className="space-y-4">
              {[
                "First access to top strategy talent — post jobs, review resumes, and connect directly with students",
                "Priority placement on the program job board",
                "Invitations to our annual upskilling Zoom session with students and alumni",
                "Inclusion in the program newsletter distributed to 1,100+ alumni and current students",
                "Company logo and profile on the program website",
                "On-campus recruiting event access",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 block h-2 w-2 shrink-0 rounded-full bg-yellow" />
                  <span className="text-sm leading-relaxed text-slate-gray">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 border-t border-slate-gray/10 pt-6 text-center">
              <p className="font-heading text-sm text-slate-gray">
                Annual membership &mdash; pricing discussed on a per-company basis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-heading text-2xl font-bold text-navy">
            Interested?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-gray">
            Reach out and we&apos;ll set up a conversation about how the consortium works
            and whether it&apos;s a good fit for your team.
          </p>
          <a
            href="mailto:scott.murff@byu.edu?subject=Employer%20Consortium%20Inquiry"
            className="mt-6 inline-block bg-navy px-8 py-3.5 font-heading text-sm font-semibold text-white transition-colors hover:bg-royal"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </>
  );
}
