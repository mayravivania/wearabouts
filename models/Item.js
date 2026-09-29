const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  category: { type: String, required: true },
  size: { type: String, required: true },
  condition: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  photos: { type: [String], default: [] },
  status: { type: String, enum: ['available', 'sold'], default: 'available' }
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);