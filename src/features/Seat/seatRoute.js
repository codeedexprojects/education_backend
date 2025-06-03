const express = require('express');
const router = express.Router();
const seatController = require('./seatController');

// Get seat availability and add 
router.route('/').get(seatController.getAllSeatAvailability).post(seatController.addSeatAvailability)

// Update, delete
router.route('/:id').patch(seatController.updateSeatAvailability).delete(seatController.deleteSeatAvailability)

// Get by college Id
router.route('/:collegeId').get(seatController.getSeatAvailabilityByCollege)

module.exports = router;
