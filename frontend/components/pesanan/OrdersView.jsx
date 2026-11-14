"use client";

import { useState } from "react";
import Link from "next/link";
import ItemPhoto from "@/components/ItemPhoto";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import PaymentInstructions from "./PaymentInstructions";
import ReviewForm from "./ReviewForm";
import { useOrders } from "@/hooks/useOrders";
import { ORDER_STATUS } from "@/lib/orders";
import { formatDate } from "@/lib/date";
import { formatIDR } from "@/lib/format";

// keterangan singkat per status, sesuai halaman Help
const STATUS_NOTE = {
  paid: "We have your transfer. Your piece ships within 2 working days.",
  shipped: "Your piece is with the courier.",
  completed: "Delivered. Enjoy it.",
  cancelled: "This order was cancelled and the piece is back on the rail.",
};

export default function OrdersView() {
  const { orders, error, loading, reload } = useOrders();
  const [reviewing, setReviewing] = useState("");

  if (loading) return <p className="text-fg-2 py-16">Loading...</p>;
  if (error) return <p className="text-stamp py-16">{error}</p>;

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-start gap-5 py-10">
        <p className="text-lg text-fg-2">You have not bought anything yet.</p>
        <Button href="/katalog">Browse the shop</Button>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-6 max-w-3xl">
      {orders.map((order) => {
        const status = ORDER_STATUS[order.status] || { label: order.status, variant: "outline" };
        const item = order.item; // null kalau barangnya sudah dihapus admin
        const canReview = order.status === "completed" && !order.reviewed;

        return (
          <li key={order._id} className="flex flex-col gap-5 rounded-2xl border border-line p-5 sm:flex-row">
            {item && (
              <Link href={`/barang/${item._id}`} className="group w-28 shrink-0" aria-label={item.name}>
                <ItemPhoto item={item} sizes="112px" />
              </Link>
            )}

            <div className="flex flex-1 flex-col gap-3">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <p className="text-xs text-fg-2">
                    Order #{order._id.slice(-6).toUpperCase()} · {formatDate(order.createdAt)}
                  </p>
                  {item ? (
                    <Link href={`/barang/${item._id}`} className="font-display text-2xl hover:opacity-70">
                      {item.name}
                    </Link>
                  ) : (
                    <span className="font-display text-2xl text-fg-2">This piece is no longer listed</span>
                  )}
                </div>
                <Badge variant={status.variant}>{status.label}</Badge>
              </div>

              <p className="text-lg">{formatIDR(order.price)}</p>

              {order.status === "pending" && <PaymentInstructions order={order} />}
              {STATUS_NOTE[order.status] && <p className="text-sm text-fg-2">{STATUS_NOTE[order.status]}</p>}

              {order.shippingAddress && (
                <p className="text-sm text-fg-2">
                  Ship to {order.shippingAddress.name}, {order.shippingAddress.address} ({order.shippingAddress.phone})
                </p>
              )}

              {order.reviewed && <p className="text-sm text-fg-2">Thanks, your review is up.</p>}

              {canReview &&
                (reviewing === order._id ? (
                  <ReviewForm
                    orderId={order._id}
                    onCancel={() => setReviewing("")}
                    onDone={() => {
                      setReviewing("");
                      reload();
                    }}
                  />
                ) : (
                  <Button variant="secondary" className="self-start" onClick={() => setReviewing(order._id)}>
                    Leave a review
                  </Button>
                ))}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
