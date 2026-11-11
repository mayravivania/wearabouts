require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');

const email = (process.env.ADMIN_EMAIL || '').toLowerCase();
const password = process.env.ADMIN_PASSWORD;

(async () => {
  if (!email || !password) {
    console.error('Isi ADMIN_EMAIL dan ADMIN_PASSWORD di file .env dulu');
    process.exit(1);
  }
  await mongoose.connect(process.env.MONGO_URI);
  const exists = await User.findOne({ email });
  if (!exists) {
    await User.create({
      name: 'Admin', email,
      password: await bcrypt.hash(password, 10), role: 'admin'
    });
    console.log('Admin dibuat:', email);
  } else console.log('Admin sudah ada');
  process.exit();
})();