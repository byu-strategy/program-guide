interface TierCardProps {
  name: string;
  price: string;
  benefits: string[];
  highlighted?: boolean;
}

export default function TierCard({ name, price, benefits, highlighted }: TierCardProps) {
  return (
    <div
      className={`relative flex flex-col p-6 shadow-xs ${
        highlighted
          ? "bg-navy text-white"
          : "bg-white"
      }`}
    >
      {highlighted && (
        <span className="absolute -top-3 left-6 rounded-full bg-yellow px-3 py-1 font-heading text-[9px] font-bold uppercase tracking-wider text-navy">
          Most Popular
        </span>
      )}
      <h3
        className={`font-heading text-xl font-bold ${
          highlighted ? "text-white" : "text-navy"
        }`}
      >
        {name}
      </h3>
      <p
        className={`mt-1 font-heading text-3xl font-bold ${
          highlighted ? "text-yellow" : "text-navy"
        }`}
      >
        {price}
        <span
          className={`text-sm font-normal ${
            highlighted ? "text-white/50" : "text-slate-gray"
          }`}
        >
          /year
        </span>
      </p>
      <ul className="mt-5 flex-1 space-y-2.5">
        {benefits.map((benefit) => (
          <li key={benefit} className="flex items-start gap-2 text-sm">
            <svg
              className={`mt-0.5 h-4 w-4 shrink-0 ${
                highlighted ? "text-yellow" : "text-green"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
            <span className={highlighted ? "text-white/80" : "text-slate-gray"}>
              {benefit}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <a
          href="mailto:scott.murff@byu.edu?subject=Employer%20Consortium%20Inquiry"
          className={`block w-full py-3 text-center font-heading text-sm font-semibold transition-colors ${
            highlighted
              ? "bg-yellow text-navy hover:bg-yellow/90"
              : "bg-navy text-white hover:bg-royal"
          }`}
        >
          Get Started
        </a>
      </div>
    </div>
  );
}
