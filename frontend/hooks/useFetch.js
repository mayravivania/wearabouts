"use client";

import { useCallback, useEffect, useState } from "react";

// jalankan fetcher saat mount. fetcher harus stabil (fungsi modul atau useCallback). reload() mengambil ulang
export function useFetch(fetcher) {
  const [result, setResult] = useState({ data: null, error: "" });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;

    fetcher()
      .then((data) => {
        if (!cancelled) setResult({ data, error: "" });
      })
      .catch((err) => {
        if (!cancelled) setResult({ data: null, error: err.message });
      });

    return () => {
      cancelled = true;
    };
  }, [fetcher, tick]);

  const reload = useCallback(() => setTick((t) => t + 1), []);
  return { ...result, loading: result.data === null && !result.error, reload };
}
