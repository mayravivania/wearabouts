"use client";

import { useState } from "react";
import { CATEGORIES, SIZES, PRICE_CAPS } from "@/lib/config";
import { formatPrice } from "@/lib/format";

const pill = "min-h-11 px-4 rounded-full border text-[15px] transition-colors";

export default function FilterBar({ filters, onChange }) {
  const [search, setSearch] = useState(filters.q || "");

  const set = (key, value) => onChange({ ...filters, [key]: value });
  const pillClass = (active) =>
    `${pill} ${active ? "bg-fg text-bg border-fg" : "border-line hover:border-fg"}`;

  return (
    <div className="flex flex-col gap-5">
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          set("q", search.trim());
        }}
        className="max-w-md"
      >
        <label htmlFor="search" className="sr-only">
          Search pieces
        </label>
        <div className="flex items-center border-b border-fg">
          <input
            id="search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search flannel, denim, cargo..."
            className="flex-1 min-w-0 bg-transparent py-3 text-lg placeholder:text-fg-2/60 focus:outline-none"
          />
          <button type="submit" className="py-3 pl-4 text-[15px] hover:opacity-70">
            Search →
          </button>
        </div>
      </form>

      <div className="flex flex-wrap items-center gap-2.5">
        <button type="button" onClick={() => set("category", "")} aria-pressed={!filters.category} className={pillClass(!filters.category)}>
          Everything
        </button>
        {CATEGORIES.map((c) => {
          const active = filters.category === c.value;
          return (
            <button
              key={c.value}
              type="button"
              onClick={() => set("category", active ? "" : c.value)}
              aria-pressed={active}
              className={pillClass(active)}
            >
              {c.label}
            </button>
          );
        })}

        <div className="flex-1" />

        <label className="sr-only" htmlFor="size">
          Size
        </label>
        <select
          id="size"
          value={filters.size || ""}
          onChange={(e) => set("size", e.target.value)}
          className={`${pill} border-line bg-bg pr-3`}
        >
          <option value="">Any size</option>
          {SIZES.map((s) => (
            <option key={s} value={s}>
              Size {s}
            </option>
          ))}
        </select>

        <label className="sr-only" htmlFor="price">
          Price
        </label>
        <select
          id="price"
          value={filters.max || ""}
          onChange={(e) => set("max", e.target.value)}
          className={`${pill} border-line bg-bg pr-3`}
        >
          <option value="">Any price</option>
          {PRICE_CAPS.map((p) => (
            <option key={p} value={p}>
              Under IDR {formatPrice(p)}
            </option>
          ))}
        </select>

        {filters.status === "sold" ? (
          <button type="button" onClick={() => set("status", "")} className={pillClass(true)}>
            Sold only ×
          </button>
        ) : (
        <label className={`${pill} border-line inline-flex items-center gap-2.5 cursor-pointer`}>
          <input
            type="checkbox"
            checked={filters.status === "available"}
            onChange={(e) => set("status", e.target.checked ? "available" : "")}
            className="size-4 accent-[var(--fg)]"
          />
          Hide sold
        </label>
        )}
      </div>
    </div>
  );
}
