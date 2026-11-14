"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ShopMenuContent from "./ShopMenuContent";
import { logout, useAuth } from "@/lib/auth";

const links = [
  { href: "/jual", label: "Sell with us" },
  { href: "/#story", label: "Our story" },
  { href: "/bantuan", label: "Help" },
];

function accountLinks(user) {
  if (!user) return [{ href: "/masuk", label: "Sign in" }, { href: "/daftar", label: "Create an account" }];
  if (user.role === "admin") return [{ href: "/admin", label: "Admin" }];
  return [
    { href: "/incaran", label: "Wishlist" },
    { href: "/pesanan", label: "Orders" },
  ];
}

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!open) return;
    // kunci scroll halaman selama menu terbuka
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((o) => !o)}
        className="size-11 inline-flex items-center justify-center rounded-full border border-line"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
          {open ? (
            <path d="M3 3l12 12M15 3 3 15" stroke="currentColor" strokeWidth="1.5" />
          ) : (
            <path d="M2 5h14M2 9h14M2 13h14" stroke="currentColor" strokeWidth="1.5" />
          )}
        </svg>
      </button>

      <div id="mobile-menu" hidden={!open} className="fixed inset-x-0 top-[var(--header-h)] bottom-0 z-40 overflow-y-auto bg-bg">
        <div className="px-4 sm:px-8 py-8 flex flex-col gap-10">
          <ShopMenuContent onPick={close} compact />
          <div className="flex flex-col border-t border-line pt-6">
            {[...links, ...accountLinks(user)].map((l) => (
              <Link key={l.href} href={l.href} onClick={close} className="py-3 text-lg border-b border-line">
                {l.label}
              </Link>
            ))}
            {user && (
              <button
                type="button"
                onClick={() => {
                  logout();
                  close();
                }}
                className="py-3 text-lg border-b border-line text-left"
              >
                Sign out ({user.name.split(" ")[0]})
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
