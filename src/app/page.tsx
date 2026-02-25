import Image from "next/image";
import PageHeader from "@/components/ui/PageHeader";
import VideoEmbed from "@/components/ui/VideoEmbed";

export default function Home() {
  return (
    <article className="prose">
      <PageHeader
        title="Program Overview"
        subtitle="Strategic Management at BYU Marriott School of Business"
      />

      <h2>Introduction</h2>
      <p>
        This guide is intended as an informational resource for prospective and
        current students as well as employers and others interested in learning
        about the Strategic Management major at BYU.
      </p>
      <p>
        The Strategic Management program at BYU helps students develop the skills
        needed to improve organizational performance by solving complex business
        problems and capitalizing on new opportunities. Doing so requires both
        hard technical skills (e.g. coding, data analysis, financial modeling)
        and soft people skills (e.g. influencing others through storytelling,
        developing trust, and working in teams).
      </p>
      <p>
        Because of the necessity for both hard and soft skills, the Strategy
        program seeks to attract students with high leadership potential who
        practice genuine curiosity, work well with others, are analytically
        rigorous, and driven.
      </p>

      <h2>What is Strategy?</h2>
      <p>
        The field of strategy, also called strategic management, is a discipline
        within business and management studies that focuses on how organizations
        create, deliver, and capture value to achieve long-term success. It deals
        with how firms make decisions about their goals, allocate resources,
        respond to competition, and adapt to changing environments.
      </p>
      <p>The core questions in strategy are:</p>
      <ul>
        <li>
          In what markets should we compete? (e.g., industries, geographies,
          customer segments)
        </li>
        <li>
          What is the unique value we will offer? (e.g., lower costs,
          differentiated product features)
        </li>
        <li>
          What capabilities and resources are necessary for us to be successful?
          (e.g., specialized skills, brand, culture)
        </li>
        <li>
          How can we sustain our competitive advantage to build a durable
          business? (e.g., barriers to imitation, network effects)
        </li>
      </ul>
      <p>
        These are complex, ambiguous, and high-stakes questions requiring the
        integration of knowledge spanning finance, marketing, operations,
        economics, and technology. Because of this complexity, the opportunity to
        major in strategy at the undergraduate level is very rare and almost
        always reserved for MBA and PhD level education. Indeed, BYU has one of
        the only Strategic Management undergraduate majors anywhere in the world.
      </p>
      <p>
        Why do we believe undergraduates at BYU are ready to study strategy when
        most institutions reserve it for graduate students? Simply put, BYU
        students are unlike any others. Many have already:
      </p>
      <ul>
        <li>
          Served volunteer missions for the Church of Jesus Christ of Latter-day
          Saints that required leadership, cross-cultural communication, and
          long-term planning
        </li>
        <li>Worked in meaningful jobs or started businesses</li>
        <li>Learned a second language and lived abroad</li>
        <li>Married and taken on family responsibilities</li>
      </ul>
      <p>
        BYU students are mission-driven individuals who routinely engage with
        big, life-shaping decisions. This maturity, combined with their
        intellectual rigor and values-based foundation, equips them to think
        strategically&mdash;grappling with ambiguity, balancing tradeoffs, and
        solving complex problems.
      </p>

      <h2>What do we look for in applicants?</h2>
      <p>
        A metaphor for the kind of student that will thrive in the Strategy
        program is that of a CEO-Janitor.
      </p>
      <p>
        The CEO-Janitor is someone who takes ownership like a CEO by solving hard
        problems, making strategic decisions, and leading with vision but is also
        willing to roll up their sleeves like a janitor to do whatever the team
        needs, no task too small or beneath them. This mindset captures the kind
        of low-ego, high-capacity leader the Strategy program seeks to cultivate:
        one who is driven, curious, collaborative, and unafraid of sometimes
        messy work.
      </p>
      <p>
        The program is not the best fit for students who prefer highly scripted
        environments or are not comfortable navigating between big picture
        thinking and nitty gritty execution.
      </p>

      <VideoEmbed
        videoId="UoTQAASOcAo"
        thumbnail="/images/dave-bryce.png"
        title="Dave Bryce on Strategy"
      />

      <h2>What is the curriculum like?</h2>
      <p>
        The Strategy curriculum is rigorous and covers both hard technical skills
        and soft people skills in order to give students the ability to lead,
        influence, and solve problems in today&apos;s technology driven world.
      </p>
      <p>
        Through our <a href="/courses">courses</a>, students will:
      </p>
      <ul>
        <li>Learn structured problem solving</li>
        <li>
          Engage in{" "}
          <a
            href="https://www.hbs.edu/mba/academic-experience/the-case-method"
            target="_blank"
            rel="noopener noreferrer"
          >
            case study based classroom discussions
          </a>
        </li>
        <li>
          Gather, analyze, and articulate insights from real world data using
          Excel, SQL, Python, and Tableau
        </li>
        <li>
          Prepare and present CEO quality slide decks containing evidence-based
          recommendations
        </li>
        <li>Gain proficiency with the latest AI tools</li>
        <li>
          Learn foundational economic theory and strategy frameworks to guide
          their thinking
        </li>
        <li>
          Complete a <a href="/tracks">capstone experience</a> for a real company
        </li>
      </ul>

      <h2>What are my career options?</h2>
      <p>
        Strategy graduates have a strong track record of placement in management
        consulting, corporate strategy, and product management roles. Because of
        the interdisciplinary nature of the degree, students also place well in a
        wide variety of other job types and are also well prepared for
        entrepreneurship. View our{" "}
        <a href="/careers">careers page</a> for a list of
        roles and companies that our graduates have landed in.
      </p>
      <p>
        The major consistently achieves 100% placement, with the{" "}
        <strong>
          highest average starting salary in the Marriott School ($83,000).
        </strong>
      </p>

      <div className="my-8">
        <Image
          src="/images/BYUStrategy-Placement-25.png"
          alt="BYU Strategy Placement Data"
          width={900}
          height={600}
          className="mx-auto w-full max-w-[85%] rounded-md shadow-sm"
        />
      </div>

      <p>
        For students looking to go into consulting, the Strategy program places
        the{" "}
        <strong>
          highest number of students at McKinsey, Bain, BCG (MBB) and other top
          consulting firms.
        </strong>
      </p>

      <div className="my-8">
        <Image
          src="/images/BYUStrategy-Pipeline-25.png"
          alt="BYU Strategy Pipeline to Top Consulting Firms"
          width={900}
          height={600}
          className="mx-auto w-full max-w-[75%] rounded-md shadow-sm"
        />
      </div>

      <h2>Partnerships</h2>
      <p>
        We are committed to giving our students the best education for careers in
        strategic management anywhere in the world. To this end, we actively look
        for partnerships and curate relationships that provide additional value
        to our students.
      </p>

      <div className="my-8 text-center">
        <Image
          src="/images/management-consulted.png"
          alt="Management Consulted"
          width={600}
          height={200}
          className="mx-auto"
        />
      </div>
      <p>
        Our partnership with Management Consulted gives students access to an
        incredibly rich set of self-serve content that supports them throughout
        the entire recruiting lifecycle including:
      </p>
      <ul>
        <li>
          <strong>600+ Practice Cases</strong> &mdash; 10+ firm styles, 10+
          industries, integrated solutions, 28 chatbot-style cases
        </li>
        <li>
          <strong>25K+ Case Drills</strong> &mdash; case structure, mental math,
          chart/graph/exhibit, brainstorming
        </li>
        <li>
          <strong>9 Video Courses</strong> &mdash; consulting industry bootcamp,
          resume/cover letter bootcamp, networking, fit interview, case
          interview, mental math, business basics, PowerPoint, Excel
        </li>
        <li>
          <strong>12 Industry Primers</strong> &mdash; automotive, consumer
          goods, fashion &amp; apparel, financial services, healthcare, and more
        </li>
      </ul>
      <p>
        Access to a premium account is provided to all BYU students by the
        Strategy Program.{" "}
        <a
          href="https://managementconsulted.com/marriott-registration/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <strong>Sign up here.</strong>
        </a>
      </p>

      <div className="my-8 text-center">
        <Image
          src="/images/leland.png"
          alt="Leland Coaching"
          width={600}
          height={200}
          className="mx-auto"
        />
      </div>
      <p>
        Leland is an online coaching platform that helps match individuals with
        people who have &ldquo;been there, done that&rdquo; (i.e. worked at the
        companies you want to work for) enabling highly tailored and relevant
        support.
      </p>
      <p>
        Strategy students who receive an interview offer from a top company for
        which Leland has a coach are provided with a 45 minute mock
        interview/coaching session with an employee or alumni from the target
        company. This is a unique student benefit, currently only offered by the
        Strategy program.
      </p>
      <p>
        If you receive an interview offer and would like to request a coaching
        session/mock interview with a Leland coach, fill out this short{" "}
        <a
          href="https://forms.office.com/Pages/ResponsePage.aspx?id=m278xvtRqEi3eZ7lZLQEE45FG9mNzyFEuhLo8BIWgNpUQVc0SFlEWDRJRU5QRkE2UUdFU1pUTzJKWi4u"
          target="_blank"
          rel="noopener noreferrer"
        >
          <strong>form</strong>
        </a>
        .
      </p>
    </article>
  );
}
