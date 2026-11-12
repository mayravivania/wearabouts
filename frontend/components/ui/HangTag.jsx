import { formatPrice } from "@/lib/format";

// posisi tag diatur parent lewat className
export default function HangTag({ price, size, number, large = false, idle = false, className = "" }) {
  return (
    <div className={`hang-tag ${large ? "hang-tag--lg" : ""} ${idle ? "hang-tag--idle" : ""} ${className}`}>
      <svg className="hang-tag__string" viewBox="0 0 40 46" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 46 C 2 28, 14 10, 34 0" fill="none" stroke="#cbbd8f" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M0 46 C 2 28, 14 10, 34 0" fill="none" stroke="#7a6a3a" strokeWidth="0.5" strokeDasharray="1.5 2" />
      </svg>

      <div className="hang-tag__body">
        <div className="hang-tag__inner">
          <span className={`font-display italic leading-none ${large ? "text-sm" : "text-[9px]"}`}>Wearabouts</span>

          {price !== undefined ? (
            <span className="flex flex-col items-center leading-none">
              <span className={`font-sans font-semibold tracking-[0.2em] ${large ? "text-[10px]" : "text-[7px]"}`}>IDR</span>
              <span className={`font-display font-bold tabular-nums ${large ? "text-[25px] mt-1" : "text-[14px] mt-0.5"}`}>
                {formatPrice(price)}
              </span>
            </span>
          ) : (
            <span className={`font-display italic leading-tight ${large ? "text-[22px]" : "text-xs"}`}>
              One
              <br />
              of one
            </span>
          )}

          <span className={`font-sans font-medium tracking-wider uppercase ${large ? "text-[10px]" : "text-[7px]"}`}>
            {size ? `Size ${size}` : ""}
            {size && number ? " · " : ""}
            {number ? `No. ${number}` : ""}
          </span>
        </div>
      </div>

      <span className="hang-tag__eyelet" aria-hidden="true" />
    </div>
  );
}
