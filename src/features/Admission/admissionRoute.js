const express = require('express');
const router = express.Router();
const admissionController = require('../Admission/admissionController');
const upload = require('../../middleware/multerConfig'); 

router
  .route('/')
  .post(
    upload.fields([
      { name: 'tenthMarksheet', maxCount: 1 },
      { name: 'twelfthMarksheet', maxCount: 1 },
      { name: 'aadharCard', maxCount: 1 },
      { name: 'photo', maxCount: 1 },
      { name: 'additionalDoc', maxCount: 1 },
    ]),
    admissionController.createStudentAdmission
  );

router
  .route('/receipt/:studentId')
  .get(admissionController.generateAdmissionReceipt);

module.exports = router;
