"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { USE_MOCK } from "@/lib/config";
import { useAuth } from "@/lib/auth";
import { checkout } from "@/lib/orders";

// logika Buy now: login, form terbuka, kirim pesanan, dan semua hasilnya. onSold dipanggil saat barang jadi terjual
export function useCheckout({ itemId, onSold }) {
  const { user } = useAuth();
  const router = useRouter();
  const [state, setState] = useState({ open: false, sending: false, error: "", done: false });

  // klik Buy now: belum login ke /masuk dulu, admin ditolak, pembeli membuka form
  function start() {
    if (!user) return router.push(`/masuk?next=${encodeURIComponent(`/barang/${itemId}`)}`);
    if (user.role === "admin") return setState((s) => ({ ...s, error: "Checkout is for shopper accounts only." }));
    setState((s) => ({ ...s, open: !s.open, error: "", done: false }));
  }

  function close() {
    setState((s) => ({ ...s, open: false }));
  }

  async function submit(shippingAddress) {
    setState((s) => ({ ...s, sending: true, error: "" }));
    try {
      if (USE_MOCK) await new Promise((r) => setTimeout(r, 600));
      else await checkout(itemId, shippingAddress);
      onSold();
      setState({ open: false, sending: false, error: "", done: true });
    } catch (err) {
      if (err.status === 409) {
        // keduluan pembeli lain
        onSold();
        setState({ open: false, sending: false, error: "Someone got there first. This piece was just bought by another shopper.", done: false });
        return;
      }
      const message =
        err.status === 401 ? "Your session ended. Sign in again to order." : err.status === 403 ? "Checkout is for shopper accounts only." : err.message;
      setState((s) => ({ ...s, sending: false, error: message }));
    }
  }

  return { user, ...state, start, close, submit };
}
