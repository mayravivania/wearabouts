import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { CONDITIONS } from "@/lib/config";

export const metadata = {
  title: "Help",
};

const sizeChart = [
  ["XS", "44 to 47", "62 to 65"],
  ["S", "48 to 51", "66 to 68"],
  ["M", "52 to 55", "69 to 71"],
  ["L", "56 to 59", "72 to 74"],
  ["XL", "60 to 63", "75 to 77"],
  ["XXL", "64 and up", "78 and up"],
];

const sections = [
  { id: "size", title: "Size guide" },
  { id: "condition", title: "Condition grades" },
  { id: "payment", title: "Payment" },
  { id: "shipping", title: "Shipping" },
  { id: "returns", title: "Returns" },
  { id: "contact", title: "Contact" },
  { id: "terms", title: "Terms" },
  { id: "privacy", title: "Privacy" },
];

function Section({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-line pt-8 flex flex-col gap-4">
      <h2 className="font-display text-3xl tracking-tight">{title}</h2>
      <div className="flex flex-col gap-4 text-fg-2 leading-relaxed max-w-2xl">{children}</div>
    </section>
  );
}

export default function HelpPage() {
  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-14 flex flex-col gap-12">
      <div className="flex flex-col gap-5">
        <Breadcrumbs trail={[{ label: "Help" }]} />
        <h1 className="font-display text-5xl sm:text-7xl leading-[1] tracking-tight">
          Good to <span className="italic">know.</span>
        </h1>
      </div>

      <div className="grid gap-12 lg:grid-cols-[220px_1fr]">
        <nav aria-label="On this page" className="lg:sticky lg:top-28 self-start flex flex-wrap lg:flex-col gap-x-5 gap-y-2 text-[15px]">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="text-fg-2 hover:text-fg">
              {s.title}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-14">
          <Section id="size" title="Size guide">
            <p>
              Labels lie, especially on clothes made in different decades. So every piece is laid flat and measured by
              hand. Chest is measured armpit to armpit, length from the highest point of the shoulder to the hem.
            </p>
            <p>
              The easiest check: lay a top you already love flat, measure it the same way, and compare. Within 2 cm
              usually fits the same.
            </p>
            <table className="w-full max-w-md text-left text-[15px] border-collapse">
              <thead>
                <tr className="text-fg border-b border-line">
                  <th className="py-2 font-medium">Size</th>
                  <th className="py-2 font-medium">Chest (cm)</th>
                  <th className="py-2 font-medium">Length (cm)</th>
                </tr>
              </thead>
              <tbody>
                {sizeChart.map(([size, chest, length]) => (
                  <tr key={size} className="border-b border-line">
                    <td className="py-2 text-fg">{size}</td>
                    <td className="py-2 tabular-nums">{chest}</td>
                    <td className="py-2 tabular-nums">{length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-sm">A rough guide for tops and outerwear. The measurements on each listing always win.</p>
          </Section>

          <Section id="condition" title="Condition grades">
            <p>Every piece gets a score out of 10. Anything below 7 doesn&rsquo;t make it onto the rail.</p>
            <dl className="flex flex-col gap-4">
              {CONDITIONS.map((c) => (
                <div key={c.value} className="grid sm:grid-cols-[180px_1fr] gap-1 sm:gap-6">
                  <dt className="text-fg font-medium">{c.label}</dt>
                  <dd>{c.text}</dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section id="payment" title="Payment">
            <p>
              Pay by bank transfer after checkout. Once the transfer is confirmed, your order moves from pending to
              paid. Unpaid orders are cancelled after 24 hours and the piece goes back on the rail.
            </p>
          </Section>

          <Section id="shipping" title="Shipping">
            <p>
              Orders ship within 2 working days of payment, anywhere in Indonesia. You will see the tracking number on
              your orders page as soon as the parcel is handed to the courier.
            </p>
          </Section>

          <Section id="returns" title="Returns">
            <p>
              Because every piece is described, measured and photographed in full, returns for fit or change of mind
              aren&rsquo;t accepted. If what arrives doesn&rsquo;t match the listing, message us within 48 hours of
              delivery with an unboxing video and we will make it right.
            </p>
          </Section>

          <Section id="contact" title="Contact">
            <p>
              Email <span className="text-fg">hello@wearabouts.id</span>. Replies within a working day, Monday to
              Saturday, 10 AM to 6 PM WIB.
            </p>
          </Section>

          <Section id="terms" title="Terms">
            <p>
              Buying a piece means paying for it within 24 hours of checkout. Prices are in Indonesian Rupiah and
              already include shipping within Indonesia.
            </p>
          </Section>

          <Section id="privacy" title="Privacy">
            <p>
              Your name, phone number and address are used only to deliver your order. They are never sold or shared
              beyond the courier.
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
}
