const cloudinary = require('cloudinary').v2;

// Cloudinary hanya dipakai kalau ketiga variabel ada di .env.
// Kalau tidak ada (misalnya saat development), foto tetap disimpan ke folder uploads/.
const enabled = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
);

if (enabled) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
}

module.exports = { cloudinary, enabled };
