"use client";

import { useState } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ItemForm from "./ItemForm";
import { useFetch } from "@/hooks/useFetch";
import { deleteItem } from "@/lib/admin";
import { getItems } from "@/lib/items";
import { formatIDR } from "@/lib/format";

const loadItems = () => getItems();

export default function AdminItems() {
  const { data: items, error, loading, reload } = useFetch(loadItems);
  const [form, setForm] = useState(null); // null = tertutup, "new" = tambah, item = ubah
  const [message, setMessage] = useState({ type: "", text: "" });

  async function remove(item) {
    if (!window.confirm(`Delete "${item.name}"? This cannot be undone.`)) return;
    setMessage({ type: "", text: "" });
    try {
      await deleteItem(item._id);
      setMessage({ type: "ok", text: `${item.name} was deleted.` });
      reload();
    } catch (err) {
      // 409 kalau barang sudah punya pesanan
      setMessage({ type: "error", text: err.message });
    }
  }

  function saved() {
    setForm(null);
    setMessage({ type: "ok", text: "Saved." });
    reload();
  }

  if (loading) return <p className="text-fg-2 py-16">Loading...</p>;
  if (error) return <p className="text-stamp py-16">{error}</p>;

  return (
    <div className="flex flex-col gap-6">
      {message.text && (
        <p className={message.type === "error" ? "text-stamp" : "text-fg-2"} role={message.type === "error" ? "alert" : "status"}>
          {message.text}
        </p>
      )}

      {form ? (
        <ItemForm item={form === "new" ? null : form} onSaved={saved} onCancel={() => setForm(null)} />
      ) : (
        <Button className="self-start min-w-44" onClick={() => setForm("new")}>
          Add a piece
        </Button>
      )}

      {items.length === 0 ? (
        <p className="text-fg-2">No pieces yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[15px]">
            <thead className="text-sm text-fg-2">
              <tr className="border-b border-line">
                <th className="py-3 pr-4 font-normal">Piece</th>
                <th className="py-3 pr-4 font-normal">Size</th>
                <th className="py-3 pr-4 font-normal">Price</th>
                <th className="py-3 pr-4 font-normal">Status</th>
                <th className="py-3 font-normal">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id} className="border-b border-line">
                  <td className="py-3 pr-4">{item.name}</td>
                  <td className="py-3 pr-4">{item.size}</td>
                  <td className="py-3 pr-4">{formatIDR(item.price)}</td>
                  <td className="py-3 pr-4">
                    <Badge variant={item.status === "sold" ? "outline" : "gold"}>{item.status === "sold" ? "Sold" : "Available"}</Badge>
                  </td>
                  <td className="py-3">
                    <div className="flex justify-end gap-3">
                      <Button variant="ghost" className="min-h-11" onClick={() => setForm(item)}>
                        Edit
                      </Button>
                      <Button variant="ghost" className="min-h-11 text-stamp" onClick={() => remove(item)}>
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
