import ProfileCard from "./ProfileCard";

interface Profile {
  name: string;
  role: string;
  image: string;
  email?: string;
  links?: { label: string; href: string }[];
}

interface ProfileGridProps {
  profiles: Profile[];
}

export default function ProfileGrid({ profiles }: ProfileGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {profiles.map((p) => (
        <ProfileCard key={p.name} {...p} />
      ))}
    </div>
  );
}
