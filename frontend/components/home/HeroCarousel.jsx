"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import HangTag from "@/components/ui/HangTag";
import SoldStamp from "@/components/ui/SoldStamp";
import { useRail, ArrowButton } from "./useRail";

const AUTOPLAY_MS = 7000;

const slides = [
  {
    theme: "bg-panel text-on-panel",
    eyebrow: "Secondhand, one of each",
    title: (
      <>
        Every piece
        <br />
        has <span className="italic">whereabouts.</span>
      </>
    ),
    text: "Where it has been is part of what it is. Where it goes next is up to you.",
    cta: { href: "/katalog", label: "Shop the collection", variant: "onPanel" },
    art: <HangTag large idle number="0001" />,
  },
  {
    theme: "bg-gold text-on-gold",
    eyebrow: "New this week",
    title: (
      <>
        Fresh off
        <br />
        <span className="italic">the rail.</span>
      </>
    ),
    text: "New pieces go up every Friday at 7 PM. Each one exists once, so the early ones get first pick.",
    cta: { href: "/katalog?status=available", label: "See what just landed", variant: "onGold" },
    art: (
      <div className="flex flex-col items-end leading-none">
        <span className="text-sm tracking-[0.3em] uppercase">Every Friday</span>
        <span className="font-display text-[clamp(84px,11vw,150px)] tabular-nums tracking-tight">19:00</span>
        <span className="text-sm">WIB</span>
      </div>
    ),
  },
  {
    theme: "bg-deep text-on-deep border border-on-deep/10",
    eyebrow: "The outerwear edit",
    title: (
      <>
        Layers for
        <br />
        <span className="italic">the rainy season.</span>
      </>
    ),
    text: "Windbreakers, denim and work jackets, measured flat so you know how each one will sit on you.",
    cta: { href: "/katalog?category=outerwear", label: "Shop outerwear", variant: "onDeep" },
    art: <MeasuredJacket />,
  },
  {
    theme: "bg-surface text-fg border border-line",
    eyebrow: "Sell with us",
    title: (
      <>
        Your closet has
        <br />
        <span className="italic">whereabouts too.</span>
      </>
    ),
    text: "Send us what you no longer wear. We check it, measure it, photograph it and list it. You get 80% when it sells.",
    cta: { href: "/jual", label: "Send us a piece", variant: "primary" },
    art: <SoldStamp large />,
  },
];

export default function HeroCarousel() {
  const { ref, index, count, go, goTo } = useRail();
  const [paused, setPaused] = useState(false);

  // autoplay, berhenti saat hover/fokus atau reduced motion
  useEffect(() => {
    if (paused || count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => goTo((index + 1) % count), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [index, count, paused, goTo]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured"
      className="relative mt-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
    >
      <div ref={ref} className="no-scrollbar flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth">
        {slides.map((s, i) => {
          const Heading = i === 0 ? "h1" : "h2";
          return (
          <div
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
            className={`${s.theme} snap-start shrink-0 w-full rounded-2xl px-6 sm:px-14 pt-12 pb-28 sm:pb-24 min-h-[540px] grid gap-10 lg:grid-cols-[1fr_auto] items-center overflow-hidden`}
          >
            <div className="flex flex-col items-start gap-7">
              <span className="text-sm opacity-75">{s.eyebrow}</span>
              <Heading className="font-display text-[clamp(44px,7vw,96px)] leading-[0.98] tracking-tight">{s.title}</Heading>
              <p className="max-w-md leading-relaxed opacity-80">{s.text}</p>
              <Button href={s.cta.href} variant={s.cta.variant} tabIndex={i === index ? 0 : -1}>
                {s.cta.label}
              </Button>
            </div>
            <div className="hidden lg:flex justify-center pr-6" aria-hidden="true">
              {s.art}
            </div>
          </div>
          );
        })}
      </div>

      <div className={`absolute left-6 right-6 sm:left-14 sm:right-14 bottom-7 flex items-center justify-between gap-6 ${slides[index]?.theme.split(" ")[1] || ""}`}>
        <div className="flex items-center gap-4">
          <span className="text-sm tabular-nums">
            {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
          <div className="flex gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                className="h-11 flex items-center"
              >
                <span className={`block h-[3px] rounded-full bg-current transition-all duration-500 ${i === index ? "w-10" : "w-4 opacity-35"}`} />
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <ArrowButton dir={-1} label="Previous slide" disabled={index === 0} onClick={() => go(-1)} />
          <ArrowButton dir={1} label="Next slide" disabled={index === slides.length - 1} onClick={() => go(1)} />
        </div>
      </div>
    </section>
  );
}

function MeasuredJacket() {
  return (
    <svg width="300" height="300" viewBox="0 0 300 300" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M112 40 L150 62 L188 40 L238 62 L276 170 L248 182 L222 120 L222 262 L78 262 L78 120 L52 182 L24 170 L62 62 Z" strokeLinejoin="round" />
      <path d="M150 62 L150 262" strokeDasharray="0" opacity="0.5" />
      <path d="M112 40 Q150 78 188 40" opacity="0.5" />
      <g opacity="0.85" strokeDasharray="4 4">
        <path d="M84 132 H216" />
        <path d="M96 52 V256" />
      </g>
      <g fill="currentColor" stroke="none" fontSize="13" fontFamily="var(--font-inter-tight)">
        <text x="150" y="124" textAnchor="middle">Chest 58</text>
        <text x="118" y="200" transform="rotate(-90 118 200)">Length 66</text>
      </g>
    </svg>
  );
}
