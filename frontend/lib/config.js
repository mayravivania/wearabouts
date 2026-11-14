// alamat backend, atur di .env.local
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

// true = pakai data contoh, false = ambil dari backend
export const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true";

// harus sama dengan enum category di backend
export const CATEGORIES = [
  { value: "outerwear", label: "Outerwear" },
  { value: "tops", label: "Tops" },
  { value: "bottoms", label: "Bottoms" },
  { value: "dresses", label: "Dresses" },
];

export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export const PRICE_CAPS = [100000, 150000, 250000];

// grade kondisi, dipakai di detail barang, form jual, dan /bantuan
export const CONDITIONS = [
  { value: "10/10", label: "10/10 · New with tags", text: "Never worn. Original tags still attached." },
  { value: "9/10", label: "9/10 · Like new", text: "Worn a few times. No marks you would notice without looking for them." },
  { value: "8/10", label: "8/10 · Lived in", text: "Light fading or softening from washes. Any small mark is photographed." },
  { value: "7/10", label: "7/10 · Character", text: "Visible wear, a repaired seam or a stain that stays. Priced to match, shown up close." },
];

// isi menu Shop (desktop dan HP)
export const SHOP_MENU = {
  categories: [{ value: "", label: "All pieces" }, ...CATEGORIES],
  edits: [
    { href: "/katalog?status=available", label: "Still available" },
    { href: "/katalog?max=100000", label: "Under IDR 100,000" },
    { href: "/katalog?status=sold", label: "Recently found a home" },
  ],
};
