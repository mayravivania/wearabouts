import { API_URL } from "./config";

// 85000 -> "85,000"
export function formatPrice(value) {
  return Number(value || 0).toLocaleString("en-US");
}

// 85000 -> "IDR 85,000"
export function formatIDR(value) {
  return `IDR ${formatPrice(value)}`;
}

// foto bisa path lokal (uploads/...) atau URL Cloudinary
export function photoUrl(path) {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  const origin = API_URL.replace(/\/api\/?$/, "");
  return `${origin}/${path.replace(/^\//, "")}`;
}

// "M · 9/10 · Chest 54 · Length 72"
export function itemMeta(item) {
  const parts = [item.size, item.condition];
  if (item.measurements?.chest) parts.push(`Chest ${item.measurements.chest}`);
  if (item.measurements?.length) parts.push(`Length ${item.measurements.length}`);
  return parts.filter(Boolean).join(" · ");
}

// nomor di hang tag dari id, misal "0142"
export function tagNumber(item) {
  const digits = String(item._id).replace(/\D/g, "");
  return (digits.slice(-4) || "0001").padStart(4, "0");
}
