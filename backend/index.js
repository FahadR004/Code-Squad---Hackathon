const express = require('express');
const { connectDB } = require('./config/database')
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

dotenv.config();
const app = express();
app.use(express.json());

// CORS (frontend Vite default localhost:5173)
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.use((req, res) => { // Middleware for catching any errors whatsoever
  res.status(404).json({ message: 'Route not found' });
});

// Database Connection
connectDB();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
