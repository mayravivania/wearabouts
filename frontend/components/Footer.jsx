import Link from "next/link";
import NewsletterForm from "./NewsletterForm";
import { CATEGORIES } from "@/lib/config";

const columns = [
  {
    title: "Shop",
    links: [{ href: "/katalog", label: "All pieces" }, ...CATEGORIES.map((c) => ({ href: `/katalog?category=${c.value}`, label: c.label }))],
  },
  {
    title: "Help",
    links: [
      { href: "/bantuan#size", label: "Size guide" },
      { href: "/bantuan#condition", label: "Condition grades" },
      { href: "/bantuan#shipping", label: "Shipping" },
      { href: "/bantuan#returns", label: "Returns" },
      { href: "/bantuan#contact", label: "Contact" },
    ],
  },
  {
    title: "Wearabouts",
    links: [
      { href: "/#story", label: "Our story" },
      { href: "/jual", label: "Sell with us" },
      { href: "/pesanan", label: "Your orders" },
      { href: "/masuk", label: "Sign in" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-24 bg-deep text-on-deep">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 pt-16 pb-10 flex flex-col gap-14">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div className="flex flex-col gap-6">
            <Link href="/" className="font-display italic text-5xl sm:text-6xl leading-none self-start">
              Wearabouts
            </Link>
            <p className="text-on-deep/70 max-w-sm leading-relaxed">
              New pieces every Friday at 7 PM. Get a note when the rail is restocked.
            </p>
            <NewsletterForm />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 text-[15px]">
            {columns.map((col) => (
              <div key={col.title} className="flex flex-col gap-2.5">
                <span className="text-xs text-on-deep/50 pb-1">{col.title}</span>
                {col.links.map((l) => (
                  <Link key={l.href} href={l.href} className="hover:opacity-70 self-start">
                    {l.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-4 border-t border-on-deep/15 pt-6 text-xs text-on-deep/60">
          <span>© 2026 Wearabouts. All rights reserved.</span>
          <div className="flex gap-6">
            <Link href="/bantuan#terms" className="hover:text-on-deep">Terms</Link>
            <Link href="/bantuan#privacy" className="hover:text-on-deep">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
