const express = require('express');
const router = express.Router();
const collegeController = require('./collegeController');

// View all colleges
router.get('/', collegeController.getAllColleges);

// Create a new college
router.post('/', collegeController.addCollege);

// Get college by ID
router.get('/:id', collegeController.getCollegeById);

// Update college by ID
router.put('/:id', collegeController.updateCollege);

// Delete college by ID
router.delete('/:id', collegeController.deleteCollege);

module.exports = router;
