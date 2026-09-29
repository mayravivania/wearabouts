require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/items', require('./routes/items.routes'));

// Milik B
// app.use('/api/orders', require('./routes/orders.routes'));
// app.use('/api/wishlist', require('./routes/wishlist.routes'));
// app.use('/api/reviews', require('./routes/reviews.routes'));

app.get('/', (req, res) => res.json({ success: true, message: 'Wearabouts API berjalan' }));

app.use((req, res) => res.status(404).json({ success: false, message: 'Endpoint tidak ditemukan' }));
app.use((err, req, res, next) => res.status(400).json({ success: false, message: err.message }));

connectDB().then(() => {
  app.listen(process.env.PORT || 3000, () => console.log('Server jalan di port', process.env.PORT || 3000));
});