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
const collegeRoutes = require('./features/College/collegeRoute');
const seatRoutes = require('./features/Seat/seatRoute')
const reviewRoutes= require('./features/Review/reviewRoute')
const programRoutes = require('./features/Programs/programRoute')
const facilityRoute = require('./features/Facilities/facilityRoute')



app.use('/colleges', collegeRoutes)
app.use('/seat-availability', seatRoutes)
app.use('/reviews', reviewRoutes)
app.use('/programs', programRoutes)
app.use('/facilities', facilityRoute)



// Error handling middleware
app.use(errorMiddleware);

module.exports = app;