import Image from "next/image";
import Link from "next/link";
import VideoEmbed from "@/components/ui/VideoEmbed";
import SubscribeForm from "@/components/newsletter/SubscribeForm";

/* ── Icon Components ── */
function CompassIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" opacity={0.15} stroke="none" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}

function BookOpenIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function NetworkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="2.5" />
      <circle cx="5" cy="19" r="2.5" />
      <circle cx="19" cy="19" r="2.5" />
      <path d="M12 7.5v4" />
      <path d="M12 11.5 5 16.5" />
      <path d="M12 11.5 19 16.5" />
    </svg>
  );
}

function TargetIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
  );
}

/* ── Data ── */
const audiences = [
  {
    title: "Prospective Students",
    tagline: "Discover what makes this program different.",
    icon: CompassIcon,
    links: [
      { href: "/courses", label: "Curriculum" },
      { href: "/careers", label: "Career outcomes" },
      { href: "/apply", label: "How to apply" },
    ],
    href: "/apply",
    cta: "Explore",
  },
  {
    title: "Current Students",
    tagline: "Courses, tracks, clubs, and recruiting resources.",
    icon: BookOpenIcon,
    links: [
      { href: "/courses", label: "Courses" },
      { href: "/tracks", label: "Career tracks" },
      { href: "/clubs", label: "Clubs & mentors" },
    ],
    href: "/courses",
    cta: "Resources",
  },
  {
    title: "Alumni",
    tagline: "Stay connected and give back.",
    icon: NetworkIcon,
    links: [
      { href: "/mentorship", label: "Mentorship" },
      { href: "/faculty", label: "Faculty & network" },
    ],
    href: "/mentorship",
    cta: "Connect",
  },
  {
    title: "Employers & Recruiters",
    tagline: "Recruit top talent from our pipeline.",
    icon: TargetIcon,
    links: [
      { href: "/careers", label: "Placement data" },
      { href: "/tracks", label: "Student skill sets" },
      { href: "/consortium", label: "Employer Consortium" },
    ],
    href: "/consortium",
    cta: "Partner",
  },
];

const stats = [
  { value: "Est. 2007", label: "" },
  { value: "1,100+", label: "Graduates" },
  { value: "#1", label: "BYU Consulting Pipeline" },
  { value: "#1", label: "BYU PM Pipeline" },
];

