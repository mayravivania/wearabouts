const { cloudinary, enabled } = require('../config/cloudinary');

function uploadBuffer(file) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'wearabouts', resource_type: 'image' },
      (err, result) => (err ? reject(err) : resolve(result.secure_url))
    );
    stream.end(file.buffer);
  });
}

// Mengubah req.files dari multer jadi daftar URL foto untuk disimpan di Item.photos.
// Cloudinary: URL lengkap https://res.cloudinary.com/...
// Lokal: /uploads/namafile.jpg
module.exports = async function savePhotos(files = []) {
  if (!files.length) return [];
  if (enabled) return Promise.all(files.map(uploadBuffer));
  return files.map((f) => '/uploads/' + f.filename);
};
