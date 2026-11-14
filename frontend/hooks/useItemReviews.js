"use client";

import { useCallback } from "react";
import { useFetch } from "./useFetch";
import { getItemReviews } from "@/lib/reviews";

// ulasan satu barang + rata-rata rating. summary = null selama masih dimuat
export function useItemReviews(itemId) {
  const load = useCallback(() => getItemReviews(itemId), [itemId]);
  const { data, error, loading } = useFetch(load);
  return { summary: data, error, loading };
}
