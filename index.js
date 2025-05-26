const express = require('express');
const { connectDB } = require('./config/database');
const { loadEnv } = require('./config/env');
const app = require('./src/app');
const logger = require('./config/logger');

// Load environment variables
loadEnv();

// Initialize Express app
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    logger.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });