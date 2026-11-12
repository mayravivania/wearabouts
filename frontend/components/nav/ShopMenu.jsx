"use client";

import { useEffect, useRef, useState } from "react";
import ShopMenuContent from "./ShopMenuContent";

// panel absolute selebar header
export default function ShopMenu() {
  const [open, setOpen] = useState(false);
  const wrapper = useRef(null);
  const closeTimer = useRef(null);
  const hoveredAt = useRef(0);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const onClick = (e) => wrapper.current && !wrapper.current.contains(e.target) && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  // hover hanya untuk mouse, layar sentuh pakai klik
  const show = (e) => {
    if (e.pointerType !== "mouse") return;
    clearTimeout(closeTimer.current);
    if (!open) hoveredAt.current = Date.now();
    setOpen(true);
  };
  // jeda supaya menu tidak tertutup saat mouse pindah ke panel
  const hide = (e) => {
    if (e.pointerType !== "mouse") return;
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div ref={wrapper} onPointerEnter={show} onPointerLeave={hide}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="shop-menu"
        // klik tepat setelah hover jangan menutup menu
        onClick={() => setOpen((o) => (o && Date.now() - hoveredAt.current < 600 ? true : !o))}
        className="py-2 inline-flex items-center gap-1.5 hover:opacity-70"
      >
        Shop
        <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" className={`transition-transform ${open ? "rotate-180" : ""}`}>
          <path d="M1.5 3.5 5 7l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </button>

      <div
        id="shop-menu"
        hidden={!open}
        className="absolute left-0 right-0 top-full border-b border-line bg-bg shadow-[0_24px_40px_-24px_rgb(0_0_0/0.25)]"
      >
        <div className="max-w-[1240px] mx-auto px-8 py-10">
          <ShopMenuContent onPick={() => setOpen(false)} />
        </div>
      </div>
    </div>
  );
}
