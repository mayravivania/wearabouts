"use client";

import { useEffect, useState } from "react";
import { getItems } from "@/lib/items";

// hasil disimpan bersama key filter, loading = key belum sama dengan filter sekarang
export function useItems(filters = {}) {
  const key = JSON.stringify(filters);
  const [result, setResult] = useState({ key: null, items: [], error: "" });

  useEffect(() => {
    let cancelled = false;

    getItems(JSON.parse(key))
      .then((items) => {
        if (!cancelled) setResult({ key, items, error: "" });
      })
      .catch((err) => {
        if (!cancelled) setResult({ key, items: [], error: err.message });
      });

    return () => {
      cancelled = true;
    };
  }, [key]);

  const loading = result.key !== key;
  return { items: loading ? [] : result.items, loading, error: loading ? "" : result.error };
}
