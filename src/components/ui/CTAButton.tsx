import Link from "next/link";

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "navy" | "gold";
  external?: boolean;
}

export default function CTAButton({ href, children, variant = "navy", external }: CTAButtonProps) {
  const base = "inline-block rounded-sm px-6 py-3 font-heading text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5";
  const variants = {
    navy: "bg-navy text-white hover:bg-royal shadow-sm hover:shadow-md",
    gold: "bg-yellow text-navy hover:bg-yellow/90 shadow-sm hover:shadow-md",
  };
  const className = `${base} ${variants[variant]}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
