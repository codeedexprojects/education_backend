const express = require('express');
const router = express.Router();
const admissionController = require('../Admission/admissionController');
const upload = require('../../middleware/multerConfig'); 

router
  .route('/')
  .get(admissionController.getAllStudents)
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


router
.route('/:id')
.get(admissionController.getStudentById)
.patch(
  upload.fields([
    { name: 'tenthMarksheet', maxCount: 1 },
    { name: 'twelfthMarksheet', maxCount: 1 },
    { name: 'aadharCard', maxCount: 1 },
    { name: 'photo', maxCount: 1 },
    { name: 'additionalDoc', maxCount: 1 },
  ]),
  admissionController.updateStudent
)
.delete(admissionController.deleteStudent);





module.exports = router;
