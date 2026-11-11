import Image from "next/image";
import { photoUrl } from "@/lib/format";

export default function ItemPhoto({ item, faded = false, sizes = "(max-width: 768px) 50vw, 25vw", preload = false, className = "", children }) {
  const src = photoUrl(item.photos?.[0]);
  // Next tidak bisa optimize gambar dari localhost
  const isLocal = src?.startsWith("http://");

  return (
    <div className={`relative aspect-[4/5] rounded-lg bg-photo ${className}`}>
      <div className="absolute inset-0 overflow-hidden rounded-lg">
        {src ? (
          <Image
            src={src}
            alt={item.name}
            fill
            sizes={sizes}
            preload={preload}
            unoptimized={isLocal}
            className={`object-cover transition-transform duration-700 group-hover:scale-[1.03] ${faded ? "grayscale-[70%] opacity-60" : ""}`}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-start justify-end p-4">
            <span className="font-display italic text-3xl text-fg/15 leading-none">{item.category.charAt(0).toUpperCase() + item.category.slice(1)}</span>
            <span className="mt-2 text-[11px] text-fg-2/70">Photo coming soon</span>
          </div>
        )}
      </div>
      {children}
    </div>
  );
}
