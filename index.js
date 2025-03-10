const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');

// Routes
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const shortUrlRoute = require('./routes/shorturls');

// Initialize app
const app = express();
dotenv.config();

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB Connected!'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Middleware
// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000", // Allow frontend access
  credentials: true, // For session cookies (if using sessions)
}));

app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

// API Routes
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/shorturls', shortUrlRoute);



// Port Configuration
const PORT = process.env.PORT || 3001;

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Backend server is running on port ${PORT}`);
});
