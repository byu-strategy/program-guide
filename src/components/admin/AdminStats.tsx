interface AdminStatsProps {
  stats: {
    totalUsers: number;
    byRole: Record<string, number>;
    recentSignups: number;
    totalClicks: number;
    profileViews: number;
    linkedinClicks: number;
  };
}

export default function AdminStats({ stats }: AdminStatsProps) {
  return (
    <div className="bg-white p-5 shadow-xs">
      <h3 className="mb-4 font-heading text-sm font-bold text-navy">
        Quick Stats
      </h3>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <StatBox label="Total Users" value={stats.totalUsers} />
        {Object.entries(stats.byRole).map(([role, count]) => (
          <StatBox key={role} label={role} value={count} />
        ))}
        <StatBox label="Recent Signups (30d)" value={stats.recentSignups} />
        <StatBox label="Profile Views" value={stats.profileViews} />
        <StatBox label="LinkedIn Clicks" value={stats.linkedinClicks} />
      </div>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-sm bg-stone p-3">
      <p className="font-heading text-2xl font-bold text-navy">{value}</p>
      <p className="font-heading text-[10px] font-semibold uppercase tracking-wider text-slate-gray">
        {label}
      </p>
    </div>
  );
}
