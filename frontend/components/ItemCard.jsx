import Link from "next/link";
import ItemPhoto from "./ItemPhoto";
import HangTag from "./ui/HangTag";
import SoldStamp from "./ui/SoldStamp";
import { formatIDR, itemMeta } from "@/lib/format";

export default function ItemCard({ item }) {
  const sold = item.status === "sold";

  return (
    <Link href={`/barang/${item._id}`} className="group flex flex-col gap-3.5 transition-transform duration-500 ease-out hover:-translate-y-1">
      <ItemPhoto item={item} faded={sold}>
        {sold ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <SoldStamp />
          </div>
        ) : (
          <HangTag
            price={item.price}
            size={item.size}
            className="absolute top-7 right-4 max-sm:scale-90 max-sm:origin-top-right"
          />
        )}
      </ItemPhoto>

      <div className="flex flex-col gap-1">
        <h3 className={`font-display text-lg leading-snug ${sold ? "text-fg-2" : ""}`}>{item.name}</h3>
        <p className="text-sm text-fg-2">{sold ? `Sold · ${formatIDR(item.price)}` : itemMeta(item)}</p>
      </div>
    </Link>
  );
}
