import { Suspense } from "react";
import ItemDetail from "@/components/barang/ItemDetail";

export const metadata = {
  title: "Piece",
};

// wajib Suspense di Next 16 (useParams)
export default function BarangPage() {
  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-10">
      <Suspense fallback={<p className="text-fg-2 py-16">Loading...</p>}>
        <ItemDetail />
      </Suspense>
    </div>
  );
}
