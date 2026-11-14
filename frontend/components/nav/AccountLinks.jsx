"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout, useAuth } from "@/lib/auth";

// link kanan navbar, berubah sesuai status login dan role
export default function AccountLinks() {
  const { user, ready } = useAuth();
  const router = useRouter();

  if (!ready) return <span className="py-2 opacity-0">Sign in</span>;

  if (!user) {
    return (
      <Link href="/masuk" className="py-2 hover:opacity-70">
        Sign in
      </Link>
    );
  }

  const signOut = () => {
    logout();
    router.push("/");
  };

  return (
    <>
      {user.role === "admin" ? (
        <Link href="/admin" className="py-2 hover:opacity-70">
          Admin
        </Link>
      ) : (
        <>
          <Link href="/incaran" className="py-2 hover:opacity-70">
            Wishlist
          </Link>
          <Link href="/pesanan" className="py-2 hover:opacity-70">
            Orders
          </Link>
        </>
      )}
      <span className="py-2 text-fg-2 hidden xl:inline">Hi, {user.name.split(" ")[0]}</span>
      <button type="button" onClick={signOut} className="py-2 hover:opacity-70">
        Sign out
      </button>
    </>
  );
}
