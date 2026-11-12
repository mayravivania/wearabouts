import Link from "next/link";

const base =
  "inline-flex items-center justify-center gap-2 min-h-12 px-6 rounded-md text-[15px] font-medium transition-[color,background-color,opacity,transform] duration-300 active:scale-[0.98] disabled:cursor-not-allowed";

const variants = {
  primary: "bg-btn text-on-btn hover:bg-btn-hover disabled:opacity-40 disabled:hover:bg-btn",
  secondary: "border border-fg text-fg hover:bg-fg hover:text-bg disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-fg",
  onPanel: "border border-on-panel-2 text-on-panel hover:bg-on-panel hover:text-panel",
  onGold: "bg-on-gold text-gold hover:opacity-85",
  onDeep: "border border-on-deep/40 text-on-deep hover:bg-on-deep hover:text-deep",
  ghost: "px-0 min-h-11 rounded-none underline underline-offset-[6px] decoration-1 hover:decoration-2",
};

export default function Button({ variant = "primary", href, className = "", children, ...props }) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
