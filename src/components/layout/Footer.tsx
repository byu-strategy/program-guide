import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-white/70">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Image
              src="/images/Strategy_left_blue_grey_rgb.png"
              alt="BYU Strategy"
              width={140}
              height={44}
              className="mb-4 h-9 w-auto"
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              Strategic Management Program at BYU Marriott School of Business
            </p>
          </div>

          <div>
            <h4 className="mb-3 font-heading text-sm font-semibold tracking-wider text-yellow uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/courses" className="transition-colors hover:text-white">Courses</Link></li>
              <li><Link href="/tracks" className="transition-colors hover:text-white">Tracks</Link></li>
              <li><Link href="/careers" className="transition-colors hover:text-white">Careers</Link></li>
              <li><Link href="/outcomes" className="transition-colors hover:text-white">Outcomes</Link></li>
              <li><Link href="/apply" className="transition-colors hover:text-white">Apply</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-heading text-sm font-semibold tracking-wider text-yellow uppercase">
              Resources
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/clubs" className="transition-colors hover:text-white">Clubs</Link></li>
              <li><Link href="/mentorship" className="transition-colors hover:text-white">Mentorship</Link></li>
              <li><Link href="/faculty" className="transition-colors hover:text-white">Faculty</Link></li>
              <li><Link href="/faq" className="transition-colors hover:text-white">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-heading text-sm font-semibold tracking-wider text-yellow uppercase">
              Get Involved
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/jobs" className="transition-colors hover:text-white">Job Board</Link></li>
              <li><Link href="/give-back" className="transition-colors hover:text-white">Give Back</Link></li>
              <li><Link href="/consortium" className="transition-colors hover:text-white">Employer Consortium</Link></li>
              <li><Link href="/advisory-board" className="transition-colors hover:text-white">Advisory Board</Link></li>
              <li><Link href="/directory/alumni" className="transition-colors hover:text-white">Alumni Directory</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/40">
          &copy; {new Date().getFullYear()} BYU Marriott School of Business. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
