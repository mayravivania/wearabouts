"use client";

import { useState } from "react";
import { useFetch } from "./useFetch";
import { getWishlist, removeFromWishlist } from "@/lib/wishlist";

// daftar barang di wishlist pembeli, dengan aksi hapus
export function useWishlist() {
  const { data, error, loading, reload } = useFetch(getWishlist);
  const [removing, setRemoving] = useState("");
  const [actionError, setActionError] = useState("");

  async function remove(itemId) {
    setRemoving(itemId);
    setActionError("");
    try {
      await removeFromWishlist(itemId);
      reload();
    } catch (err) {
      setActionError(err.message);
    } finally {
      setRemoving("");
    }
  }

  // item bisa null kalau barangnya sudah dihapus admin
  const items = (data || []).map((w) => w.item).filter(Boolean);
  return { items, error, loading, removing, actionError, remove };
}
