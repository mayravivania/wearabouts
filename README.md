# Wearabouts

Etalase web thrift store untuk barang unik berstok tunggal. Setiap barang hanya bisa dibeli satu orang; sistem menangani pembelian bersamaan agar hanya satu pembeli yang berhasil.

Proyek ini adalah REST API (backend) dengan dua peran: **admin** (mengelola barang dan pesanan) dan **buyer** (berbelanja, wishlist, ulasan).

## Kelompok <X>

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
| Upload foto | Multer |
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
│   └── db.js
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
│   ├── item.controller.js
│   ├── orders.controller.js
│   ├── wishlist.controller.js
│   └── reviews.controller.js
├── routes/
│   ├── auth.routes.js
│   ├── items.routes.js
│   ├── orders.routes.js
│   ├── wishlist.routes.js
│   └── reviews.routes.js
└── uploads/
```

## Laporan

https://drive.google.com/drive/folders/13vDT0Kz2hLloYVStEiD8FmRsP62xxzX0?usp=sharing
