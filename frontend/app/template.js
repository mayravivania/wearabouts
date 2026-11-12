// template dibuat ulang di setiap pindah halaman, jadi fade-in jalan tiap navigasi
export default function Template({ children }) {
  return <div className="page-in">{children}</div>;
}
