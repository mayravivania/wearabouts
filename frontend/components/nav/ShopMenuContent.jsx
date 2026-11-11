import Link from "next/link";
import { SHOP_MENU, SIZES } from "@/lib/config";

// dipakai ShopMenu (desktop) dan MobileMenu
export default function ShopMenuContent({ onPick, compact = false }) {
  const heading = "text-xs text-fg-2 pb-3";

  return (
    <div className={`grid gap-10 ${compact ? "" : "lg:grid-cols-[1fr_1fr_1fr_1.3fr]"}`}>
      <div className="flex flex-col">
        <span className={heading}>Category</span>
        {SHOP_MENU.categories.map((c) => (
          <Link
            key={c.label}
            href={c.value ? `/katalog?category=${c.value}` : "/katalog"}
            onClick={onPick}
            className="font-display text-2xl leading-tight py-1.5 hover:italic"
          >
            {c.label}
          </Link>
        ))}
      </div>

      <div className="flex flex-col">
        <span className={heading}>Size</span>
        <div className="grid grid-cols-3 gap-2 max-w-60">
          {SIZES.map((s) => (
            <Link
              key={s}
              href={`/katalog?size=${s}`}
              onClick={onPick}
              className="min-h-11 inline-flex items-center justify-center rounded-md border border-line hover:border-fg text-[15px]"
            >
              {s}
            </Link>
          ))}
        </div>
        <Link href="/bantuan#size" onClick={onPick} className="mt-4 text-sm text-fg-2 underline underline-offset-4 hover:text-fg">
          How we measure
        </Link>
      </div>

      <div className="flex flex-col">
        <span className={heading}>Edits</span>
        {SHOP_MENU.edits.map((e) => (
          <Link key={e.href} href={e.href} onClick={onPick} className="py-2 text-[15px] hover:opacity-70">
            {e.label}
          </Link>
        ))}
      </div>

      <Link
        href="/jual"
        onClick={onPick}
        className="group rounded-xl bg-panel text-on-panel p-6 flex flex-col justify-between gap-6 min-h-44"
      >
        <span className="text-xs text-on-panel-2">Sell with us</span>
        <span className="font-display text-2xl leading-snug">
          Your closet has
          <br />
          <span className="italic">whereabouts too.</span>
        </span>
        <span className="text-sm">
          Send us a piece <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
        </span>
      </Link>
    </div>
  );
}
