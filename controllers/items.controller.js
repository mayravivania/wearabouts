const mongoose = require('mongoose');
const Item = require('../models/Item');
const savePhotos = require('../utils/savePhotos');

// chest dan length datang dari form-data (string), kosong berarti tidak diisi
const readMeasurements = (body) => {
  const m = {};
  if (body.chest !== undefined && body.chest !== '') m.chest = Number(body.chest);
  if (body.length !== undefined && body.length !== '') m.length = Number(body.length);
  return m;
};

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

exports.getItems = async (req, res) => {
  try {
    const { q, size, category, status, min, max } = req.query;
    const filter = {};
    if (q) filter.name = { $regex: escapeRegex(q), $options: 'i' };
    if (size) filter.size = size;
    if (category) filter.category = category;
    if (status) filter.status = status;
    if (min || max) {
      filter.price = {};
      if (min) filter.price.$gte = Number(min);
      if (max) filter.price.$lte = Number(max);
    }
    const items = await Item.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, message: 'Daftar barang', data: items });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Terjadi kesalahan server' });
  }
};

exports.getItemById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'ID tidak valid' });
    }
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Barang tidak ditemukan' });

    // rata-rata ulasan: model Review milik B, aman kalau belum ada
    let averageRating = null;
    const Review = mongoose.models.Review;
    if (Review) {
      const agg = await Review.aggregate([
        { $match: { item: item._id } },
        { $group: { _id: null, avg: { $avg: '$rating' }, count: { $sum: 1 } } }
      ]);
      if (agg.length) averageRating = { average: Number(agg[0].avg.toFixed(1)), count: agg[0].count };
    }
    res.json({ success: true, message: 'Detail barang', data: { ...item.toObject(), averageRating } });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Terjadi kesalahan server' });
  }
};

exports.createItem = async (req, res) => {
  try {
    const { name, description, category, size, condition, price } = req.body;
    if (!name || !category || !size || !condition || price === undefined) {
      return res.status(400).json({ success: false, message: 'name, category, size, condition, price wajib diisi' });
    }
    if (isNaN(Number(price)) || Number(price) < 0) {
      return res.status(400).json({ success: false, message: 'Harga tidak valid' });
    }
    const measurements = readMeasurements(req.body);
    if (Object.values(measurements).some((v) => isNaN(v) || v < 0)) {
      return res.status(400).json({ success: false, message: 'Ukuran (chest/length) harus angka positif' });
    }
    const photos = await savePhotos(req.files);
    const item = await Item.create({ name, description, category, size, condition, measurements, price: Number(price), photos });
    res.status(201).json({ success: true, message: 'Barang ditambahkan', data: item });
  } catch (err) {
    // misalnya kategori di luar daftar
    if (err.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: err.message });
    }
    res.status(500).json({ success: false, message: 'Terjadi kesalahan server' });
  }
};

exports.updateItem = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'ID tidak valid' });
    }
    const allowed = ['name', 'description', 'category', 'size', 'condition', 'price', 'status'];
    const update = {};
    allowed.forEach((k) => { if (req.body[k] !== undefined) update[k] = req.body[k]; });
    const measurements = readMeasurements(req.body);
    Object.entries(measurements).forEach(([k, v]) => { update['measurements.' + k] = v; });
    if (req.files && req.files.length) update.photos = await savePhotos(req.files);

    const item = await Item.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ success: false, message: 'Barang tidak ditemukan' });
    res.json({ success: true, message: 'Barang diperbarui', data: item });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'ID tidak valid' });
    }
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Barang tidak ditemukan' });
    res.json({ success: true, message: 'Barang dihapus' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Terjadi kesalahan server' });
  }
};