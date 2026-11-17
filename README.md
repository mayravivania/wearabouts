# Wearabouts

Toko online barang secondhand yang unik dan berstok tunggal. Setiap barang hanya ada satu, jadi hanya satu pembeli yang bisa mendapatkannya. Wearabouts adalah toko fiktif untuk tugas kuliah, dibuat serealistis mungkin: ada katalog, checkout, pesanan, ulasan, titip jual, dan panel admin.

Aplikasi punya dua peran: **buyer** (berbelanja, wishlist, ulasan, mengajukan barang untuk dijual) dan **admin** (mengelola barang, pesanan, pengajuan titip jual, dan ulasan pilihan untuk beranda).

## Tautan

| | |
|---|---|
| Aplikasi (deploy) | https://wearabouts-alpha.vercel.app |
| API (deploy) | https://wearabouts-production.up.railway.app |
| Video demo | [ISI LINK VIDEO DI SINI](ISI_LINK_VIDEO_DI_SINI) |
| Laporan | https://drive.google.com/drive/folders/13vDT0Kz2hLloYVStEiD8FmRsP62xxzX0?usp=sharing |

Backend gratis di Railway bisa lambat saat pertama dibuka. Akun admin untuk penilaian diberikan terpisah, tidak ditulis di repo.

## Kelompok 21

- Mayravivania Syahda Charisa (24/538308/TK/59701)
- Zahira Anindya Putri (24/543202/TK/60347)
- Aston Hugo (24/538303/TK/59700)
- Alya Luqyana Nayswa (24/545645/TK/60716)

## Pembagian Tugas

| Bagian | Dikerjakan oleh |
|---|---|
| Backend: REST API, autentikasi, database, checkout anti-rebutan, Cloudinary | Mayravivania, Zahira |
| Frontend: tampilan, katalog, checkout, pesanan, ulasan, titip jual, panel admin | Aston, Alya |
| Deploy (Railway, Vercel, MongoDB Atlas, Cloudinary) | Aston |

## Fitur Utama

**Buyer**
- Registrasi dan login (JWT, password di-hash dengan bcrypt)
- Katalog dengan pencarian dan filter (kategori, ukuran, harga, status Available atau Sold)
- Halaman barang dengan galeri foto, ukuran dalam cm, dan grade kondisi
- Checkout atomik: barang berstok satu hanya bisa dibeli satu orang, pembeli yang kalah mendapat pesan "Someone got there first."
- Petunjuk transfer, riwayat pesanan, dan pembatalan otomatis untuk pesanan pending lebih dari 24 jam
- Wishlist, ulasan setelah pesanan selesai
- Titip jual: ajukan barang dengan foto, lalu pantau statusnya

**Admin**
- Kelola barang, termasuk upload sampai 5 foto dan mengatur urutannya (foto pertama jadi sampul)
- Kelola pesanan: pending, paid, shipped, completed
- Terima atau tolak pengajuan titip jual, dengan catatan untuk penjual
- Pilih ulasan bintang 4 dan 5 untuk ditampilkan di beranda

## Teknologi

| Komponen | Teknologi |
|---|---|
| Frontend | Next.js 16 (App Router), React, Tailwind CSS 4 |
| Backend | Node.js, Express 5 |
| Database | MongoDB Atlas, Mongoose 9 |
| Autentikasi | jsonwebtoken (JWT), bcrypt |
| Upload foto | Multer, Cloudinary |
| Deploy | Vercel (frontend), Railway (backend) |
| Uji dan dokumentasi API | Postman |
| Version control | Git dan GitHub |

## Struktur Folder

```
wearabouts/
├── app.js, seedAdmin.js, package.json, .env.example   backend (root)
├── config/        db.js, cloudinary.js
├── middleware/    auth.js, role.js, upload.js
├── models/        User, Item, Order, Wishlist, Review, Consignment
├── controllers/   auth, items, orders, wishlist, reviews, consignments
├── routes/        satu file per controller
├── utils/         savePhotos.js, photoOrder.js
├── jobs/          expirePending.js (batalkan pesanan pending)
└── frontend/      Next.js (lihat frontend/README.md)
```

## Cara Menjalankan

Butuh Node.js dan akun MongoDB Atlas.

**Backend**

1. Clone repo, lalu masuk ke foldernya
2. `npm install`
3. Salin `.env.example` menjadi `.env`, lalu isi `MONGO_URI`, `JWT_SECRET`, `ADMIN_EMAIL`, dan `ADMIN_PASSWORD`. Variabel `CLOUDINARY_*` boleh dikosongkan saat development (foto disimpan ke folder `uploads/`)
4. Buat akun admin: `node seedAdmin.js`
5. Jalankan: `npm run dev` (http://localhost:3000)

**Frontend**

1. `cd frontend` lalu `npm install`
2. Salin `.env.example` menjadi `.env.local`, isi `NEXT_PUBLIC_API_URL=http://localhost:3000/api` dan `NEXT_PUBLIC_USE_MOCK=false`
3. `npm run dev` (http://localhost:3001)

## Ringkasan API

Semua endpoint berawalan `/api`. Respons berbentuk `{ success, message, data }`.

| Endpoint | Akses | Fungsi |
|---|---|---|
| `POST /auth/register`, `POST /auth/login`, `GET /auth/me` | publik, publik, login | daftar, masuk, profil |
| `GET /items`, `GET /items/:id` | publik | daftar (filter: q, size, category, status, min, max) dan detail |
| `POST /items`, `PUT /items/:id`, `DELETE /items/:id` | admin | kelola barang (form-data, foto maksimal 5) |
| `POST /orders` | buyer | checkout, wajib `itemId` dan `shippingAddress` |
| `GET /orders/me` | buyer | riwayat pesanan sendiri |
| `GET /orders`, `PATCH /orders/:id/status` | admin | semua pesanan, ubah status |
| `POST /wishlist`, `GET /wishlist`, `DELETE /wishlist/:itemId` | buyer | wishlist |
| `POST /reviews` | buyer | ulasan (satu per pesanan selesai) |
| `GET /reviews`, `GET /reviews/item/:id` | publik | ulasan terbaru (`?featured=true&limit=6` untuk beranda) dan ulasan per barang |
| `PATCH /reviews/:id/featured` | admin | tampilkan atau sembunyikan ulasan di beranda |
| `POST /consignments`, `GET /consignments/mine` | buyer | ajukan titip jual, lihat pengajuan sendiri |
| `GET /consignments`, `PATCH /consignments/:id` | admin | semua pengajuan, terima atau tolak |

Catatan:
- `category` wajib salah satu dari `outerwear`, `tops`, `bottoms`, `dresses`.
- `POST /orders` memakai pengecekan atomik; kalau barang sudah diambil orang lain, respons 409.
- `PUT /items/:id` menerima field `photoOrder` (JSON): daftar URL foto lama dan `{ "new": i }` untuk file baru, sesuai urutan yang diinginkan.
- Foto: kalau `CLOUDINARY_*` diisi, foto disimpan di Cloudinary dan `photos` berisi URL lengkap. Kalau kosong, foto disimpan di `uploads/`.

## Rencana Pengembangan

Ide yang belum dikerjakan: status barang "reserved", upload video produk, payment gateway, hitungan ongkos kirim otomatis, serta notifikasi dan pelacakan pembayaran ke penjual titip jual.
