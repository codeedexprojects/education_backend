const express = require('express');
const router = express.Router();
const facilityController = require('./facilityController');

// Routes
router
.route('/')
.post(facilityController.addFacility)
.get(facilityController.getAllFacilities);


router
.route('/:id')
.get(facilityController.getFacilityById)
.put(facilityController.updateFacility)
.delete(facilityController.deleteFacility);

module.exports = router;