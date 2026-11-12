# Wearabouts

Etalase web thrift store untuk barang unik berstok tunggal. Setiap barang hanya bisa dibeli satu orang; sistem menangani pembelian bersamaan agar hanya satu pembeli yang berhasil.

Proyek ini adalah REST API (backend) dengan dua peran: **admin** (mengelola barang dan pesanan) dan **buyer** (berbelanja, wishlist, ulasan).

## Kelompok 21

- Mayravivania Syahda Charisa (24/538308/TK/59701)
- Zahira Anindya Putri (24/543202/TK/60347)
- Aston Hugo (24/538303/TK/59700)
- Alya Luqyana Nayswa (24/545645/TK/60716)

## Fitur Utama

- Registrasi, login, dan autentikasi JWT (password di-hash dengan bcrypt)
- Otorisasi berbasis peran (`admin` dan `buyer`) lewat middleware
- Katalog barang: daftar, detail, pencarian, dan filter (kategori, ukuran, harga, status)
- Manajemen barang beserta upload foto (admin)
- Checkout atomik / anti-rebutan: barang berstok satu hanya bisa dibeli satu orang
- Riwayat pesanan (buyer) dan manajemen pesanan (admin)
- Wishlist dan ulasan setelah pesanan selesai

## Teknologi

| Komponen | Teknologi |
|---|---|
| Runtime dan framework | Node.js, Express |
| Database | MongoDB Atlas, Mongoose |
| Autentikasi | jsonwebtoken (JWT), bcrypt |
| Upload foto | Multer + Cloudinary (lokal ke folder `uploads/` kalau Cloudinary belum diatur) |
| Uji dan dokumentasi API | Postman |
| Version control | Git dan GitHub |

## Struktur Folder

```
wearabouts/
├── app.js
├── seedAdmin.js
├── package.json
├── .env.example
├── .gitignore
├── config/
│   ├── db.js
│   └── cloudinary.js
├── middleware/
│   ├── auth.js            (verifyToken)
│   ├── role.js            (requireRole)
│   └── upload.js          (multer)
├── models/
│   ├── User.js
│   ├── Item.js
│   ├── Order.js
│   ├── Wishlist.js
│   └── Review.js
├── controllers/
│   ├── auth.controller.js
│   ├── items.controller.js
│   ├── orders.controller.js
│   ├── wishlist.controller.js
│   └── reviews.controller.js
├── utils/
│   └── savePhotos.js      (simpan foto ke Cloudinary atau uploads/)
├── routes/
│   ├── auth.routes.js
│   ├── items.routes.js
│   ├── orders.routes.js
│   ├── wishlist.routes.js
│   └── reviews.routes.js
├── uploads/
└── jobs/
```

## Cara Menjalankan

1. Clone repo, lalu masuk ke foldernya
2. `npm install`
3. Salin `.env.example` menjadi `.env`, lalu isi `MONGO_URI`, `JWT_SECRET`, `ADMIN_EMAIL`, dan `ADMIN_PASSWORD`
4. Buat akun admin: `node seedAdmin.js` (memakai `ADMIN_EMAIL` dan `ADMIN_PASSWORD` dari `.env`)
5. Jalankan server: `npm run dev` (berjalan di http://localhost:3000)

## Catatan API (tambahan Milestone 2)

- `POST /api/items` dan `PUT /api/items/:id` (form-data) menerima `chest` dan `length` dalam cm. `category` wajib salah satu dari `outerwear`, `tops`, `bottoms`, `dresses`.
- `POST /api/orders` sekarang wajib mengirim alamat:
  ```json
  { "itemId": "...", "shippingAddress": { "name": "...", "phone": "...", "address": "..." } }
  ```
- `GET /api/reviews?limit=12` (publik): ulasan terbaru dari semua barang, untuk testimoni di home.
- Foto: kalau `CLOUDINARY_*` di `.env` diisi, foto disimpan di Cloudinary dan `photos` berisi URL lengkap. Kalau kosong, foto disimpan di `uploads/`.

- `POST /api/consignments` (buyer, multipart): ajukan barang untuk dijual. Field: name, brand, category, size, condition, askingPrice, description, contact, photos (maks 5).
- `GET /api/consignments/mine` (buyer): daftar pengajuan sendiri beserta statusnya.
- `GET /api/consignments?status=pending` (admin): semua pengajuan.
- `PATCH /api/consignments/:id` (admin): body `{ status: "accepted" | "rejected", adminNote }`. Kalau diterima, admin membuat Item baru lewat form barang seperti biasa.

## Laporan

https://drive.google.com/drive/folders/13vDT0Kz2hLloYVStEiD8FmRsP62xxzX0?usp=sharing
