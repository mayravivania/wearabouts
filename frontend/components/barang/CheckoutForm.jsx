"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { checkShipping } from "@/lib/orders";

const field = "w-full min-h-12 rounded-md border border-line bg-bg px-4 text-[15px] focus:border-fg focus:outline-none";
const labelCls = "text-sm text-fg-2";

// form alamat kirim. Validasi di sini, pengiriman ke backend dilakukan onSubmit (dari useCheckout)
export default function CheckoutForm({ defaultName = "", sending, onSubmit, onCancel }) {
  const [errors, setErrors] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const values = {
      name: data.get("name").trim(),
      phone: data.get("phone").trim(),
      address: data.get("address").trim(),
    };
    const found = checkShipping(values);
    setErrors(found);
    if (Object.keys(found).length === 0) onSubmit(values);
  }

  const err = (key) =>
    errors[key] && (
      <span className="text-sm text-stamp" role="alert">
        {errors[key]}
      </span>
    );

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full max-w-md rounded-2xl border border-line p-6 flex flex-col gap-5">
      <h2 className="font-display text-2xl">Where should it go?</h2>

      <label className="flex flex-col gap-2">
        <span className={labelCls}>Recipient name</span>
        <input name="name" defaultValue={defaultName} autoComplete="name" aria-invalid={Boolean(errors.name)} className={field} />
        {err("name")}
      </label>

      <label className="flex flex-col gap-2">
        <span className={labelCls}>Phone</span>
        <input name="phone" type="tel" inputMode="numeric" maxLength={13} autoComplete="tel" placeholder="081234567890" aria-invalid={Boolean(errors.phone)} className={field} />
        {err("phone")}
      </label>

      <label className="flex flex-col gap-2">
        <span className={labelCls}>Full address</span>
        <textarea name="address" rows={3} autoComplete="street-address" aria-invalid={Boolean(errors.address)} className={`${field} py-3 min-h-28`} />
        {err("address")}
      </label>

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={sending} className="min-w-44">
          {sending ? "Placing order..." : "Confirm order"}
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel} disabled={sending}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
