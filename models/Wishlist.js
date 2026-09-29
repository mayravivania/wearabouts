const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true }
}, { timestamps: true });

// satu user tidak bisa menandai barang yang sama dua kali
wishlistSchema.index({ user: 1, item: 1 }, { unique: true });

module.exports = mongoose.model('Wishlist', wishlistSchema);