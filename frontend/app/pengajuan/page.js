import RequireAuth from "@/components/auth/RequireAuth";
import MyRequests from "@/components/jual/MyRequests";

export const metadata = {
  title: "Sell requests",
};

export default function SellRequestsPage() {
  return (
    <RequireAuth role="buyer">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-14 flex flex-col gap-10">
        <h1 className="font-display text-5xl sm:text-6xl leading-[1] tracking-tight">Your sell requests</h1>
        <MyRequests />
      </div>
    </RequireAuth>
  );
}
