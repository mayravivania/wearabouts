import Link from "next/link";
import { Suspense } from "react";
import NavLinks, { LinkGroup } from "./NavLinks";
import ThemeToggle from "./ThemeToggle";
import ShopMenu from "./nav/ShopMenu";
import MobileMenu from "./nav/MobileMenu";

const mainLinks = [
  { href: "/jual", label: "Sell with us" },
  { href: "/#story", label: "Our story" },
  { href: "/bantuan", label: "Help" },
];

// TODO: setelah login tampilkan nama user, wishlist/orders hanya untuk buyer
const userLinks = [
  { href: "/incaran", label: "Wishlist" },
  { href: "/pesanan", label: "Orders" },
];

// --header-h dipakai MobileMenu supaya drawer pas di bawah header
export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg [--header-h:69px]">
      <nav className="max-w-[1240px] mx-auto px-4 sm:px-8 h-[68px] flex items-center justify-between gap-8">
        <Link href="/" aria-label="Wearabouts, back to home" className="font-display italic text-[26px] leading-none tracking-tight">
          Wearabouts
        </Link>

        <div className="hidden lg:flex flex-1 items-center gap-x-8 text-[15px]">
          <ShopMenu />
          <Suspense fallback={<LinkGroup links={mainLinks} />}>
            <NavLinks links={mainLinks} />
          </Suspense>
        </div>

        <div className="flex items-center gap-x-6 text-[15px]">
          <div className="hidden lg:flex gap-x-6">
            <Suspense fallback={<LinkGroup links={userLinks} />}>
              <NavLinks links={userLinks} />
            </Suspense>
            <Link href="/masuk" className="py-2 hover:opacity-70">
              Sign in
            </Link>
          </div>
          <ThemeToggle />
          <div className="lg:hidden">
            <MobileMenu />
          </div>
        </div>
      </nav>
    </header>
  );
}
