const express = require('express');
const router = express.Router();
const admissionController = require('../Admission/admissionController');

router.post('/', admissionController.createStudentAdmission);

module.exports = router;
