"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { createItem, updateItem } from "@/lib/admin";
import { CATEGORIES, CONDITIONS, SIZES } from "@/lib/config";

const field = "w-full min-h-12 rounded-md border border-line bg-bg px-4 text-[15px] focus:border-fg focus:outline-none";
const labelCls = "text-sm text-fg-2";

// tambah barang (POST /items) atau ubah (PUT /items/:id). Multipart karena ada foto
export default function ItemForm({ item, onSaved, onCancel }) {
  const editing = Boolean(item);
  const [photos, setPhotos] = useState([]);
  const [state, setState] = useState({ sending: false, error: "" });

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

    // ukuran kosong tidak dikirim. Status hanya dikirim kalau diubah (backend menolak ubah status barang yang punya pesanan aktif)
    ["chest", "length"].forEach((key) => form.get(key) === "" && form.delete(key));
    if (editing && form.get("status") === item.status) form.delete("status");

    setState({ sending: true, error: "" });
    try {
      if (editing) await updateItem(item._id, form);
      else await createItem(form);
      onSaved();
    } catch (err) {
      setState({ sending: false, error: err.status === 401 ? "Your session ended. Sign in again." : err.message });
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2 rounded-2xl border border-line p-6">
      <h2 className="font-display text-2xl sm:col-span-2">{editing ? "Edit piece" : "Add a piece"}</h2>

      <label className="flex flex-col gap-2 sm:col-span-2">
        <span className={labelCls}>Name</span>
        <input name="name" required defaultValue={item?.name} placeholder="Corduroy work jacket" className={field} />
      </label>

      <label className="flex flex-col gap-2">
        <span className={labelCls}>Category</span>
        <select name="category" required defaultValue={item?.category ?? ""} className={field}>
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
        <span className={labelCls}>Size</span>
        <select name="size" required defaultValue={item?.size ?? ""} className={field}>
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
        <select name="condition" required defaultValue={item?.condition ?? ""} className={field}>
          <option value="" disabled>
            Pick one
          </option>
          {CONDITIONS.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-2">
        <span className={labelCls}>Price (IDR)</span>
        <input name="price" type="number" min="0" step="1000" required defaultValue={item?.price} placeholder="150000" className={field} />
      </label>

      <label className="flex flex-col gap-2">
        <span className={labelCls}>Chest (cm)</span>
        <input name="chest" type="number" min="1" step="0.5" defaultValue={item?.measurements?.chest} className={field} />
      </label>

      <label className="flex flex-col gap-2">
        <span className={labelCls}>Length (cm)</span>
        <input name="length" type="number" min="1" step="0.5" defaultValue={item?.measurements?.length} className={field} />
      </label>

      {editing && (
        <label className="flex flex-col gap-2">
          <span className={labelCls}>Status</span>
          <select name="status" defaultValue={item.status} className={field}>
            <option value="available">Available</option>
            <option value="sold">Sold</option>
          </select>
        </label>
      )}

      <label className="flex flex-col gap-2 sm:col-span-2">
        <span className={labelCls}>Description</span>
        <textarea name="description" rows={3} defaultValue={item?.description} className={`${field} py-3 min-h-28`} />
      </label>

      <div className="flex flex-col gap-3 sm:col-span-2">
        <span className={labelCls}>Photos, up to 5{editing ? ". Leave empty to keep the current ones." : "."}</span>
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

      <div className="sm:col-span-2 flex flex-wrap gap-3">
        <Button type="submit" disabled={state.sending} className="min-w-44">
          {state.sending ? "Saving..." : editing ? "Save changes" : "Add piece"}
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel} disabled={state.sending}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
