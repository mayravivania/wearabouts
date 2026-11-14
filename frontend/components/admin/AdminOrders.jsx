"use client";

import { useState } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { useFetch } from "@/hooks/useFetch";
import { NEXT_STATUS, getAllOrders, updateOrderStatus } from "@/lib/admin";
import { ORDER_STATUS } from "@/lib/orders";
import { formatDate } from "@/lib/date";
import { formatIDR } from "@/lib/format";

export default function AdminOrders() {
  const { data: orders, error, loading, reload } = useFetch(getAllOrders);
  const [busy, setBusy] = useState("");
  const [actionError, setActionError] = useState("");

  async function change(order, status) {
    setBusy(order._id);
    setActionError("");
    try {
      await updateOrderStatus(order._id, status);
      reload();
    } catch (err) {
      setActionError(err.message);
    } finally {
      setBusy("");
    }
  }

  if (loading) return <p className="text-fg-2 py-16">Loading...</p>;
  if (error) return <p className="text-stamp py-16">{error}</p>;
  if (orders.length === 0) return <p className="text-fg-2">No orders yet.</p>;

  return (
    <div className="flex flex-col gap-4">
      {actionError && (
        <p className="text-stamp" role="alert">
          {actionError}
        </p>
      )}

      <ul className="flex flex-col gap-4 max-w-3xl">
        {orders.map((order) => {
          const status = ORDER_STATUS[order.status] || { label: order.status, variant: "outline" };
          return (
            <li key={order._id} className="flex flex-col gap-3 rounded-2xl border border-line p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <p className="text-xs text-fg-2">
                    Order #{order._id.slice(-6).toUpperCase()} · {formatDate(order.createdAt)}
                  </p>
                  <p className="font-display text-xl">{order.item?.name || "Deleted piece"}</p>
                  <p className="text-sm text-fg-2">
                    {formatIDR(order.price)} · {order.buyer?.name} ({order.buyer?.email})
                  </p>
                </div>
                <Badge variant={status.variant}>{status.label}</Badge>
              </div>

              {order.shippingAddress && (
                <p className="text-sm text-fg-2">
                  Ship to {order.shippingAddress.name}, {order.shippingAddress.address} ({order.shippingAddress.phone})
                </p>
              )}

              {NEXT_STATUS[order.status]?.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {NEXT_STATUS[order.status].map((next) => (
                    <Button
                      key={next}
                      variant={next === "cancelled" ? "ghost" : "secondary"}
                      className={`min-h-11 ${next === "cancelled" ? "text-stamp" : ""}`}
                      disabled={busy === order._id}
                      onClick={() => change(order, next)}
                    >
                      {next === "cancelled" ? "Cancel order" : `Mark as ${ORDER_STATUS[next].label.toLowerCase()}`}
                    </Button>
                  ))}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
