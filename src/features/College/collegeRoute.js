const express = require('express');
const router = express.Router();
const collegeController = require('./collegeController');

// View all colleges and Add a new college
router
  .route('/')
  .get(collegeController.getAllColleges)
  .post(collegeController.addCollege);

// Get, Update, and Delete a college by ID
router
  .route('/:id')
  .get(collegeController.getCollegeById)
  .patch(collegeController.updateCollege)
  .delete(collegeController.deleteCollege);

// Compare
router
  .route('/compare')
  .post(collegeController.compareColleges)

module.exports = router;