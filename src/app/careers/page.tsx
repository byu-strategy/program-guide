import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/ui/PageHeader";
import ProfileGrid from "@/components/ui/ProfileGrid";
import CTAButton from "@/components/ui/CTAButton";
import PivotTable from "@/components/career/PivotTable";

export const metadata: Metadata = {
  title: "Careers",
};

const careerContacts = [
  {
    name: "Bill Keenan",
    role: "Career Director\nStrategy, Entrepreneurship, and HR",
    image: "/images/bill.jpeg",
    email: "bill_keenan@byu.edu",
    links: [{ label: "Website", href: "https://www.keenanbyu.org/" }],
  },
  {
    name: "Sarah Sun Kanell",
    role: "Women in Strategy\nVP of Outreach",
    image: "/images/sarah.jpeg",
    email: "sunsarah@byu.edu",
  },
  {
    name: "Dustin Hubnik",
    role: "Strategy Society\nVP of Alumni",
    image: "/images/dustin.jpeg",
    email: "dhubnik@student.byu.edu",
  },
  {
    name: "Dallan Clarke",
    role: "Management Consulting\nVP of Mentoring",
    image: "/images/dallan.jpeg",
    email: "jdc295@student.byu.edu",
  },
  {
    name: "Nathan McCauley",
    role: "Product Management\nVP of Placement",
    image: "/images/nate.jpeg",
    email: "nmccaul@student.byu.edu",
  },
  {
    name: "Tatum Frazier",
    role: "Corporate Strategy\nVP of Corporate Outreach",
    image: "/images/tatum.jpeg",
    email: "tatumf2@student.byu.edu",
  },
  {
    name: "Catherine Rolapp",
    role: "Corporate Strategy\nVP of Corporate Outreach",
    image: "/images/catherine.jpeg",
    email: "crolapp@student.byu.edu",
  },
];

export default function CareersPage() {
  return (
    <article className="prose">
      <PageHeader
        title="Careers"
        subtitle="Career outcomes and placement data"
      />

      <h2>Overview</h2>
      <div className="my-6">
        <Image
          src="/images/2025-Strategy-MajorMinor-Flyer.png"
          alt="Strategy Major/Minor Flyer"
          width={900}
          height={1200}
          className="w-full rounded-md shadow-sm"
        />
      </div>

      <h2>Consulting</h2>
      <p>
        Management Consulting offers students the opportunity to work with
        leading firms solving complex business challenges across a wide range of
        industries. Consultants serve as trusted advisors&mdash;analyzing
        problems, designing solutions, and supporting implementation to drive
        organizational success.
      </p>
      <p>
        BYU students who have served missions are uniquely prepared for
        consulting because of several key characteristics shared between
        consulting and missionary service:
      </p>
      <ul>
        <li>
          <strong>Working with senior leaders</strong> &mdash; Consultants often
          collaborate with senior clients, much like missionaries engage with
          ward councils.
        </li>
        <li>
          <strong>Close knit team collaboration</strong> &mdash; Consultants
          typically work in small teams, similar to the companionship dynamic on
          a mission.
        </li>
        <li>
          <strong>Project-based structure</strong> &mdash; Consulting projects
          often last six weeks to six months before transitioning to a new
          client, which mirrors how missionaries rotate through different areas.
        </li>
      </ul>
      <p>
        The BYU Strategy program has one of the best consulting preparation
        curriculums anywhere in the country. Several of our faculty have worked
        as management consultants and infuse this experience throughout the
        curriculum.
      </p>
      <div className="mt-4">
        <CTAButton
          href="https://jobs.managementconsulted.com/jobs/management-consulting"
          external
        >
          Explore Consulting Job Board
        </CTAButton>
      </div>

      <h2>Corporate Strategy</h2>
      <p>
        A career in corporate strategy places students inside major companies
        where they help shape long-term business direction, analyze competitive
        positioning, and drive growth initiatives. Strategy professionals work
        closely with senior leadership to make data-driven decisions on market
        entry, M&amp;A, and innovation.
      </p>
      <div className="mt-4">
        <CTAButton
          href="https://jobs.managementconsulted.com/jobs/corporate-strategy"
          external
        >
          Explore Corporate Strategy Job Board
        </CTAButton>
      </div>

      <h2>Product Management</h2>
      <p>
        Product managers (PMs) are at the heart of technology and innovation,
        acting as the bridge between customer needs, business goals, and
        engineering capabilities. They lead cross-functional teams to discover,
        develop, and deliver products that users love and businesses value.
        Strategy students bring strong problem-solving, prioritization, and
        customer-centric thinking to this fast-paced and impactful career.
      </p>

      <h2>Entrepreneurship</h2>
      <p>
        Entrepreneurship allows students to turn ideas into ventures, whether by
        founding startups, joining early-stage teams, or launching within
        established companies. It requires vision, grit, and a deep
        understanding of markets, customers, and value creation.
      </p>

      <h2>Academia</h2>
      <p>
        A career as a professor in academia enables students to contribute to
        the world of ideas&mdash;through research, teaching, and thought
        leadership. Strategy students who pursue the Research track gain the
        analytical tools, writing skills, and intellectual discipline to pursue
        graduate studies or academic careers.
      </p>

      <h2>Other Career Paths</h2>
      <p>
        Strategy students pursue a wide range of paths beyond these traditional
        roles, including roles in private equity, venture capital, social impact,
        policy, business development, and general management. The analytical
        rigor and strategic mindset developed in the program prepare students to
        thrive in any setting where critical thinking and smart execution are
        valued.
      </p>

      <h2>Who can I talk with?</h2>
      <p>
        Bill Keenan is the Career Director for the Strategy program. He also
        serves students in the Entrepreneurship and HR majors. Bill is your first
        point of contact for everything career and recruiting related.
      </p>
      <p>Bill meets with both pre-business and current Strategy students and can help you with:</p>
      <ul>
        <li>Exploring career paths/related career options</li>
        <li>Resume development</li>
        <li>Interview preparation (mock interviews, etc.)</li>
        <li>Recruiting timelines and processes</li>
        <li>Networking</li>
        <li>Job opportunity identification</li>
        <li>Deciding on an offer</li>
        <li>Declining job/internship offers</li>
      </ul>
      <p>
        Learn more about the{" "}
        <a
          href="https://careerlaunch.byu.edu/meet-the-team"
          target="_blank"
          rel="noopener noreferrer"
        >
          Marriott Business Career Center
        </a>
        .
      </p>

      <ProfileGrid profiles={careerContacts} />

      <h2 id="explore-placement-data">Explore Placement Data</h2>
      <p>
        The table below is an interactive pivot table allowing you to filter and
        analyze the data according to your interest. View on desktop for best
        experience.
      </p>

      <PivotTable />
    </article>
  );
}
