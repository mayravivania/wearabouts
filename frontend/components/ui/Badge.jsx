const variants = {
  solid: "bg-fg text-bg border-fg",
  outline: "bg-transparent text-fg border-line",
  gold: "bg-gold text-on-gold border-gold",
};

export default function Badge({ variant = "solid", className = "", children }) {
  return (
    <span className={`inline-block rounded-full border px-3 py-1 text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
