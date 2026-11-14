// rating 1 sampai 5 sebagai bintang. value dibulatkan oleh pemanggil
export default function Stars({ value, className = "" }) {
  return (
    <span className={`inline-flex text-gold ${className}`} role="img" aria-label={`${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} aria-hidden="true" className={n <= value ? "" : "opacity-25"}>
          ★
        </span>
      ))}
    </span>
  );
}
