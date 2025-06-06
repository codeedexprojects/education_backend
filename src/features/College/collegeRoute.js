const express = require('express');
const router = express.Router();
const collegeController = require('./collegeController');
const upload = require('../../middleware/multerConfig');


// View all colleges and Add a new college
router
  .route('/')
  .get(collegeController.getAllColleges)
  .post(upload.array('images', 5), collegeController.addCollege);

// Get, Update, and Delete a college by ID
router
  .route('/:id')
  .get(collegeController.getCollegeById)
  .put(upload.array('images', 5), collegeController.updateCollege)
  .delete(collegeController.deleteCollege);

// Compare
router
  .route('/compare')
  .post(collegeController.compareColleges)

module.exports = router;