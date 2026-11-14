"use client";

import Button from "@/components/ui/Button";
import ItemCard from "@/components/ItemCard";
import { useWishlist } from "@/hooks/useWishlist";

export default function WishlistView() {
  const { items, error, loading, removing, actionError, remove } = useWishlist();

  if (loading) return <p className="text-fg-2 py-16">Loading...</p>;
  if (error) return <p className="text-stamp py-16">{error}</p>;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-start gap-5 py-10">
        <p className="text-lg text-fg-2">Nothing saved yet. Tap Save to wishlist on a piece you like.</p>
        <Button href="/katalog">Browse the shop</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {actionError && (
        <p className="text-stamp" role="alert">
          {actionError}
        </p>
      )}
      <ul className="grid gap-x-6 gap-y-10 grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <li key={item._id} className="flex flex-col gap-2">
            <ItemCard item={item} />
            <Button variant="ghost" className="self-start" disabled={removing === item._id} onClick={() => remove(item._id)}>
              {removing === item._id ? "Removing..." : "Remove"}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
