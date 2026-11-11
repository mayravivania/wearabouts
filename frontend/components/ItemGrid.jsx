import ItemCard from "./ItemCard";

const grid = "grid grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-x-4 md:gap-x-7 gap-y-12";

export default function ItemGrid({ items, loading, error, emptyText = "Nothing here yet." }) {
  if (error) {
    return <p className="text-stamp py-16">{error}</p>;
  }

  if (loading) {
    return (
      <div className={grid}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3.5 animate-pulse">
            <div className="aspect-[4/5] rounded-lg bg-photo" />
            <div className="h-5 w-3/4 rounded bg-photo" />
            <div className="h-3 w-1/2 rounded bg-photo" />
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return <p className="text-fg-2 py-16">{emptyText}</p>;
  }

  return (
    <div className={grid}>
      {items.map((item) => (
        <ItemCard key={item._id} item={item} />
      ))}
    </div>
  );
}
