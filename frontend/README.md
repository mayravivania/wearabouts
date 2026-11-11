# Wearabouts Frontend

Next.js 16 (App Router) + Tailwind CSS 4, JavaScript.

## Cara menjalankan

```bash
cd frontend
npm install
cp .env.example .env.local   # Windows: copy .env.example .env.local
npm run dev                  # buka http://localhost:3001
```

Frontend sengaja pakai port 3001 karena backend sudah pakai 3000.

### Data contoh vs backend

Di `.env.local`:

- `NEXT_PUBLIC_USE_MOCK=true` pakai data contoh dari `lib/mock-items.js`. Dipakai selama endpoint items belum ada.
- `NEXT_PUBLIC_USE_MOCK=false` ambil data dari backend di `NEXT_PUBLIC_API_URL`.

Habis ganti `.env.local`, restart `npm run dev`.

## Struktur

```
frontend/
├── app/                    halaman (file-based routing)
│   ├── layout.js           font, navbar, footer
│   ├── globals.css         warna dan font (design token)
│   ├── page.js             /            home
│   ├── katalog/page.js     /katalog
│   ├── barang/[id]/page.js /barang/:id  detail barang
│   └── not-found.js        halaman 404
├── components/
│   ├── ui/                 komponen dasar: Button, Badge, PriceTag, SoldStamp
│   ├── ItemCard.jsx        kartu barang
│   ├── ItemGrid.jsx        grid kartu + loading + kosong + error
│   ├── ItemPhoto.jsx       foto 4:5
│   ├── Navbar.jsx, NavLinks.jsx, Footer.jsx
│   ├── katalog/            FilterBar, KatalogView
│   ├── barang/             ItemDetail
│   └── home/               NewArrivals
├── hooks/useItems.js       ambil daftar barang (logic dipisah dari UI)
└── lib/
    ├── api.js              fetch ke backend + token JWT
    ├── items.js            getItems, getItem
    ├── config.js           URL API, daftar kategori dan ukuran
    ├── format.js           format rupiah, URL foto, baris ukuran
    └── mock-items.js       data contoh
```

## Aturan desain

Bahasa UI: **Inggris**, setiap teks diawali huruf kapital (sentence case). Jangan pakai em dash.

Warna disimpan sebagai variabel di `app/globals.css` dan otomatis berganti saat dark mode. Pakai class ini, jangan hex baru:

| Class | Light | Dark | Dipakai untuk |
|---|---|---|---|
| `bg-bg` / `text-fg` | krem / hijau tua | hijau tua / krem | background dan teks utama |
| `text-fg-2` | olive gelap | sage | teks sekunder |
| `bg-surface`, `bg-photo` | | | panel, kotak foto |
| `border-line` | | | garis tipis |
| `bg-panel` + `text-on-panel` | olive | olive gelap | blok besar (hero, story) |
| `bg-gold` + `text-on-gold` | mustard | mustard | label harga, kartu sorotan |
| `bg-btn` + `text-on-btn` | | | tombol utama |
| `text-stamp` | | | SOLD, error |
| `bg-deep` | | | footer |

Font: `font-display` (Fraunces, boleh `italic`) untuk judul dan nama barang, `font-sans` (Inter Tight) untuk sisanya.

Komponen khas: `HangTag` (label harga gantung, ayun saat hover), `SoldStamp`, `ThemeToggle` (ganti tema dengan fade warna 1,2 detik), `Breadcrumbs`, `HeroCarousel` dan rail "Just landed" (`components/home/useRail.js`).

Navbar sticky. Menu Shop (desktop: dropdown, HP: drawer) datanya di `SHOP_MENU` pada `lib/config.js`. Link menu cukup pakai query string, misalnya `/katalog?category=tops&size=M&max=100000&status=sold`, dan `KatalogView` membacanya otomatis.

Grade kondisi (`10/10` sampai `7/10`) ada di `CONDITIONS` pada `lib/config.js`, dipakai di detail barang, form jual, dan halaman bantuan.

## Catatan Next.js 16

Komponen client yang pakai `useParams`, `usePathname`, atau `useSearchParams` harus dibungkus `<Suspense>`. Kalau lupa, `npm run build` gagal (di `npm run dev` kelihatannya aman). Contohnya ada di `app/barang/[id]/page.js` dan `components/Navbar.jsx`. Selalu tes `npm run build` sebelum push.

## Yang sudah dan belum

Sudah: design system + dark mode, navbar sticky + menu Shop, footer, home (carousel, kategori, rail barang baru), katalog + filter (kategori, ukuran, harga, status), detail barang (tampilan), bantuan (`/bantuan`), jual (`/jual`, form ke `POST /consignments`), 404.

Belum:

- [ ] Login dan register (`/masuk`, `/daftar`), simpan token pakai `setToken` di `lib/api.js`
- [ ] Navbar berubah sesuai status login dan role
- [ ] Checkout `POST /orders`, tangani 409 dengan pesan "keduluan"
- [ ] Incaran (`/incaran`), pesanan saya (`/pesanan`) + form ulasan
- [ ] Admin: daftar barang, tambah/edit + upload foto, daftar pesanan + ubah status, daftar pengajuan jual (`GET /consignments`, terima/tolak via `PATCH /consignments/:id`)
- [ ] Cek bentuk respons `GET /items/:id` begitu backend items di-push, sesuaikan `ItemDetail.jsx` kalau datanya dibungkus (misalnya `{ item, averageRating }`)
