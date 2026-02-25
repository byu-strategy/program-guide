import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import CTAButton from "@/components/ui/CTAButton";

export const metadata: Metadata = {
  title: "Apply",
};

export default function ApplyPage() {
  return (
    <article className="prose">
      <PageHeader
        title="Apply"
        subtitle="Join the Strategic Management program at BYU"
      />

      <div className="mb-6">
        <CTAButton href="https://marriott.byu.edu/apply/dashboard/" external variant="gold">
          Apply Here
        </CTAButton>
      </div>

      <p>
        Applications due: <strong>Last work day of June before 4:30 p.m.</strong>
      </p>

      <p>Factors considered for admission are:</p>
      <ul>
        <li>Pre-req GPA</li>
        <li>BYU GPA</li>
        <li>ACT or SAT score</li>
        <li>Brief written essays</li>
        <li>Video interview and case question response</li>
        <li>Personal interactions with program faculty and club leadership</li>
      </ul>

      <h2>Application Tips</h2>

      <h3>Case Preparation</h3>
      <p>
        Your application will include responding to a case question. Answering a
        case question is a type of simulation that explores how you would think
        through a real business problem. You&apos;re asked to analyze a business
        situation, structure your thinking, and recommend a course of action. It
        tests how you break down complex problems, use data, and communicate
        solutions clearly and logically while under a bit of time pressure.
        It&apos;s less about getting the &ldquo;exact right answer&rdquo; and
        more about demonstrating your approach to solving complex, ambiguous
        problems.
      </p>
      <p>
        You are strongly encouraged to practice several case questions before you
        complete your actual case interview.
      </p>
      <p>
        Below you will find two types of case questions both of which will be
        valuable to practice. The first two are past case questions from strategy
        admissions and the remainder are example cases from McKinsey and Company.
      </p>

      <h3>Practice Cases</h3>
      <ul>
        <li>
          <a
            href="https://byu-my.sharepoint.com/:w:/g/personal/murff_byu_edu/EYJXiOSdEslHqYeG5AQBLCQB21i0E1blVlS48a0T_oNxMQ?e=IrkYKv"
            target="_blank"
            rel="noopener noreferrer"
          >
            2023 case question and solution
          </a>
        </li>
        <li>
          <a
            href="https://byu-my.sharepoint.com/:w:/g/personal/murff_byu_edu/EY6gqE3YuhJBtc-IEHaNkbIBfsxePrwVqdYbLnxVnIS5dA?e=EeDaUA"
            target="_blank"
            rel="noopener noreferrer"
          >
            2024 case question and solution
          </a>
        </li>
      </ul>

      <p>
        The McKinsey cases are designed for 20 to 30 minute interviews so will
        be more involved than what you will have to answer in your application.
        If you do well on the McKinsey practice cases, you will likely do well on
        the strategy admission case.
      </p>

      <h3>McKinsey Practice Cases</h3>
      <ul>
        <li>
          <a
            href="https://www.mckinsey.com/careers/interviewing/diconsa"
            target="_blank"
            rel="noopener noreferrer"
          >
            Deliver financial services to the unbanked
          </a>
        </li>
        <li>
          <a
            href="https://www.mckinsey.com/careers/interviewing/national-education"
            target="_blank"
            rel="noopener noreferrer"
          >
            Transform a national education system
          </a>
        </li>
        <li>
          <a
            href="https://www.mckinsey.com/careers/interviewing/talbot-trucks"
            target="_blank"
            rel="noopener noreferrer"
          >
            Assess the feasibility of manufacturing electric trucks
          </a>
        </li>
        <li>
          <a
            href="https://www.mckinsey.com/careers/interviewing/electrolight"
            target="_blank"
            rel="noopener noreferrer"
          >
            Launch a new sports drink
          </a>
        </li>
      </ul>
    </article>
  );
}
