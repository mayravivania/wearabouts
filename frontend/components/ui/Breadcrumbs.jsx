import Link from "next/link";

export default function Breadcrumbs({ trail }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-fg-2">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {[{ href: "/", label: "Home" }, ...trail].map((crumb, i, all) => {
          const last = i === all.length - 1;
          return (
            <li key={crumb.label} className="flex items-center gap-2">
              {last || !crumb.href ? (
                <span aria-current={last ? "page" : undefined} className={last ? "text-fg" : ""}>
                  {crumb.label}
                </span>
              ) : (
                <Link href={crumb.href} className="hover:text-fg underline-offset-4 hover:underline">
                  {crumb.label}
                </Link>
              )}
              {!last && <span aria-hidden="true">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
