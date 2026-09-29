const mongoose = require('mongoose');
const Wishlist = require('../models/Wishlist');
const Item = require('../models/Item'); // dipakai untuk cek barang dan populate

// Tambah barang ke wishlist
exports.add = async (req, res) => {
  try {
    const { itemId } = req.body;

    if (!itemId || !mongoose.isValidObjectId(itemId)) {
      return res.status(400).json({ success: false, message: 'itemId tidak valid' });
    }

    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Barang tidak ditemukan' });
    }

    const wish = await Wishlist.create({ user: req.user.id, item: itemId });
    res.status(201).json({ success: true, message: 'Ditambahkan ke wishlist', data: wish });
  } catch (err) {
    // 11000 = melanggar unique index (barang yang sama sudah ada di wishlist user ini)
    if (err.code === 11000) {
      return res.status(409).json({ success: false, message: 'Barang sudah ada di wishlist' });
    }
    res.status(500).json({ success: false, message: 'Gagal menambah wishlist', error: err.message });
  }
};

// Lihat wishlist sendiri
exports.list = async (req, res) => {
  try {
    const wishes = await Wishlist.find({ user: req.user.id })
      .populate('item', 'name size condition price photos status')
      .sort({ createdAt: -1 });
    res.json({ success: true, message: 'Wishlist', data: wishes });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal mengambil wishlist', error: err.message });
  }
};

// Hapus dari wishlist
exports.remove = async (req, res) => {
  try {
    const { itemId } = req.params;

    if (!mongoose.isValidObjectId(itemId)) {
      return res.status(400).json({ success: false, message: 'itemId tidak valid' });
    }

    const result = await Wishlist.deleteOne({ user: req.user.id, item: itemId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, message: 'Barang tidak ada di wishlist' });
    }

    res.json({ success: true, message: 'Dihapus dari wishlist' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal menghapus wishlist', error: err.message });
  }
};