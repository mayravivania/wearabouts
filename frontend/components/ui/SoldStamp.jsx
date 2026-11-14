export default function SoldStamp({ large = false }) {
  return <span className={`sold-stamp font-sans ${large ? "text-4xl" : "text-xl"}`}>SOLD</span>;
}
