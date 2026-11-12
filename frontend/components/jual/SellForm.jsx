"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { CATEGORIES, SIZES, CONDITIONS, USE_MOCK } from "@/lib/config";

const field = "w-full min-h-12 rounded-md border border-line bg-bg px-4 text-[15px] focus:border-fg focus:outline-none";
const labelCls = "text-sm text-fg-2";

// POST /consignments (multipart, butuh token buyer)
export default function SellForm() {
  const { user, ready } = useAuth();
  const signedIn = ready ? Boolean(user) : null;
  const [photos, setPhotos] = useState([]);
  const [state, setState] = useState({ sending: false, error: "", done: false });

  // bersihkan URL preview foto lama
  useEffect(() => () => photos.forEach((p) => URL.revokeObjectURL(p.url)), [photos]);

  function pickPhotos(e) {
    const files = Array.from(e.target.files || []).slice(0, 5);
    setPhotos(files.map((file) => ({ file, url: URL.createObjectURL(file) })));
  }

  async function submit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    form.delete("photos");
    photos.forEach((p) => form.append("photos", p.file));

    setState({ sending: true, error: "", done: false });
    try {
      if (USE_MOCK) await new Promise((r) => setTimeout(r, 600));
      else await api("/consignments", { method: "POST", body: form, auth: true });
      setState({ sending: false, error: "", done: true });
    } catch (err) {
      setState({ sending: false, error: err.status === 401 ? "Your session ended. Sign in again to send it." : err.message, done: false });
    }
  }

  if (signedIn === false) {
    return (
      <div className="rounded-2xl border border-line p-8 sm:p-10 flex flex-col items-start gap-4 self-start">
        <h2 className="font-display text-3xl">Sign in to send a piece</h2>
        <p className="text-fg-2 leading-relaxed">So we know who to reply to, and you can follow the review from your account.</p>
        <Button href="/masuk?next=/jual">Sign in</Button>
      </div>
    );
  }

  if (state.done) {
    return (
      <div className="rounded-2xl border border-line p-8 sm:p-10 flex flex-col items-start gap-4 self-start" role="status">
        <h2 className="font-display text-3xl">
          Got it. <span className="italic">Thank you.</span>
        </h2>
        <p className="text-fg-2 leading-relaxed">
          We will look at the photos and get back to you within 3 working days, through the contact you left.
        </p>
        <Button variant="secondary" onClick={() => setState({ sending: false, error: "", done: false })}>
          Send another piece
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
      <label className="flex flex-col gap-2 sm:col-span-2">
        <span className={labelCls}>What is it?</span>
        <input name="name" required placeholder="Corduroy work jacket" className={field} />
      </label>

      <label className="flex flex-col gap-2">
        <span className={labelCls}>Brand (optional)</span>
        <input name="brand" placeholder="Carhartt, Uniqlo, no label..." className={field} />
      </label>

      <label className="flex flex-col gap-2">
        <span className={labelCls}>Category</span>
        <select name="category" required defaultValue="" className={field}>
          <option value="" disabled>
            Pick one
          </option>
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-2">
        <span className={labelCls}>Size on the label</span>
        <select name="size" required defaultValue="" className={field}>
          <option value="" disabled>
            Pick one
          </option>
          {SIZES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-2">
        <span className={labelCls}>Condition</span>
        <select name="condition" required defaultValue="" className={field}>
          <option value="" disabled>
            Be honest
          </option>
          {CONDITIONS.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-2">
        <span className={labelCls}>What you would like for it (IDR)</span>
        <input name="askingPrice" type="number" min="10000" step="1000" required placeholder="150000" className={field} />
      </label>

      <label className="flex flex-col gap-2">
        <span className={labelCls}>WhatsApp or email</span>
        <input name="contact" required placeholder="So we can reply" className={field} />
      </label>

      <label className="flex flex-col gap-2 sm:col-span-2">
        <span className={labelCls}>Anything we should know?</span>
        <textarea
          name="description"
          rows={4}
          placeholder="Where you got it, how it fits, any marks or repairs"
          className={`${field} py-3 min-h-28`}
        />
      </label>

      <div className="flex flex-col gap-3 sm:col-span-2">
        <span className={labelCls}>Photos, up to 5. Front, back, label and any marks.</span>
        <label className="flex items-center justify-center min-h-24 rounded-md border border-dashed border-line hover:border-fg cursor-pointer text-[15px]">
          <input name="photos" type="file" accept="image/*" multiple onChange={pickPhotos} className="sr-only" />
          {photos.length ? `${photos.length} photo${photos.length > 1 ? "s" : ""} picked. Tap to change.` : "Tap to add photos"}
        </label>
        {photos.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {photos.map((p) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={p.url} src={p.url} alt="" className="size-20 rounded-md object-cover bg-photo" />
            ))}
          </div>
        )}
      </div>

      {state.error && (
        <p className="text-stamp sm:col-span-2" role="alert">
          {state.error}
        </p>
      )}

      <div className="sm:col-span-2 flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={state.sending} className="min-w-44">
          {state.sending ? "Sending..." : "Send for review"}
        </Button>
        <span className="text-sm text-fg-2">You keep 80% when it sells.</span>
      </div>
    </form>
  );
}
