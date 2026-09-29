const mongoose = require('mongoose');
const Item = require('../models/Item');
const Order = require('../models/Order');
const User = require('../models/User');

exports.checkout = async (req, res) => {
  try {
    const { itemId } = req.body;

    if (!itemId || !mongoose.isValidObjectId(itemId)) {
      return res.status(400).json({ success: false, message: 'itemId tidak valid' });
    }

    const item = await Item.findOneAndUpdate(
      { _id: itemId, status: 'available' },
      { status: 'sold' },
      { new: true }
    );

    if (!item) {
      return res.status(409).json({
        success: false,
        message: 'Barang sudah terjual atau tidak ditemukan'
      });
    }

    try {
      const order = await Order.create({
        buyer: req.user.id,
        item: item._id,
        price: item.price,
        status: 'pending'
      });
      return res.status(201).json({ success: true, message: 'Checkout berhasil', data: order });
    } catch (err) {
      await Item.findByIdAndUpdate(item._id, { status: 'available' });
      throw err;
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal memproses checkout', error: err.message });
  }
};

// Alur status yang boleh: satu arah, tidak bisa mundur
const flow = {
  pending: ['paid', 'cancelled'],
  paid: ['shipped', 'cancelled'],
  shipped: ['completed'],
  completed: [],
  cancelled: []
};

// Buyer: riwayat pesanan sendiri
exports.myOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user.id })
      .populate('item', 'name size condition price photos status')
      .sort({ createdAt: -1 });
    res.json({ success: true, message: 'Riwayat pesanan', data: orders });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal mengambil pesanan', error: err.message });
  }
};

// Admin: semua pesanan
exports.allOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('buyer', 'name email')
      .populate('item', 'name price status')
      .sort({ createdAt: -1 });
    res.json({ success: true, message: 'Semua pesanan', data: orders });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal mengambil pesanan', error: err.message });
  }
};

// Admin: ubah status pesanan
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: 'ID pesanan tidak valid' });
    }
    if (!Object.keys(flow).includes(status)) {
      return res.status(400).json({ success: false, message: 'Status tidak valid' });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Pesanan tidak ditemukan' });
    }
    if (!flow[order.status].includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status tidak bisa diubah dari ${order.status} ke ${status}`
      });
    }

    order.status = status;
    await order.save();

    // Pesanan dibatalkan: barang boleh dibeli orang lain lagi
    if (status === 'cancelled') {
      await Item.findByIdAndUpdate(order.item, { status: 'available' });
    }

    res.json({ success: true, message: 'Status pesanan diperbarui', data: order });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal mengubah status', error: err.message });
  }
};