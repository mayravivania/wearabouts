"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { createReview } from "@/lib/reviews";

const field = "w-full min-h-12 rounded-md border border-line bg-bg px-4 text-[15px] focus:border-fg focus:outline-none";
const labelCls = "text-sm text-fg-2";

// POST /reviews untuk satu pesanan completed. onDone dipanggil saat berhasil atau sudah pernah diulas (409)
export default function ReviewForm({ orderId, onDone, onCancel }) {
  const [rating, setRating] = useState(0);
  const [state, setState] = useState({ sending: false, error: "" });

  async function submit(e) {
    e.preventDefault();
    const comment = new FormData(e.currentTarget).get("comment").trim();

    if (!rating) return setState({ sending: false, error: "Pick a rating from 1 to 5." });

    setState({ sending: true, error: "" });
    try {
      await createReview({ orderId, rating, comment });
      onDone();
    } catch (err) {
      if (err.status === 409) return onDone();
      setState({ sending: false, error: err.status === 401 ? "Your session ended. Sign in again." : err.message });
    }
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-4 border-t border-line pt-5 max-w-md">
      <div className="flex flex-col gap-2">
        <span className={labelCls}>How was it?</span>
        <div className="flex gap-1" role="radiogroup" aria-label="Rating">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={rating === n}
              aria-label={`${n} out of 5`}
              onClick={() => setRating(n)}
              className={`size-11 rounded-md border text-lg transition-colors ${n <= rating ? "bg-gold text-on-gold border-gold" : "border-line hover:border-fg"}`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <label className="flex flex-col gap-2">
        <span className={labelCls}>Tell others about the fit and condition (optional)</span>
        <textarea name="comment" rows={3} maxLength={500} className={`${field} py-3 min-h-28`} />
      </label>

      {state.error && (
        <p className="text-stamp" role="alert">
          {state.error}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={state.sending} className="min-w-44">
          {state.sending ? "Sending..." : "Send review"}
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel} disabled={state.sending}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
