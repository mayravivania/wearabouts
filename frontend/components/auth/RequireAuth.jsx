"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { useAuth } from "@/lib/auth";

// bungkus halaman yang butuh login, misal <RequireAuth role="buyer">...</RequireAuth>
// belum login: diarahkan ke /masuk lalu kembali ke halaman ini setelah login
export default function RequireAuth(props) {
  return (
    <Suspense>
      <Guard {...props} />
    </Suspense>
  );
}

function Guard({ role, children }) {
  const { user, ready } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (ready && !user) router.replace(`/masuk?next=${encodeURIComponent(pathname)}`);
  }, [ready, user, router, pathname]);

  if (!ready || !user) return <p className="max-w-[1240px] mx-auto px-4 sm:px-8 py-24 text-fg-2">Loading...</p>;

  if (role && user.role !== role) {
    return (
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-24 flex flex-col items-start gap-5">
        <h1 className="font-display text-4xl">This page isn&rsquo;t for your account.</h1>
        <Button href="/">Back to home</Button>
      </div>
    );
  }

  return children;
}
