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
const admissionRoutes = require('./features/Admission/admissionRoute')

const hostelRegistrationRoutes = require('./features/Hostel-Registration/hostelRegistrationRoute')




app.use('/colleges', collegeRoutes)
app.use('/seat-availability', seatRoutes)
app.use('/reviews', reviewRoutes)
app.use('/programs', programRoutes)
app.use('/facilities', facilityRoute)
app.use('/admissions', admissionRoutes)

app.use('/hostel-registration', hostelRegistrationRoutes)


// Unknown Routes
app.all(/.*/, (req, res, next) => {
  const err = new Error(`Route ${req.originalUrl} not found`);
  err.statusCode = 404;
  next(err); 
});

// Error handling middleware
app.use(errorMiddleware);

module.exports = app;