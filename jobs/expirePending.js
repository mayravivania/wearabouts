const Order = require('../models/Order');
const Item = require('../models/Item');

// Pesanan pending yang lebih lama dari batas ini dibatalkan otomatis (default 24 jam)
const MINUTES = Number(process.env.PENDING_EXPIRE_MINUTES) || 1440;

async function expirePending() {
  const limit = new Date(Date.now() - MINUTES * 60 * 1000);
  const expired = await Order.find({ status: 'pending', createdAt: { $lt: limit } });
  for (const order of expired) {
    // hanya batalkan kalau statusnya masih pending (hindari bentrok dengan admin yang baru menandai paid)
    const result = await Order.updateOne({ _id: order._id, status: 'pending' }, { status: 'cancelled' });
    if (result.modifiedCount === 1) {
      await Item.findByIdAndUpdate(order.item, { status: 'available' });
    }
  }
}

module.exports = function startExpireJob() {
  setInterval(() => {
    expirePending().catch((err) => console.error('Job pembatalan otomatis gagal:', err.message));
  }, 5 * 60 * 1000);
};