import { api } from "./api";

// POST /orders. 409 = barang sudah dibeli orang lain, 403 = bukan akun pembeli
export const checkout = (itemId, shippingAddress) =>
  api("/orders", { method: "POST", body: { itemId, shippingAddress }, auth: true });

// backend mewajibkan name, phone, address. Mengembalikan { namaField: "pesan" }, kosong berarti valid
export function checkShipping({ name, phone, address }) {
  const errors = {};
  const cleanName = (name ?? "").trim();
  const cleanPhone = (phone ?? "").trim();
  const cleanAddress = (address ?? "").trim();

  if (!cleanName) {
    errors.name = "Enter who should receive it.";
  } else if (
    cleanName.length < 2 ||
    cleanName.length > 100 ||
    !/^\p{L}[\p{L}\p{M}\s.'-]*$/u.test(cleanName) ||
    /(.)\1{3,}/u.test(cleanName)
  ) {
    errors.name = "Use a valid name, ex: Johan Liebert.";
  }

  if (!cleanPhone) {
    errors.phone = "Enter a phone number.";
  } else if (
    !/^08[1-9]\d{7,10}$/.test(cleanPhone) ||
    /(\d)\1{6,}/.test(cleanPhone)
  ) {
    errors.phone = "Enter a valid Indonesian mobile number starting with 08.";
  }

  const addressWords = cleanAddress.split(/\s+/);
  const hasMeaningfulWord = addressWords.some(
    (word) => word.replace(/[^\p{L}\p{M}]/gu, "").length >= 3
  );

  if (!cleanAddress) {
    errors.address = "Enter your address.";
  } else if (
    cleanAddress.length < 10 ||
    cleanAddress.length > 300 ||
    !/^[\p{L}\p{M}\d\s.,/#()'-]+$/u.test(cleanAddress) ||
    !hasMeaningfulWord ||
    /(.)\1{4,}/u.test(cleanAddress)
  ) {
    errors.address = "Enter a valid, complete Indonesian shipping address.";
  }

  return errors;
}
export const getMyOrders = () => api("/orders/me", { auth: true });
export const ORDER_STATUS = {
  pending: { label: "Pending", variant: "outline" },
  paid: { label: "Paid", variant: "gold" },
  shipped: { label: "Shipped", variant: "gold" },
  completed: { label: "Completed", variant: "solid" },
  cancelled: { label: "Cancelled", variant: "outline" },
};