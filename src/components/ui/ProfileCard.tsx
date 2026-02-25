import Image from "next/image";

interface ProfileCardProps {
  name: string;
  role: string;
  image: string;
  email?: string;
  links?: { label: string; href: string }[];
}

export default function ProfileCard({ name, role, image, email, links }: ProfileCardProps) {
  return (
    <div className="group flex flex-col items-center rounded-md bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
      style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
    >
      <div className="relative mb-3 h-24 w-24 overflow-hidden rounded-full bg-stone">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="96px"
        />
      </div>
      <h4 className="text-center font-heading text-sm font-semibold text-navy">
        {name}
      </h4>
      <p className="mt-0.5 text-center text-xs text-slate-gray whitespace-pre-line">
        {role}
      </p>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
        {email && (
          <a
            href={`mailto:${email}`}
            className="rounded-pill bg-navy/5 px-3 py-1 text-xs text-navy transition-colors hover:bg-navy/10"
          >
            Contact
          </a>
        )}
        {links?.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-pill bg-navy/5 px-3 py-1 text-xs text-navy transition-colors hover:bg-navy/10"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
