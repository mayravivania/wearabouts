import { api } from "./api";
import { USE_MOCK } from "./config";

// GET /wishlist: [{ item }] milik pembeli yang login. Mode contoh: kosong
export const getWishlist = async () => (USE_MOCK ? [] : api("/wishlist", { auth: true }));

// POST /wishlist. 409 = sudah tersimpan
export const addToWishlist = async (itemId) => {
  if (!USE_MOCK) await api("/wishlist", { method: "POST", body: { itemId }, auth: true });
};

export const removeFromWishlist = async (itemId) => {
  if (!USE_MOCK) await api(`/wishlist/${itemId}`, { method: "DELETE", auth: true });
};
