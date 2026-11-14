"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { addToWishlist, getWishlist, removeFromWishlist } from "@/lib/wishlist";

// logika tombol Save to wishlist di halaman detail
export function useSaveItem(itemId) {
  const { user } = useAuth();
  const router = useRouter();
  const isBuyer = user?.role === "buyer";
  const [state, setState] = useState({ saved: false, busy: false, error: "" });

  // cek apakah barang ini sudah ada di wishlist
  useEffect(() => {
    if (!isBuyer) return;
    let cancelled = false;

    getWishlist()
      .then((list) => {
        if (!cancelled) setState((s) => ({ ...s, saved: list.some((w) => w.item?._id === itemId) }));
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [isBuyer, itemId]);

  async function toggle() {
    if (!user) return router.push(`/masuk?next=${encodeURIComponent(`/barang/${itemId}`)}`);
    if (!isBuyer) return setState((s) => ({ ...s, error: "Wishlist is for shopper accounts only." }));

    setState((s) => ({ ...s, busy: true, error: "" }));
    try {
      if (state.saved) await removeFromWishlist(itemId);
      else await addToWishlist(itemId);
      setState({ saved: !state.saved, busy: false, error: "" });
    } catch (err) {
      // 409 = sudah tersimpan sebelumnya
      if (err.status === 409) setState({ saved: true, busy: false, error: "" });
      else setState((s) => ({ ...s, busy: false, error: err.status === 401 ? "Your session ended. Sign in again." : err.message }));
    }
  }

  return { saved: isBuyer && state.saved, busy: state.busy, error: state.error, toggle };
}
