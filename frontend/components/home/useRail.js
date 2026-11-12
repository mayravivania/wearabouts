"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// logika carousel scroll-snap (hero dan rail barang baru)
export function useRail() {
  const ref = useRef(null);
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [edges, setEdges] = useState({ start: true, end: false });

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const slides = el.children;
    setCount(slides.length);
    const slideW = slides[0]?.getBoundingClientRect().width || 1;
    const gap = slides[1] ? slides[1].offsetLeft - slides[0].offsetLeft - slideW : 0;
    setIndex(Math.round(el.scrollLeft / (slideW + gap)));
    setEdges({ start: el.scrollLeft < 4, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 4 });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      el.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const goTo = useCallback((i) => {
    const el = ref.current;
    const slide = el?.children[i];
    if (slide) el.scrollTo({ left: slide.offsetLeft - el.children[0].offsetLeft, behavior: "smooth" });
  }, []);

  const go = useCallback(
    (step) => {
      const el = ref.current;
      if (!el) return;
      const slideW = el.children[0]?.getBoundingClientRect().width || el.clientWidth;
      const perView = Math.max(1, Math.floor(el.clientWidth / slideW));
      el.scrollBy({ left: step * perView * slideW, behavior: "smooth" });
    },
    []
  );

  return { ref, index, count, edges, go, goTo, measure };
}

export function ArrowButton({ dir, disabled, onClick, label, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`size-11 inline-flex items-center justify-center rounded-full border border-current/30 hover:border-current disabled:opacity-30 disabled:hover:border-current/30 ${className}`}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className={dir < 0 ? "rotate-180" : ""}>
        <path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    </button>
  );
}
