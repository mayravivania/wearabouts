const mongoose = require('mongoose');

const CATEGORIES = ['outerwear', 'tops', 'bottoms', 'dresses'];

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  category: { type: String, required: true, enum: CATEGORIES },
  size: { type: String, required: true },
  condition: { type: String, required: true },
  // ukuran dalam cm, standar jualan thrift (LD = lebar dada, PJ = panjang)
  measurements: {
    chest: { type: Number, min: 0 },
    length: { type: Number, min: 0 }
  },
  price: { type: Number, required: true, min: 0 },
  photos: { type: [String], default: [] },
  status: { type: String, enum: ['available', 'sold'], default: 'available' }
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);
module.exports.CATEGORIES = CATEGORIES;
