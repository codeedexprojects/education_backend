const express = require('express');
const router = express.Router();
const admissionController = require('../Admission/admissionController');

router
.route('/')
.post(admissionController.createStudentAdmission)

router
.route('/receipt/:studentId')
.get(admissionController.generateAdmissionReceipt);


module.exports = router;
