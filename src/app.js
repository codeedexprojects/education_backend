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
const collegeRoute = require('./features/College/collegeRoute')
const admissionRoutes = require('./features/Admission/admissionRoute')

app.use('/college', collegeRoute)
app.use('/admissions', admissionRoutes)

// Error handling middleware
app.use(errorMiddleware);

module.exports = app;