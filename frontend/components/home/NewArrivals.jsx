"use client";

import { useEffect } from "react";
import ItemCard from "@/components/ItemCard";
import { useItems } from "@/hooks/useItems";
import { useRail, ArrowButton } from "./useRail";

export default function NewArrivals() {
  const { items, loading, error } = useItems({ status: "available" });
  const { ref, edges, go, measure } = useRail();
  const shown = items.slice(0, 10);

  // hitung ulang status panah setelah data masuk
  useEffect(() => {
    measure();
  }, [loading, measure]);

  if (error) return <p className="text-stamp py-16">{error}</p>;

  return (
    <div className="flex flex-col gap-6">
      <div
        ref={ref}
        className="no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 flex gap-4 md:gap-7 overflow-x-auto snap-x snap-mandatory scroll-px-4 sm:scroll-px-0"
      >
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="shrink-0 w-[62vw] sm:w-[260px] flex flex-col gap-3.5 animate-pulse">
                <div className="aspect-[4/5] rounded-lg bg-photo" />
                <div className="h-5 w-3/4 rounded bg-photo" />
              </div>
            ))
          : shown.map((item) => (
              <div key={item._id} className="snap-start shrink-0 w-[62vw] sm:w-[260px]">
                <ItemCard item={item} />
              </div>
            ))}
      </div>
      <div className="hidden sm:flex gap-2 self-end">
        <ArrowButton dir={-1} label="Scroll back" disabled={edges.start} onClick={() => go(-1)} />
        <ArrowButton dir={1} label="Scroll forward" disabled={edges.end} onClick={() => go(1)} />
      </div>
    </div>
  );
}
