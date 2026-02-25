import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import DataTable from "@/components/ui/DataTable";

export const metadata: Metadata = {
  title: "Courses",
};

export default function CoursesPage() {
  return (
    <article className="prose">
      <PageHeader title="Courses" />

      <h2>Major Pre-reqs</h2>
      <ul>
        <li>ACC 200: Principles of Accounting</li>
        <li>IS 201: Introduction to Management Information Systems</li>
      </ul>
      <p>One course from the following list:</p>
      <ul>
        <li>ACC 310: Principles of Accounting 2</li>
        <li>
          <strong>ECON 110: Economic Principles and Problems</strong> (starting
          in 2026, Econ 110 will be a required pre-req. In 2025 any course from
          this list will be accepted)
        </li>
        <li>FIN 201: Principles of Finance</li>
        <li>GSCM 201 &amp; GSCM 211</li>
        <li>IS 303: Introduction to Computer Programming</li>
        <li>MKTG 201: Marketing Management</li>
        <li>STAT 121: Principles of Statistics</li>
      </ul>

      <h2>Minor Pre-reqs</h2>
      <ul>
        <li>ACC 200: Principles of Accounting</li>
        <li>ECON 110: Econ Principles &amp; Problems</li>
        <li>
          FIN 201: Principles of Finance (starting in 2026, this pre-req will be
          replaced by IS 201: Introduction to Information Systems. For 2025,
          either course will be accepted*)
        </li>
      </ul>
      <p>
        *If you apply using IS 201 in 2025 you must email{" "}
        <a href="mailto:lisa_giguere@byu.edu">Lisa Giguere</a> so she can
        substitute this for FIN 201 in your application.
      </p>

      <h2>Junior Year for Majors</h2>
      <p>
        All newly admitted students enroll in the following courses their Junior
        year:
      </p>

      <h3>Fall Semester</h3>
      <ul>
        <li>STRAT 326: Career Development (1.0 credit)</li>
        <li>STRAT 401: Intro to Strategic Management (3.0 credits)</li>
        <li>STRAT 402: Economics of Strategy (3.0 credits)</li>
        <li>STRAT 431: Strategic Thinking I (1.5 credits)</li>
      </ul>
      <p>
        Students who have not completed ECON 110 or STATS 121 should enroll in
        these during their first Fall semester in the program.
      </p>
      <p>
        <strong>
          Students interested in applying for the{" "}
          <a href="/tracks#product">Product track</a> should also enroll in the
          following:
        </strong>
      </p>

      <DataTable
        headers={[
          "Experiential Learning Option",
          "Fall Pre-Req Courses to Take",
          "Notes",
        ]}
        rows={[
          [
            "Associate Product Manager (APM) Internship",
            "MSB 341: Product Management (3.0 credits), MSB 342: Product Management Lecture Series (1.0 credit)",
            "4-month experience, may extend. Interviews mid-Fall; selection depends on course performance & company needs. 15-20 slots per year.",
          ],
          [
            "Associate Product Builder (APB) Fellowship",
            "STRAT 490R: Creating Digital Products with AI: Strategy & Prototyping, MSB 342: Product Management Lecture Series (1.0 credit)",
            "12-month experience; includes loan-based funding and stipend. Builds pre-validated products. Interviews mid-Fall. 5-10 slots per year.",
          ],
          [
            "Sandbox",
            "None formally required",
            "2-semester experience launching a tech venture. Apply in Winter. 5-10 slots per year.",
          ],
          [
            "Crocker Innovation Fellowship",
            "None formally required",
            "12-month program. Apply in Fall. Best for physical product builders. Only 1-2 slots per year.",
          ],
        ]}
      />

      <p className="mt-4">
        Students interested in doing the{" "}
        <a href="/tracks#sandbox">Sandbox capstone experience</a> will apply for
        that during <strong>Winter</strong> semester.
      </p>
      <p>
        All other students will complete the{" "}
        <a href="/tracks#management-consulting">
          Business Analyst capstone experience
        </a>{" "}
        their senior year while taking STRAT 421: Strategy Implementation. No
        separate application is required.
      </p>
      <p>
        Each student completes a single capstone experience by the time they
        graduate.
      </p>

      <h3>Winter Semester</h3>
      <ul>
        <li>STRAT 411: Competitive Strategy (3.0 credits)</li>
        <li>STRAT 412: Data Analytics for Strategists (3.0 credits)</li>
        <li>STRAT 432: Strategic Thinking II (1.5 credits)</li>
      </ul>
      <p>
        Students interested in doing the{" "}
        <a href="/tracks#sandbox">Sandbox capstone experience</a> will apply
        during Winter semester of their Junior year.
      </p>
      <p>
        Students admitted to the{" "}
        <a href="/tracks#apm-internship">APM Internship</a> will also enroll in:
      </p>
      <ul>
        <li>STRAT 477: APM Lab (3.0 credits)</li>
        <li>STRAT 490R: APM Capstone (1.0 credits)</li>
      </ul>

      <h2>Senior Year for Majors</h2>
      <p>
        During their senior year, students complete their chosen{" "}
        <a href="/tracks">capstone</a> experience. Students are encouraged to
        take other strategy electives based on their interests.
      </p>

      <h3>Fall Semester</h3>
      <ul>
        <li>STRAT 421: Strategy Implementation (3.0 credits)</li>
      </ul>
      <p>
        Students admitted to the{" "}
        <a href="/tracks#apm-internship">APM Internship</a> will also enroll in:
      </p>
      <ul>
        <li>ENT 401: Creativity and Innovation (3.0 credits)</li>
      </ul>

      <h2>Course List</h2>
      <p>
        A list of courses and key questions addressed in each is shown in the
        table below:
      </p>

      <DataTable
        headers={["Course Number", "Title", "Key Question Addressed"]}
        rows={[
          [
            "STRAT 401",
            "Intro to Strategic Management",
            "How do firms sustain competitive advantage and capture value? (case discussions)",
          ],
          [
            "STRAT 402",
            "Economics of Strategy",
            "What are the economic foundations that drive the success and failure of companies?",
          ],
          [
            "STRAT 411",
            "Competitive Strategy",
            "What should the company do to improve performance in a competitive and always changing market? (case presentations)",
          ],
          [
            "STRAT 412",
            "Data Analytics for Strategists",
            "What is the data telling me? (gather, analyze, and communicate insights)",
          ],
          [
            "STRAT 431/432",
            "Strategic Thinking",
            "How can I apply rigorous thinking to broader, societal questions?",
          ],
          [
            "ENT 401",
            "Creativity and Innovation",
            "How do companies innovate and create more value for customers?",
          ],
          [
            "STRAT 325",
            "Intro to Management Consulting",
            "How can I best prepare to land the interview, nail it, and excel in a Management Consulting job?",
          ],
          [
            "STRAT 490R",
            "Corporate Strategy",
            "How should a company choose and manage its portfolio of businesses to create long-term value?",
          ],
          [
            "STRAT 490R",
            "Creating Digital Products with AI",
            "How can I leverage new AI tools to rapidly test and iterate on new digital product ideas?",
          ],
          [
            "STRAT 490R",
            "Understanding AI: From Foundations to Strategy",
            "How does AI work under the hood and what can I expect and not expect from it?",
          ],
          [
            "STRAT 490R",
            "Advanced Strategy Analytics",
            "How can I apply advanced analytics to real business questions? (python, statistical methods)",
          ],
        ]}
      />

      <p className="mt-6">
        Still have questions? Read our <a href="/faq">FAQ</a> or email{" "}
        <a href="mailto:lisa_giguere@byu.edu">Lisa Giguere</a> from the{" "}
        <a
          href="https://marriott.byu.edu/advisement/center/contact/"
          target="_blank"
          rel="noopener noreferrer"
        >
          advisement office
        </a>
        .
      </p>
    </article>
  );
}
