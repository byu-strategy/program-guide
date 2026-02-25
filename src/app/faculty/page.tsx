import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import ProfileGrid from "@/components/ui/ProfileGrid";

export const metadata: Metadata = {
  title: "Faculty",
};

const faculty = [
  {
    name: "Ben Lewis",
    role: "STRAT 402: Economics of Strategy\nSTRAT 412: Data Analytics for Strategists",
    image: "/images/ben.jpeg",
  },
  {
    name: "David Bryce",
    role: "STRAT 411: Competitive Strategy\nSTRAT 490R: Corporate Strategy",
    image: "/images/dave.jpeg",
  },
  {
    name: "James Oldroyd",
    role: "STRAT 392: Strategy and Economics\nSTRAT 431/432: Strategic Thinking",
    image: "/images/jim.jpeg",
  },
  {
    name: "Jeff Dyer",
    role: "STRAT 401: Foundations of Strategy\nENT 401: Creativity and Innovation",
    image: "/images/jeff.jpeg",
  },
  {
    name: "Lena Lizunova",
    role: "STRAT 392: Strategy and Economics",
    image: "/images/lena.jpeg",
  },
  {
    name: "Mark Hansen",
    role: "STRAT 402: Economics of Strategy\nSTRAT 431/432: Strategic Thinking",
    image: "/images/mark.jpeg",
  },
  {
    name: "Paul Godfrey",
    role: "STRAT 421: Strategy Implementation",
    image: "/images/paul.jpeg",
  },
  {
    name: "Timothy Gubler",
    role: "STRAT 401: Foundations of Strategy\nSTRAT 421: Strategy Implementation (research)\nEMBA 683 / MBA 580",
    image: "/images/tim.jpeg",
  },
  {
    name: "Scott Murff",
    role: "STRAT 490R: Building Strategic AI Solutions\nSTRAT 490R: Creating Digital Products with AI\nSTRAT 325: Intro to Management Consulting",
    image: "/images/scott.jpeg",
  },
  {
    name: "Ryan Allen",
    role: "STRAT 401: Foundations of Strategy",
    image: "/images/ryan-allen.png",
  },
];

export default function FacultyPage() {
  return (
    <article className="prose">
      <PageHeader
        title="Faculty"
        subtitle="Meet the Strategy faculty at BYU Marriott"
      />

      <p>
        The Strategy faculty at Brigham Young University&apos;s Marriott School
        of Business comprises a distinguished group of scholars and educators
        dedicated to creating transformational learning experiences for students
        and advancing the field of strategic management.
      </p>
      <p>
        The faculty&apos;s expertise spans innovation, competitive strategy,
        corporate governance, decision making, and artificial intelligence. Their
        research is widely published in leading academic journals, and they are
        actively involved in mentoring students and contributing to the academic
        community.
      </p>

      <ProfileGrid profiles={faculty} />
    </article>
  );
}
