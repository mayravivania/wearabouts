import HangTag from "@/components/ui/HangTag";

// tampilan bersama halaman masuk dan daftar
export default function AuthLayout({ title, intro, perks, children }) {
  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-10 sm:py-14 grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-stretch">
      <aside className="hidden lg:flex rounded-2xl bg-panel text-on-panel p-12 flex-col justify-between gap-10 min-h-[560px] relative overflow-hidden">
        <div className="flex flex-col gap-5 max-w-sm">
          <span className="text-sm text-on-panel-2">Wearabouts</span>
          <p className="font-display text-4xl leading-tight">
            Every piece has <span className="italic">whereabouts.</span>
          </p>
        </div>
        <ul className="flex flex-col gap-3 text-on-panel-2">
          {perks.map((p) => (
            <li key={p} className="flex gap-3">
              <span className="text-gold" aria-hidden="true">✓</span>
              {p}
            </li>
          ))}
        </ul>
        <HangTag large idle number="0021" className="absolute right-12 top-10" />
      </aside>

      <div className="flex flex-col justify-center gap-8 lg:px-12 max-w-md w-full mx-auto">
        <div className="flex flex-col gap-3">
          <h1 className="font-display text-5xl sm:text-6xl leading-[1] tracking-tight">{title}</h1>
          <p className="text-fg-2 leading-relaxed">{intro}</p>
        </div>
        {children}
      </div>
    </div>
  );
}
