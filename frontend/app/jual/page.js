import Breadcrumbs from "@/components/ui/Breadcrumbs";
import SellForm from "@/components/jual/SellForm";

export const metadata = {
  title: "Sell with us",
};

const steps = [
  ["Send the details", "A few photos, the size and what you would like for it. Takes about two minutes."],
  ["We take a look", "Within 3 working days you will hear whether it fits the rail. If it does, drop it off or ship it to us."],
  ["It goes up, then it goes", "We measure, photograph and list it on a Friday. When it sells, 80% of the price is yours."],
];

const accepted = [
  "Outerwear, tops, bottoms and dresses",
  "Condition 7/10 or better, washed and ready to wear",
  "Any brand, any decade, as long as it has some life left",
];

export default function SellPage() {
  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-14 flex flex-col gap-16">
      <div className="flex flex-col gap-5">
        <Breadcrumbs trail={[{ label: "Sell with us" }]} />
        <h1 className="font-display text-5xl sm:text-7xl leading-[1] tracking-tight max-w-4xl">
          Your closet has <span className="italic">whereabouts too.</span>
        </h1>
        <p className="text-lg text-fg-2 max-w-xl leading-relaxed">
          Some clothes are done with you before they are done for good. Send them on, and let someone else find out
          where they go next.
        </p>
      </div>

      <section aria-label="How selling works" className="grid gap-10 md:grid-cols-3">
        {steps.map(([title, text], i) => (
          <div key={title} className="flex flex-col gap-3 border-t border-line pt-6">
            <span className="text-sm text-fg-2">0{i + 1}</span>
            <h2 className="font-display text-2xl italic">{title}</h2>
            <p className="leading-relaxed text-fg-2">{text}</p>
          </div>
        ))}
      </section>

      <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
        <aside className="rounded-2xl bg-panel text-on-panel p-7 sm:p-9 flex flex-col gap-6 self-start">
          <h2 className="font-display text-3xl">What we take</h2>
          <ul className="flex flex-col gap-3 text-on-panel-2">
            {accepted.map((a) => (
              <li key={a} className="flex gap-3">
                <span className="text-gold" aria-hidden="true">✓</span>
                {a}
              </li>
            ))}
          </ul>
          <p className="text-sm text-on-panel-2 border-t border-on-panel/20 pt-5">
            Not a fit? We will tell you why, so it is never a guessing game.
          </p>
        </aside>

        <SellForm />
      </div>
    </div>
  );
}
