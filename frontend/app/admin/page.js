import RequireAuth from "@/components/auth/RequireAuth";
import AdminDashboard from "@/components/admin/AdminDashboard";

export const metadata = {
  title: "Admin",
};

export default function AdminPage() {
  return (
    <RequireAuth role="admin">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-14 flex flex-col gap-10">
        <h1 className="font-display text-5xl sm:text-6xl leading-[1] tracking-tight">Admin</h1>
        <AdminDashboard />
      </div>
    </RequireAuth>
  );
}
