import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/ui/PageHeader";
import CTAButton from "@/components/ui/CTAButton";

export const metadata: Metadata = {
  title: "Tracks",
};

export default function TracksPage() {
  return (
    <article className="prose">
      <PageHeader
        title="Tracks"
        subtitle="Four career tracks to guide your Strategy journey"
      />

      <p>
        Strategy students may choose (but are not required) to follow one of
        four tracks. Each track guides your elective choices, provides a distinct
        experiential learning opportunity, and connects to likely career
        outcomes. All majors, regardless of track, complete the same Junior Core.
        Minors complete a slightly trimmed version of the Junior Core and may
        also choose to align with a track contingent on the associated courses
        working for their schedule.
      </p>
      <p>
        Tracks are meant to help you select electives and understand the career
        paths a Strategy degree can lead to. You do not need to officially
        declare a track with the advisement office, and you may switch tracks at
        any time. However, if you are interested in the Product or Research
        tracks, it is best to decide soon after admission, as these require
        specific classes in your first semester to keep the option open.
      </p>

      <div className="my-8">
        <Image
          src="/images/tracks.png"
          alt="Strategy Tracks Overview"
          width={900}
          height={500}
          className="w-full rounded-md shadow-sm"
        />
      </div>

      <h2 id="management-consulting">Management Consulting</h2>
      <p>
        Originally known as the Business Analyst track, the Management
        Consulting track has formed the foundation of BYU&apos;s Strategy
        program since its inception in 2009. Founded by Jeff Dyer, a former Bain
        &amp; Company consultant and internationally recognized expert in
        innovation and strategy, the Strategy major was initially designed to
        prepare BYU students for consulting positions at top-tier firms. While we
        continue this mission today, the program has expanded to offer multiple
        tracks that reflect the growing landscape of career opportunities in
        strategy.
      </p>
      <p>
        Management consultants are <strong>external advisors</strong> to
        organizations that help them solve challenging business problems, improve
        performance, and implement strategic changes. Consultants bring
        specialized expertise, objective perspectives, and a structured
        problem-solving approach when companies are looking for support to
        address a particular problem effectively.
      </p>
      <p>
        Despite the disruption AI is causing throughout the economy and the
        impact of DOGE, demand for management consultants remains high with
        estimated revenues of ~$400BN annually in the US. In fact, the AI
        disruption presents new opportunities for management consultants to add
        value to organizations addressing the effects of AI on their workforce
        and on their business.
      </p>
      <p>
        McKinsey, Bain, and BCG (MBB) are the best known global consulting
        firms, however there is a long list of other excellent firms that you
        should consider. Because of the notoriety of the MBB firms, they receive
        an exceptionally high volume of applications, generally only hiring 1% of
        applicants.
      </p>
      <p>
        A complete list of leading consulting firms can be found{" "}
        <a
          href="https://www.forbes.com/lists/best-management-consulting-firms/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <strong>here</strong>
        </a>
        .
      </p>
      <p>
        <a
          href="https://www.linkedin.com/jobs/search/?currentJobId=4219660438&f_C=5210%2C5509%2C1038%2C224605%2C1784%2C2114%2C1371&f_E=1%2C2&f_F=cnsl&keywords=consultant&origin=JOB_SEARCH_PAGE_JOB_FILTER&refresh=true&sortBy=R"
          target="_blank"
          rel="noopener noreferrer"
        >
          See Example Job Descriptions
        </a>
      </p>

      <h2 id="corporate-strategy">Corporate Strategy</h2>
      <p>
        The Corporate Strategy track is best for students interested in being{" "}
        <strong>internal advisors</strong> to senior leadership teams to shape
        long-term direction, drive growth initiatives, and create sustainable
        competitive advantages. Corporate strategists operate at the
        intersection of analysis and execution, translating market insights and
        organizational capabilities into actionable strategic plans that drive
        business performance.
      </p>
      <p>
        Corporate strategy professionals are embedded within organizations as
        full-time employees, working closely with C-suite executives, business
        unit leaders, and cross-functional teams to identify opportunities,
        evaluate strategic options, and guide critical business decisions. Unlike
        external consultants, corporate strategists develop deep institutional
        knowledge and maintain long-term accountability for the outcomes of their
        recommendations.
      </p>
      <p>
        Corporate strategy roles exist across virtually every industry, from
        Fortune 500 corporations to high-growth startups. Corporate strategists
        typically focus on areas such as market analysis, competitive
        intelligence, merger and acquisition evaluation, new business
        development, strategic planning, and performance improvement initiatives.
      </p>
      <p>
        Leading companies known for strong corporate strategy functions include
        Amazon, Apple, Google, Microsoft, JPMorgan Chase, Johnson &amp; Johnson,
        Procter &amp; Gamble, and many others.
      </p>
      <p>
        <a
          href="https://www.linkedin.com/jobs/search/?currentJobId=4256357986&f_E=1%2C2&geoId=103644278&keywords=strategy%20analyst&origin=JOB_SEARCH_PAGE_KEYWORD_AUTOCOMPLETE&refresh=true"
          target="_blank"
          rel="noopener noreferrer"
        >
          See Example Job Descriptions
        </a>
      </p>

      <h2 id="product">Product</h2>
      <p>
        Product managers serve as the strategic orchestrators who bridge the gap
        between customer needs, business objectives, and technical capabilities
        to bring innovative products and features to market. Often described as
        &ldquo;mini-CEOs&rdquo; of their products, product managers are
        responsible for defining product vision, prioritizing features, and
        coordinating cross-functional teams to deliver solutions that create
        meaningful value for users and drive business growth.
      </p>
      <p>
        Product managers work as internal leaders within organizations,
        collaborating closely with engineering, design, marketing, sales, and
        executive teams. AI is allowing product managers to do more than ever
        before and be less reliant on engineering and design teams to decide what
        gets built.
      </p>
      <p>
        Students who join the Product track complete 1 of 4 experiential
        learning experiences:
      </p>
      <ol>
        <li>
          <strong>Associate Product Manager (APM) Internship:</strong> Students
          complete a 4-month product focused internship (unpaid) starting Winter
          of their junior year.
        </li>
        <li>
          <strong>Associate Product Builder (APB) Fellowship:</strong> Students
          build and deliver to market a pre-validated product concept from the
          Strategy Foundry, starting Winter of their junior year.
        </li>
        <li>
          <strong>Sandbox:</strong> Students build and launch a digital product
          from scratch starting in the summer after their junior year.
        </li>
        <li>
          <strong>Crocker Innovation Fellowship:</strong> Students design and
          build a physical product from scratch starting Winter of their junior
          year.
        </li>
      </ol>

      <h3 id="apm-internship">
        Associate Product Manager (APM) Internship
      </h3>
      <p>
        Students complete a 4-month product focused internship (unpaid) starting
        Winter of their junior year. Students work a minimum of 10 hours per
        week. Work may be in person or remote depending on the location and
        preferences of the company. The internship may extend into summer and
        convert to paid depending on negotiations between the company and the
        student.
      </p>
      <p>
        <strong>
          Students interested in being considered should enroll during Fall of
          their junior year in both:
        </strong>
      </p>
      <ul>
        <li>
          MSB 341: Product Management (cross listed as ENT 401) (3.0 credits)
        </li>
        <li>MSB 342: Product Management Lecture Series (1.0 credit)</li>
      </ul>
      <p>
        If your Junior Core schedule conflicts with enrolling in one or both of
        these courses, you may take <em>STRAT 490R-001: Creating Digital
        Products with AI</em> as an alternative in order to still be eligible.
      </p>

      <div className="my-8">
        <Image
          src="/images/2025-strategy-pm-track-flyer.png"
          alt="Product Management Track Flyer"
          width={700}
          height={900}
          className="mx-auto w-full max-w-[75%] rounded-md shadow-sm"
        />
      </div>

      <h3 id="apb-fellowship">
        Associate Product Builder (APB) Fellowship
      </h3>
      <p>
        The Associate Product Builder (APB) Fellowship is an 8-12 month
        experiential learning experience where students commercialize a
        pre-validated product concept from{" "}
        <a
          href="https://techtransfer.byu.edu/about-us"
          target="_blank"
          rel="noopener noreferrer"
        >
          BYU&apos;s tech transfer office
        </a>{" "}
        by seeking to earn real revenue, starting Winter of their junior year.
      </p>
      <ul>
        <li>
          Teams enroll in STRAT 477R during Winter semester and commit to working
          12 hours per week on the business.
        </li>
        <li>
          Students commit to continuing full-time (40 hours per week) over Spring
          and Summer terms at an hourly rate of not less than $13.50 per hour.
        </li>
        <li>
          Students earn 95% of revenue with a 5% royalty to the university.
        </li>
        <li>
          At the completion of Summer, students wanting to continue have the
          option of retaining an ownership stake.
        </li>
      </ul>
      <div className="mt-4">
        <CTAButton
          href="https://docs.google.com/forms/d/e/1FAIpQLSeIuWTANS1VbF4ORhfvfz9rXDGjzhwe7P-yjXvpsZGwNdrrMQ/viewform?usp=sharing&ouid=102863173559950072505"
          external
        >
          Register Your Interest
        </CTAButton>
      </div>

      <h3 id="sandbox">Sandbox</h3>
      <p>
        <a
          href="https://creators.byu.edu/sandbox/sandbox"
          target="_blank"
          rel="noopener noreferrer"
        >
          Sandbox
        </a>{" "}
        students spend two semesters working in a small team to build and launch
        a software tech business from scratch&mdash;one of the best experiences
        those interested in tech entrepreneurship or product management can get
        in school.
      </p>
      <p>
        In April of each year students completing Sandbox have the opportunity to
        pitch what they&apos;ve built to real investors. Applications are
        completed during Winter Semester. There are no formal pre-reqs.
      </p>

      <h3 id="crocker">Crocker Innovation Fellowship</h3>
      <p>
        The{" "}
        <a
          href="https://crockerinnovationfellows.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Crocker Innovation Fellowship
        </a>{" "}
        is an interdisciplinary innovation program that runs from January to
        December each year. Students study and practice principles of innovation
        in Winter semester, learn through a summer internship, and then study and
        practice principles of innovation commercialization in the Fall semester.
        Applications for the 2026 class will open Fall 2025.
      </p>

      <h2 id="research">Research</h2>
      <p>
        The Research track represents the intellectual foundation of strategic
        thinking, where professionals dedicate themselves to advancing the
        frontiers of business knowledge through rigorous analysis, original
        research, and innovative frameworks. This track attracts individuals
        passionate about deep inquiry and knowledge creation. Some students from
        this track will go on to pursue PhDs in Strategy or a related field.
      </p>
      <p>
        Students interested in the Research Track should enroll in the following
        courses:
      </p>
      <ul>
        <li>
          MBA 593R Section 2 (Fall of Junior Year): Introduction to PhD-level
          Research in Management
        </li>
        <li>STRAT 490R (Winter): Strategy Pre-PhD Prep</li>
        <li>STRAT 421 (Research Section): Strategy Implementation</li>
        <li>
          Other STATS and ECON classes that will develop your quantitative and
          data analytic skills
        </li>
      </ul>
    </article>
  );
}
