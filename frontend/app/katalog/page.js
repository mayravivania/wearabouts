import { Suspense } from "react";
import KatalogView from "@/components/katalog/KatalogView";

export const metadata = {
  title: "Shop",
};

export default function KatalogPage() {
  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-14">
      {/* Suspense karena KatalogView pakai useSearchParams */}
      <Suspense fallback={<p className="text-fg-2 py-16">Loading...</p>}>
        <KatalogView />
      </Suspense>
    </div>
  );
}
