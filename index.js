const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB Connected!'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1); // Exit if DB connection fails
  });

  const allowedOrigins = [
    'http://localhost:3000', // For local testing
    'https://myurlify.vercel.app' // For production frontend
  ];
  
  app.use(
    cors({
      origin: allowedOrigins,
      credentials: true, // If you use cookies/sessions
    })
  );
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

// Routes
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const shortUrlRoute = require('./routes/shorturls');

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/shorturls', shortUrlRoute);

// Error Handling - 404 Not Found
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Port Configuration
const PORT = process.env.PORT || 3001;

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Backend server is running on port ${PORT}`);
});