export default function Home() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <Image
          src="/images/tanner-building.jpg"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/80 via-navy/70 to-navy-dark/85" />

        <div className="relative mx-auto max-w-6xl px-6 pb-14 pt-12 md:pb-16 md:pt-14">
          {/* Title block */}
          <div className="animate-fade-up">
            <h1 className="font-heading text-4xl font-bold tracking-tight text-white md:text-5xl">
              Strategic Management
            </h1>
            <p className="mt-3 max-w-lg text-base leading-relaxed text-white/50">
              Combining rigorous analysis with high agency.
            </p>
          </div>

          {/* Stat pills */}
          <div className="mt-8 flex flex-wrap gap-3 animate-fade-up delay-2">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-2.5 rounded-sm border border-white/10 bg-white/[0.06] px-4 py-2.5 backdrop-blur-sm"
              >
                <span className="font-heading text-lg font-bold leading-none text-yellow">
                  {s.value}
                </span>
                {s.label && (
                  <span className="font-heading text-[10px] font-medium uppercase tracking-wider text-white/45">
                    {s.label}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Audience Cards ── */}
      <section className="bg-stone py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((a, i) => {
              const Icon = a.icon;
              return (
                <div
                  key={a.title}
                  className={`group relative flex flex-col bg-white px-7 pb-7 pt-6 shadow-xs transition-all duration-500 hover:-translate-y-1 hover:shadow-md animate-scale-in delay-${i + 1}`}
                >
                  {/* Gold top accent */}
                  <div className="absolute inset-x-0 top-0 h-[3px] bg-yellow transition-all duration-500 group-hover:h-[4px]" />

                  {/* Icon + Title */}
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy/[0.06] text-navy transition-colors duration-300 group-hover:bg-navy group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-3 font-heading text-base font-bold leading-snug text-navy">
                    {a.title}
                  </h3>
                  <p className="mt-1 text-sm italic text-slate-gray">
                    {a.tagline}
                  </p>

                  {/* Links */}
                  <ul className="mt-4 flex-1 space-y-1.5">
                    {a.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="inline-flex items-center gap-1.5 text-sm text-royal transition-colors hover:text-navy"
                        >
                          <span className="text-[10px] text-yellow">&#9654;</span>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="mt-4">
                    <Link
                      href={a.href}
                      className="group/cta inline-flex items-center gap-1.5 font-heading text-[11px] font-semibold uppercase tracking-widest text-royal transition-colors hover:text-navy"
                    >
                      {a.cta}
                      <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover/cta:translate-x-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── What is Strategy? ── */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.25em] text-yellow">
                The Discipline
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold leading-tight text-navy md:text-4xl">
                What is Strategy?
              </h2>
              <div className="mt-5 h-[2px] w-12 bg-yellow" />
              <div className="mt-6 space-y-5 text-base leading-[1.8] text-slate-gray">
                <p>
                  Strategy focuses on how organizations create, deliver, and
                  capture value to achieve long-term success&mdash;how firms set
                  goals, allocate resources, respond to competition, and adapt to
                  change.
                </p>
                <p>
                  The opportunity to study strategy at the undergraduate level is
                  extremely rare, almost always reserved for MBA and PhD
                  programs. BYU has one of the only undergraduate strategy majors
                  in the world.
                </p>
                <p>
                  Our students bring unique maturity&mdash;many have led missions
                  abroad, started businesses, learned second languages, and taken
                  on significant responsibility before entering the program.
                </p>
              </div>
            </div>
            <div className="lg:pt-12">
              <VideoEmbed
                videoId="UoTQAASOcAo"
                thumbnail="/images/dave-bryce.png"
                title="Dave Bryce on Strategy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Placement ── */}
      <section className="bg-stone py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.25em] text-yellow">
            Outcomes
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold leading-tight text-navy md:text-4xl">
            Where Our Graduates Land
          </h2>
          <div className="mt-5 h-[2px] w-12 bg-yellow" />
          <p className="mt-6 max-w-2xl text-base leading-[1.8] text-slate-gray">
            The major consistently achieves 100% placement with the highest
            average starting salary in the Marriott School. Our graduates land
            roles in management consulting, corporate strategy, product
            management, and beyond.
          </p>

          <div className="mt-10 space-y-6">
            <div className="overflow-hidden bg-white p-5 shadow-xs md:p-8">
              <Image
                src="/images/BYUStrategy-Placement-25.png"
                alt="BYU Strategy Placement Data"
                width={900}
                height={600}
                className="w-full"
              />
            </div>
            <div className="overflow-hidden bg-white p-5 shadow-xs md:p-8">
              <Image
                src="/images/BYUStrategy-Pipeline-25.png"
                alt="BYU Strategy Pipeline to Top Consulting Firms"
                width={900}
                height={600}
                className="mx-auto w-full max-w-[85%]"
              />
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/careers"
              className="group inline-flex items-center gap-2 bg-navy px-8 py-3.5 font-heading text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-royal hover:shadow-md"
            >
              View Full Placement Data
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Partners ── */}
      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.25em] text-yellow">
              Partnerships
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-navy">
              Our Partners
            </h2>
            <div className="mx-auto mt-5 h-[2px] w-12 bg-yellow" />
            <p className="mx-auto mt-6 max-w-xl text-base leading-[1.8] text-slate-gray">
              We curate partnerships that provide additional value to our
              students throughout the recruiting lifecycle.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="group flex flex-col items-center bg-stone px-8 py-10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm">
              <Image
                src="/images/management-consulted.png"
                alt="Management Consulted"
                width={220}
                height={64}
                className="mb-5"
              />
              <p className="max-w-xs text-center text-sm leading-relaxed text-slate-gray">
                600+ practice cases, 25K+ drills, and 9 video courses&mdash;provided
                free to all BYU Strategy students.
              </p>
            </div>
            <div className="group flex flex-col items-center bg-stone px-8 py-10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm">
              <Image
                src="/images/leland.png"
                alt="Leland Coaching"
                width={220}
                height={64}
                className="mb-5"
              />
              <p className="max-w-xs text-center text-sm leading-relaxed text-slate-gray">
                1-on-1 mock interviews with coaches from your target
                company&mdash;exclusive to BYU Strategy students.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="bg-navy py-16">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.25em] text-yellow">
            Stay Connected
          </p>
          <h2 className="mt-3 font-heading text-2xl font-bold text-white">
            Strategy Program Newsletter
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/60">
            Get program updates, placement highlights, featured alumni stories,
            and upcoming events delivered to your inbox.
          </p>
          <div className="mt-6 flex justify-center">
            <div className="w-full max-w-md">
              <SubscribeForm dark />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
