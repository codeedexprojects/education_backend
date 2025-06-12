const express = require('express');
const router = express.Router();
const hostelRegistrationController = require('./hostelRegistrationController');
const upload = require('../../middleware/multerConfig');

router
  .route('/')
  .post(upload.array('photos', 5), hostelRegistrationController.registerHostel)
  .get(hostelRegistrationController.getAllRegistrations);

router
  .route('/:id')
  .get(hostelRegistrationController.getRegistrationById);

router
  .route('/:id/approve')
  .patch(hostelRegistrationController.approveRegistration);

router
  .route('/:id/reject')
  .patch(hostelRegistrationController.rejectRegistration);

module.exports = router;
