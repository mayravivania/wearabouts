const mongoose = require('mongoose');

module.exports = async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Atlas terhubung');
  } catch (err) {
    console.error('Gagal konek DB:', err.message);
    process.exit(1);
  }
};