import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import ProfileGrid from "@/components/ui/ProfileGrid";
import CTAButton from "@/components/ui/CTAButton";

export const metadata: Metadata = {
  title: "Clubs",
};

const strategySociety = [
  { name: "Carter Boswell", role: "President", image: "/images/carter.jpeg", email: "cjboz@student.byu.edu" },
  { name: "Alex Napierski", role: "VP of Student Development", image: "/images/alex.jpeg", email: "ajnap3@student.byu.edu" },
  { name: "Cora Montgomery", role: "VP of Marketing", image: "/images/cora.jpeg", email: "coramo@student.byu.edu" },
  { name: "Dustin Hubnik", role: "VP of Alumni", image: "/images/dustin.jpeg", email: "dhubnik@student.byu.edu" },
  { name: "Kolton Dahl", role: "VP of Events", image: "/images/kolton.jpeg", email: "kdahl007@student.byu.edu" },
];

const mca = [
  { name: "Cole Bourne", role: "VP of Resources", image: "/images/cole.jpeg", email: "c0leb@student.byu.edu" },
  { name: "Dallan Clarke", role: "VP of Mentoring", image: "/images/dallan.jpeg", email: "jdc295@student.byu.edu" },
];

const pma = [
  { name: "Spencer Hintze", role: "Co-president", image: "/images/spencer.jpeg", email: "shintze1@student.byu.edu" },
  { name: "Ella Moore", role: "Co-president", image: "/images/ella.jpeg", email: "id214870@student.byu.edu" },
  { name: "Carter Field", role: "VP \u2013 Marketing", image: "/images/carter-f.jpeg", email: "fieldcc@student.byu.edu" },
  { name: "Dylan Mattern", role: "VP \u2013 Data and Technology", image: "/images/dylan.jpeg", email: "dmattern@student.byu.edu" },
  { name: "Nathan McCauley", role: "VP \u2013 Placement", image: "/images/nate.jpeg", email: "nmccaul@student.byu.edu" },
  { name: "Philip Sun", role: "VP \u2013 Events", image: "/images/philip.jpeg", email: "ps324@student.byu.edu" },
];

const csa = [
  { name: "Nick Wynn", role: "Co-president", image: "/images/nick.jpeg", email: "nwynn@student.byu.edu" },
  { name: "Ellie Sessions", role: "Co-president", image: "/images/ellie.jpeg", email: "ellies88@student.byu.edu" },
  { name: "Tatum Frazier", role: "VP of Corporate Outreach", image: "/images/tatum.jpeg", email: "tatumf2@student.byu.edu" },
  { name: "Catherine Rolapp", role: "VP of Corporate Outreach", image: "/images/catherine.jpeg", email: "crolapp@student.byu.edu" },
];

const wsa = [
  { name: "Rachel Wasden", role: "President", image: "/images/rachel.jpeg", email: "rjwasden@byu.edu" },
  { name: "Ella Moore", role: "VP of Events", image: "/images/ella.jpeg", email: "id214870@byu.edu" },
  { name: "Cora Montgomery", role: "VP of Marketing", image: "/images/cora.jpeg", email: "coramo@byu.edu" },
  { name: "Sarah Sun Kanell", role: "VP of Outreach", image: "/images/sarah.jpeg", email: "sunsarah@byu.edu" },
  { name: "Jacey Robins", role: "VP of Membership", image: "/images/jacey.jpeg", email: "jaceyrob@byu.edu" },
];

export default function ClubsPage() {
  return (
    <article className="prose">
      <PageHeader
        title="Clubs"
        subtitle="Student organizations sponsored by the Strategy program"
      />

      <h2>Sponsored Clubs</h2>
      <p>
        The Strategic Management program sponsors four clubs that help prepare
        students not only for admission to the program but for careers as well.
        It&apos;s not expected that a student would attend all of these clubs,
        but students interested in admission should plan to explore the clubs and
        see if there&apos;s one that they have particular interest in.
      </p>

      <h3>Strategy Society</h3>
      <p>
        All admitted Strategy students become part of the Strategy Society. The
        Strategy Society is led by a student leadership team who leads program
        wide events and initiatives. You can think of the Strategy Society as an
        umbrella organization for the four other sponsored clubs.
      </p>
      <ProfileGrid profiles={strategySociety} />

      <h3>
        <a href="https://www.byumca.com/" target="_blank" rel="noopener noreferrer">
          Management Consulting Association (MCA)
        </a>
      </h3>
      <p>
        Management consultants are elite problem-solvers, hired by companies to
        address complex business challenges. The MCA will prepare you for the
        real-world business world, with meetings run by students advanced in the
        consulting recruiting process, guest speakers, and trainings on interview
        best-practices, networking etiquette, and resume reviews.
      </p>
      <p>
        MCA Meetings are <strong>every Tuesday at 7pm</strong> in the Tanner
        building throughout the Fall and Winter semesters.
      </p>
      <ProfileGrid profiles={mca} />
      <div className="mt-4 text-center">
        <CTAButton
          href="https://clubs.byu.edu/p/clubview/18295873486205508"
          external
        >
          Join the MCA
        </CTAButton>
      </div>

      <h3>
        <a href="https://product.byu.edu/" target="_blank" rel="noopener noreferrer">
          Product Management Association (PMA)
        </a>
      </h3>
      <p>
        The Product Management Association at BYU helps prepare students to
        become world-class product managers. Activities provide targeted skill
        development, industry connections, career placement support, and a
        thriving community.
      </p>
      <p>
        PMA Meetings are{" "}
        <strong>every 1st Wednesday of the month at 5:30pm</strong> in the
        Tanner building throughout the Fall and Winter semesters.
      </p>
      <ProfileGrid profiles={pma} />
      <div className="mt-4 text-center">
        <CTAButton
          href="https://clubs.byu.edu/p/clubview/18295873486206095"
          external
        >
          Join PMA
        </CTAButton>
      </div>

      <h3>Corporate Strategy Association (CSA)</h3>
      <p>
        The purpose of the Corporate Strategy Association is to provide
        real-world business experience, hard-skills, and networking, through
        premium case competitions and great support. We offer members the
        opportunity to put their skills to the test in several case competitions
        each semester.
      </p>
      <p>
        CSA Meetings are <strong>every Thursday at 7pm</strong> in the Tanner
        building throughout the Fall and Winter semesters.
      </p>
      <ProfileGrid profiles={csa} />
      <div className="mt-4 text-center">
        <CTAButton
          href="https://clubs.byu.edu/p/clubview/18295873486205992"
          external
        >
          Join CSA
        </CTAButton>
      </div>

      <h3>
        <a href="https://wsabyuteam.wixsite.com/byuwsa" target="_blank" rel="noopener noreferrer">
          Women in Strategy Association (WSA)
        </a>
      </h3>
      <p>
        The purpose of the Women in Strategy Association is to elevate every
        woman in business &amp; support the BYU Marriott Strategy Program&apos;s
        sense of purpose &amp; community by fostering relationships within the
        program, enhancing professional opportunities, and expanding outreach to
        pre-business students.
      </p>
      <p>
        WSA meetings are{" "}
        <strong>every other Thursday at 5:30 - 6:30pm</strong> in the Tanner
        building throughout the Fall and Winter semesters.
      </p>
      <ProfileGrid profiles={wsa} />
      <div className="mt-4 text-center">
        <CTAButton
          href="https://clubs.byu.edu/p/clubview/18295873491224737"
          external
        >
          Join WSA
        </CTAButton>
      </div>
    </article>
  );
}
