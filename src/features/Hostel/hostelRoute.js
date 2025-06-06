const express = require('express');
const router = express.Router();
const hostelController = require('./hostelController');
const upload = require('../../middleware/multerConfig');  

router
  .route('/')
  .post(upload.array('photos'), hostelController.addHostel)
  .get(hostelController.getAllHostels);

router
.route('/map-data')
.get(hostelController.getHostelMapData);  

router
.route('/student-mapping')
.post( hostelController.mapStudentToHostel)
.get( hostelController.getAllMappings);

router
  .route('/:id')
  .get(hostelController.getHostelById)
  .put(upload.array('photos'), hostelController.updateHostel)
  .delete(hostelController.deleteHostel);


router
.route('/compare')
.post(hostelController.compareHostels)





module.exports = router;
