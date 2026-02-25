import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Mentorship",
};

export default function MentorshipPage() {
  return (
    <article className="prose">
      <PageHeader
        title="Mentorship"
        subtitle="A multi-layered mentorship ecosystem"
      />

      <h2>Mentorship Opportunities in the Strategy Program</h2>
      <p>
        Mentorship is a core part of the BYU Strategy experience. We&apos;ve
        built a multi-layered mentorship ecosystem that connects students with
        peers, alumni, faculty, and professional advisors. These relationships
        are designed to support your growth&mdash;academically, professionally,
        and personally&mdash;from your first semester through graduation and
        beyond.
      </p>
      <p>
        Below is an overview of the key mentorship opportunities available to
        you:
      </p>

      <h3>Peer Mentorship: Seniors Mentoring Juniors</h3>
      <p>
        Each junior in the Strategy program is paired with a senior mentor.
        These mentors provide personalized guidance on course selection,
        recruiting timelines, case prep, and navigating the culture of the
        program. Their recent experience makes them approachable, practical, and
        invaluable resources.
      </p>

      <h3>Strategy Club Presidencies</h3>
      <p>
        The Strategy Club Presidency is composed of experienced student leaders
        who oversee program-wide initiatives, events, and communications. In
        addition to their leadership roles, members of the presidency serve as
        informal mentors and connectors, helping students plug into
        opportunities, alumni networks, and faculty support.
      </p>

      <h3>Alumni Mentorship via BYU Connect</h3>
      <p>
        Thousands of BYU alumni and many Strategy alumni are available for
        mentoring through{" "}
        <a
          href="https://connect.byu.edu"
          target="_blank"
          rel="noopener noreferrer"
        >
          BYU Connect
        </a>
        . This platform allows you to search for mentors by industry, company,
        or location. Alumni are generally very responsive and happy to help with
        career conversations, mock interviews, resume feedback, and more.
      </p>

      <h3>Alumni Mentors Outside BYU Connect</h3>
      <p>
        Some of our most involved alumni aren&apos;t active on BYU Connect but
        remain closely connected to the program through faculty and club
        relationships. These professionals are willing to mentor students when
        matched through faculty or student introductions.
      </p>

      <h3>Business Career Center (BCC)</h3>
      <p>
        The Business Career Center offers personalized career guidance. Services
        include resume reviews, mock interviews, application strategy, and
        access to employer networks. Students are strongly encouraged to meet
        with the BCC advisors early and often.
      </p>

      <h2>Advisement Center</h2>
      <p>
        The Marriott School Advisement Center supports your academic planning
        throughout your time in the Strategy program. Advisors can help with
        course sequencing, graduation planning, second majors or minors, and
        managing internship timelines.
      </p>

      <h3>Leland Coaching Partnership</h3>
      <p>
        The Strategy program maintains a partnership with{" "}
        <strong>Leland</strong>, a coaching platform that connects students with
        experienced coaches, many of whom are former consultants, product
        managers, or graduate school admittees. Strategy students who receive an
        interview offer from a top company for which Leland has a coach are
        provided with a 45 minute mock interview/coaching session. This is a
        unique student benefit, currently only offered by the Strategy program.
      </p>

      <h3>Faculty Mentorship</h3>
      <p>
        Faculty in the Strategy program are highly accessible and committed to
        student mentorship. Whether you&apos;re interested in research,
        considering graduate school, or exploring a specialized career path,
        faculty are available for one-on-one conversations and strategic
        guidance. These relationships often last well beyond your time at BYU.
      </p>

      <h2>Your Network Starts Now</h2>
      <p>
        The mentorship resources in the Strategy program are here to help you
        grow and succeed but it&apos;s up to you to engage. Reach out, ask
        questions, and take initiative. The connections you build here can shape
        your path for years to come.
      </p>
      <p>
        As you seek mentorship, remember that these opportunities are built on
        generosity and mutual respect. Be thoughtful in how you ask for time,
        come prepared with specific questions, and follow up with gratitude.
        Don&apos;t be a passive consumer of advice&mdash;be an engaged learner
        and a giver yourself.
      </p>
    </article>
  );
}
