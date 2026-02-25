"use client";

import { useState } from "react";
import PageHeader from "@/components/ui/PageHeader";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question:
      "Can I complete more than one experiential learning experience?",
    answer:
      "Typically, it is only possible to complete one capstone experience. An exception to this would be if a student completed the Sandbox program their sophomore year before entering the strategy major.",
  },
  {
    question: "Can I substitute other courses for my electives?",
    answer:
      'In general no, but exceptions may be granted with good justification for why the requested substitute course makes sense. Petitions for a substitution may be submitted to Lisa Giguere (lisa_giguere@byu.edu).',
  },
];

function FAQAccordion({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-slate-gray/10">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 text-left font-heading text-base font-semibold text-navy transition-colors hover:text-royal"
      >
        {item.question}
        <svg
          className={`ml-2 h-5 w-5 shrink-0 text-slate-gray transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="pb-4 text-sm leading-relaxed text-slate-gray">
          {item.answer}
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <article className="prose">
      <PageHeader
        title="FAQ"
        subtitle="Frequently asked questions about the Strategy program"
      />

      <p>
        Don&apos;t see an answer to your question?{" "}
        <a
          href="https://forms.office.com/r/nYdpRyreD0"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ask us here.
        </a>
      </p>

      <div className="not-prose mt-6 rounded-md bg-white p-6 shadow-sm">
        <h3 className="mb-4 font-heading text-lg font-semibold text-navy">
          Capstone Experiences
        </h3>
        {faqs.filter((_, i) => i === 0).map((faq) => (
          <FAQAccordion key={faq.question} item={faq} />
        ))}

        <h3 className="mb-4 mt-6 font-heading text-lg font-semibold text-navy">
          Course Substitutions
        </h3>
        {faqs.filter((_, i) => i === 1).map((faq) => (
          <FAQAccordion key={faq.question} item={faq} />
        ))}
      </div>
    </article>
  );
}
