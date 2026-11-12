const mongoose = require('mongoose');

// Pengajuan jual dari user (titip jual / consignment).
// Admin meninjau, lalu kalau diterima admin membuat Item baru seperti biasa.
const consignmentSchema = new mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true, trim: true },
  brand: { type: String, default: '', trim: true },
  category: { type: String, enum: ['outerwear', 'tops', 'bottoms', 'dresses'], required: true },
  size: { type: String, required: true },
  condition: { type: String, required: true },
  askingPrice: { type: Number, required: true, min: 0 },
  description: { type: String, default: '' },
  photos: { type: [String], default: [] },
  contact: { type: String, required: true, trim: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  adminNote: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Consignment', consignmentSchema);
