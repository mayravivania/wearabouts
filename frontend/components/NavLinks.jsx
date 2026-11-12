"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function LinkGroup({ links, activePath = "" }) {
  return links.map((l) => (
    <Link
      key={l.href}
      href={l.href}
      className={`py-2 hover:opacity-70 transition-opacity ${activePath && activePath.startsWith(l.href) ? "underline underline-offset-[6px]" : ""}`}
    >
      {l.label}
    </Link>
  ));
}

// wajib di dalam Suspense (usePathname)
export default function NavLinks({ links }) {
  const pathname = usePathname();
  return <LinkGroup links={links} activePath={pathname} />;
}
