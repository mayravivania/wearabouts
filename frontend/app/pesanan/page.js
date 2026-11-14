import RequireAuth from "@/components/auth/RequireAuth";
import OrdersView from "@/components/pesanan/OrdersView";

export const metadata = {
  title: "Orders",
};

export default function OrdersPage() {
  return (
    <RequireAuth role="buyer">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-14 flex flex-col gap-10">
        <h1 className="font-display text-5xl sm:text-6xl leading-[1] tracking-tight">Your orders</h1>
        <OrdersView />
      </div>
    </RequireAuth>
  );
}
