const mongoose = require('mongoose');
const Consignment = require('../models/Consignment');
const User = require('../models/User'); // dimuat supaya populate('seller') bisa jalan
const savePhotos = require('../utils/savePhotos');

// Buyer: ajukan barang untuk dijual lewat Wearabouts
exports.create = async (req, res) => {
  try {
    const { name, brand, category, size, condition, askingPrice, description, contact } = req.body;
    const photos = await savePhotos(req.files);

    const consignment = await Consignment.create({
      seller: req.user.id,
      name, brand, category, size, condition, description, contact,
      askingPrice: Number(askingPrice),
      photos
    });
    res.status(201).json({ success: true, message: 'Pengajuan terkirim', data: consignment });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: err.message });
    }
    res.status(500).json({ success: false, message: 'Gagal mengirim pengajuan', error: err.message });
  }
};

// Buyer: daftar pengajuan miliknya sendiri
exports.mine = async (req, res) => {
  try {
    const list = await Consignment.find({ seller: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, message: 'Pengajuan saya', data: list });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal mengambil pengajuan', error: err.message });
  }
};

// Admin: semua pengajuan, bisa difilter ?status=pending
exports.listAll = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    const list = await Consignment.find(filter).populate('seller', 'name email').sort({ createdAt: -1 });
    res.json({ success: true, message: 'Semua pengajuan', data: list });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal mengambil pengajuan', error: err.message });
  }
};

// Admin: terima atau tolak
exports.review = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNote } = req.body;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: 'ID tidak valid' });
    }
    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: 'status harus accepted atau rejected' });
    }

    const consignment = await Consignment.findOneAndUpdate(
      { _id: id, status: 'pending' },
      { status, adminNote: adminNote || '' },
      { new: true }
    );
    if (!consignment) {
      return res.status(404).json({ success: false, message: 'Pengajuan tidak ditemukan atau sudah ditinjau' });
    }
    res.json({ success: true, message: 'Pengajuan ditinjau', data: consignment });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal meninjau pengajuan', error: err.message });
  }
};
