// pita teks yang berjalan pelan, berhenti saat di-hover
const lines = [
  ["New drops every Friday at 7 PM", false],
  ["Checked by hand, measured flat", true],
  ["Every piece has whereabouts", false],
  ["One of each, never restocked", true],
];

function Row({ hidden = false }) {
  return (
    <ul className="marquee__row" aria-hidden={hidden || undefined}>
      {lines.map(([text, italic]) => (
        <li key={text} className="flex items-center gap-8 shrink-0">
          <span className="size-1.5 rounded-full bg-gold" aria-hidden="true" />
          <span className={`font-display text-2xl sm:text-3xl whitespace-nowrap ${italic ? "italic text-fg-2" : ""}`}>{text}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Marquee() {
  return (
    <div className="marquee mt-6 border-y border-line py-6 overflow-hidden">
      <div className="marquee__track">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}
