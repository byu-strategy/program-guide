interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="font-heading text-3xl font-bold text-navy md:text-4xl">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-2 text-lg text-slate-gray">{subtitle}</p>
      )}
    </div>
  );
}
