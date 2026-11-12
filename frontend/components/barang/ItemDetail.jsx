"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import ItemPhoto from "@/components/ItemPhoto";
import HangTag from "@/components/ui/HangTag";
import SoldStamp from "@/components/ui/SoldStamp";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { CATEGORIES, CONDITIONS } from "@/lib/config";
import { getItem } from "@/lib/items";
import { formatIDR, tagNumber } from "@/lib/format";

export default function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getItem(id)
      .then(setItem)
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) return <p className="text-stamp py-16">{error}</p>;
  if (!item) return <p className="text-fg-2 py-16">Loading...</p>;

  const sold = item.status === "sold";
  const category = CATEGORIES.find((c) => c.value === item.category);
  const grade = CONDITIONS.find((c) => c.value === item.condition);
  const specs = [
    ["Size", item.size],
    ["Condition", item.condition],
    ["Chest", item.measurements?.chest && `${item.measurements.chest} cm`],
    ["Length", item.measurements?.length && `${item.measurements.length} cm`],
    ["Category", item.category.charAt(0).toUpperCase() + item.category.slice(1)],
  ].filter(([, value]) => value);

  return (
    <div className="flex flex-col gap-8">
      <Breadcrumbs
        trail={[
          { href: "/katalog", label: "Shop" },
          ...(category ? [{ href: `/katalog?category=${category.value}`, label: category.label }] : []),
          { label: item.name },
        ]}
      />

      <div className="grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:gap-16">
        <ItemPhoto item={item} faded={sold} sizes="(max-width: 768px) 100vw, 55vw" preload>
          {sold && (
            <div className="absolute inset-0 flex items-center justify-center">
              <SoldStamp large />
            </div>
          )}
        </ItemPhoto>

        <div className="relative flex flex-col gap-7 md:pt-4">
          {!sold && (
            <HangTag
              large
              idle
              price={item.price}
              size={item.size}
              number={tagNumber(item)}
              className="hidden lg:block absolute -top-2 right-0"
            />
          )}

          <div className="flex gap-2">
            <Badge variant="gold">One of one</Badge>
            {sold && <Badge variant="outline">Sold</Badge>}
          </div>

          <h1 className="font-display text-4xl sm:text-5xl leading-[1.08] tracking-tight lg:pr-44">{item.name}</h1>

          <p className={`text-2xl ${sold ? "text-fg-2 line-through decoration-1" : ""}`}>{formatIDR(item.price)}</p>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-y border-line py-6 lg:max-w-md">
            {specs.map(([label, value]) => (
              <div key={label} className="flex flex-col gap-0.5">
                <dt className="text-xs text-fg-2">{label}</dt>
                <dd className="text-lg">{value}</dd>
              </div>
            ))}
          </dl>

          {item.description && <p className="text-lg leading-relaxed text-fg-2 max-w-md">{item.description}</p>}

          {grade && (
            <p className="text-sm text-fg-2 max-w-md border-l-2 border-gold pl-4">
              <span className="text-fg">{grade.label}.</span> {grade.text}{" "}
              <Link href="/bantuan#condition" className="underline underline-offset-4 hover:text-fg">
                How we grade
              </Link>
            </p>
          )}

          <div className="flex flex-wrap gap-3">
            {/* TODO (Alya): POST /orders, kalau 409 tampilkan pesan keduluan */}
            <Button disabled={sold} className="min-w-44">
              {sold ? "Already found a home" : "Buy now"}
            </Button>
            {/* TODO (Alya): POST /wishlist */}
            <Button variant="secondary" disabled={sold}>
              Save to wishlist
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
