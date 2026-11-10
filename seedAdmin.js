require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const exists = await User.findOne({ email: 'admin@wearabouts.com' });
  if (!exists) {
    await User.create({
      name: 'Admin', email: 'admin@wearabouts.com',
      password: await bcrypt.hash('admin123', 10), role: 'admin'
    });
    console.log('Admin dibuat');
  } else console.log('Admin sudah ada');
  process.exit();
})();