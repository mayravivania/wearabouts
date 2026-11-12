import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-28 flex flex-col items-start gap-6">
      <span className="text-sm text-fg-2">404</span>
      <h1 className="font-display text-5xl tracking-tight">
        This page <span className="italic">isn&rsquo;t here.</span>
      </h1>
      <p className="text-lg text-fg-2">Maybe it is still being built, or the link is off.</p>
      <Button href="/katalog">Back to the shop</Button>
    </div>
  );
}
