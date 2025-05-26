const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/health', (req, res) => {
    res.send('OK')
})


// Error handling middleware
app.use(errorMiddleware);

module.exports = app;