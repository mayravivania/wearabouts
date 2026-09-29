const mongoose = require('mongoose');
const Review = require('../models/Review');
const Order = require('../models/Order');
const Item = require('../models/Item');
const User = require('../models/User'); // dimuat supaya populate('user') bisa jalan

// Buyer: beri ulasan setelah pesanan selesai
exports.create = async (req, res) => {
  try {
    const { orderId, rating, comment } = req.body;

    if (!orderId || !mongoose.isValidObjectId(orderId)) {
      return res.status(400).json({ success: false, message: 'orderId tidak valid' });
    }
    const score = Number(rating);
    if (!Number.isInteger(score) || score < 1 || score > 5) {
      return res.status(400).json({ success: false, message: 'rating harus bilangan bulat 1 sampai 5' });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Pesanan tidak ditemukan' });
    }
    if (String(order.buyer) !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Ini bukan pesananmu' });
    }
    if (order.status !== 'completed') {
      return res.status(400).json({ success: false, message: 'Ulasan hanya bisa diberikan setelah pesanan selesai' });
    }

    const review = await Review.create({
      user: req.user.id,
      item: order.item,
      order: order._id,
      rating: score,
      comment
    });
    res.status(201).json({ success: true, message: 'Ulasan tersimpan', data: review });
  } catch (err) {
    // 11000 = melanggar unique pada field order (pesanan ini sudah diulas)
    if (err.code === 11000) {
      return res.status(409).json({ success: false, message: 'Pesanan ini sudah diulas' });
    }
    res.status(500).json({ success: false, message: 'Gagal menyimpan ulasan', error: err.message });
  }
};

// Publik: semua ulasan satu barang + rata-rata rating
exports.listByItem = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: 'ID barang tidak valid' });
    }

    const reviews = await Review.find({ item: id })
      .populate('user', 'name')
      .sort({ createdAt: -1 });

    const total = reviews.length;
    const average = total ? reviews.reduce((sum, r) => sum + r.rating, 0) / total : 0;

    res.json({
      success: true,
      message: 'Ulasan barang',
      data: { averageRating: Number(average.toFixed(1)), total, reviews }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal mengambil ulasan', error: err.message });
  }
};