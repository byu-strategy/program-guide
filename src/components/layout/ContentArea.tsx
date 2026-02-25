"use client";

import { usePathname } from "next/navigation";

export default function ContentArea({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (isHome) {
    return <main>{children}</main>;
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-10 md:py-16">
      {children}
    </main>
  );
}
