import Link from "next/link";
import HeroCarousel from "@/components/home/HeroCarousel";
import NewArrivals from "@/components/home/NewArrivals";
import { CATEGORIES } from "@/lib/config";

const promises = [
  ["Checked by hand", "Every seam, zip and button, before a piece goes up."],
  ["Measured flat", "Chest and length in centimetres on every listing, so sizes stop being a guess."],
  ["Shown as it is", "Daylight photos. Marks and fading are pictured, never hidden."],
  ["Yours alone", "One of each. The first checkout to go through claims it."],
];

const steps = [
  ["Where it’s been", "Each listing tells you the honest part: the wash, the wear, the little mark on the cuff, and the measurements."],
  ["Where it is", "There is only one, folded on our rail until someone claims it. The moment it sells, its tag turns to sold."],
  ["Where it goes", "We confirm your payment, pack it and send it on. Follow every step from your orders page."],
];

// ikon kategori (path SVG)
const icons = {
  outerwear: "M16 8 22 11 28 8 36 11 42 28 37 30 33 20 33 42 11 42 11 20 7 30 2 28 8 11Z M22 11V42",
  tops: "M15 8 22 11 29 8 40 14 36 22 32 20 32 42 12 42 12 20 8 22 4 14Z",
  bottoms: "M10 6H34L37 42H26L22 18 18 42H7Z M10 11H34",
  dresses: "M17 6H27L28 14 37 42H7L16 14Z M16 14H28",
};

export default function Home() {
  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
      <HeroCarousel />

      <section aria-label="Shop by category" className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {CATEGORIES.map((c) => (
          <Link
            key={c.value}
            href={`/katalog?category=${c.value}`}
            className="group rounded-xl border border-line bg-surface p-5 sm:p-6 flex items-end justify-between gap-4 min-h-32 hover:border-fg transition-colors"
          >
            <span className="flex flex-col gap-1">
              <span className="font-display text-2xl sm:text-3xl group-hover:italic">{c.label}</span>
              <span className="text-sm text-fg-2">
                Shop <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </span>
            </span>
            <svg width="44" height="48" viewBox="0 0 44 48" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" className="text-fg-2 shrink-0" aria-hidden="true">
              <path d={icons[c.value]} />
            </svg>
          </Link>
        ))}
      </section>

      <section id="new" className="py-24 flex flex-col gap-10 scroll-mt-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-3">
            <span className="w-8 border-t border-fg-2" />
            <span className="text-sm text-fg-2">New this week</span>
            <h2 className="font-display text-4xl sm:text-5xl tracking-tight leading-none">Just landed</h2>
          </div>
          <Link href="/katalog" className="text-[15px] underline underline-offset-[6px] hover:opacity-70">
            See everything →
          </Link>
        </div>
        <NewArrivals />
      </section>

      <section aria-label="What you can count on" className="grid gap-px bg-line border-y border-line sm:grid-cols-2 lg:grid-cols-4">
        {promises.map(([title, text], i) => (
          <div key={title} className="bg-bg py-8 sm:px-6 first:sm:pl-0 flex flex-col gap-2">
            <span className="text-xs text-fg-2 tabular-nums">0{i + 1}</span>
            <h3 className="font-display text-xl">{title}</h3>
            <p className="text-sm leading-relaxed text-fg-2">{text}</p>
          </div>
        ))}
      </section>

      <section id="story" className="mt-24 rounded-2xl bg-panel text-on-panel p-6 sm:p-14 grid gap-10 md:grid-cols-2 md:items-center scroll-mt-24">
        <div className="flex flex-col gap-4">
          <span className="w-8 border-t border-on-panel-2" />
          <span className="text-sm text-on-panel-2">The name</span>
          <h2 className="font-display text-4xl sm:text-6xl leading-[1.02] tracking-tight">
            Wear
            <span className="text-gold"> + </span>
            <br />
            <span className="italic">whereabouts.</span>
          </h2>
        </div>
        <div className="flex flex-col gap-4 leading-relaxed text-on-panel-2 text-lg">
          <p>
            <span className="text-on-panel">Whereabouts</span> means where something is, and where it has been.
            Secondhand clothes carry plenty of both: a jacket that already lived through a few rainy seasons, a shirt
            that has learned how to fall.
          </p>
          <p>
            None of that gets erased here. Every piece is listed with its real measurements, its honest marks and a
            number on its tag. Then it leaves, and its next whereabouts is wherever you wear it.
          </p>
        </div>
      </section>

      <section aria-label="How it works" className="pt-24 grid gap-12 md:grid-cols-3">
        {steps.map(([title, text], i) => (
          <div key={title} className="flex flex-col gap-3 border-t border-line pt-6">
            <span className="text-sm text-fg-2">0{i + 1}</span>
            <h3 className="font-display text-3xl italic">{title}</h3>
            <p className="leading-relaxed text-fg-2">{text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
