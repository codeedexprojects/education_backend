const express = require('express');
const router = express.Router();
const hostelRegistrationController = require('./hostelRegistrationController');
const upload = require('../../middleware/multerConfig'); 

router
.route('/')
.post(upload.array('photos', 5),hostelRegistrationController.registerHostel);



module.exports = router;
