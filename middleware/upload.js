const fs = require('fs');
const multer = require('multer');
const path = require('path');
const { enabled: useCloudinary } = require('../config/cloudinary');

const UPLOAD_DIR = path.join(__dirname, '..', 'uploads');

// Pakai Cloudinary: file ditahan di memori lalu dikirim ke Cloudinary oleh utils/savePhotos.
// Tanpa Cloudinary: file langsung disimpan ke folder uploads/.
let storage;
if (useCloudinary) {
  storage = multer.memoryStorage();
} else {
  // multer tidak membuat folder sendiri, jadi dibuat di sini kalau belum ada
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, UPLOAD_DIR),
    filename: (req, file, cb) =>
      cb(null, Date.now() + '-' + Math.round(Math.random() * 1e6) + path.extname(file.originalname))
  });
}

const fileFilter = (req, file, cb) =>
  file.mimetype.startsWith('image/') ? cb(null, true) : cb(new Error('File harus berupa gambar'));

module.exports = multer({ storage, fileFilter, limits: { fileSize: 2 * 1024 * 1024 } });
