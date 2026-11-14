import RequireAuth from "@/components/auth/RequireAuth";
import WishlistView from "@/components/incaran/WishlistView";

export const metadata = {
  title: "Wishlist",
};

export default function WishlistPage() {
  return (
    <RequireAuth role="buyer">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-14 flex flex-col gap-10">
        <h1 className="font-display text-5xl sm:text-6xl leading-[1] tracking-tight">Your wishlist</h1>
        <WishlistView />
      </div>
    </RequireAuth>
  );
}
