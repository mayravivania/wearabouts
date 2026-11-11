"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import FilterBar from "./FilterBar";
import ItemGrid from "@/components/ItemGrid";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { useItems } from "@/hooks/useItems";
import { CATEGORIES } from "@/lib/config";

// filter awal dari URL. key = URL supaya state reset saat pindah link menu
export default function KatalogView() {
  const searchParams = useSearchParams();
  const initial = {
    q: searchParams.get("q") || "",
    category: searchParams.get("category") || "",
    size: searchParams.get("size") || "",
    status: searchParams.get("status") || "",
    max: searchParams.get("max") || "",
  };
  return <Katalog key={searchParams.toString()} initial={initial} />;
}

function Katalog({ initial }) {
  const [filters, setFilters] = useState(initial);
  const { items, loading, error } = useItems(filters);

  const available = items.filter((i) => i.status === "available").length;
  const category = CATEGORIES.find((c) => c.value === filters.category);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        <Breadcrumbs
          trail={category ? [{ href: "/katalog", label: "Shop" }, { label: category.label }] : [{ label: "Shop" }]}
        />
        <h1 className="font-display text-5xl sm:text-7xl leading-[1] tracking-tight">
          {category ? category.label : "Every piece, once."}
        </h1>
        <p className="text-fg-2" aria-live="polite">
          {loading ? "Loading..." : `${items.length} pieces · ${available} still looking for a home`}
        </p>
      </div>

      <FilterBar filters={filters} onChange={setFilters} />

      <ItemGrid items={items} loading={loading} error={error} emptyText="Nothing matches. Try loosening the filters." />
    </div>
  );
}
