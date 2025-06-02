const express = require('express');
const router = express.Router();
const programController = require('./programController');

// Routes
router
.route('/')
.post(programController.addProgram)
.get(programController.getAllPrograms);


router
.route('/:id')
.get(programController.getProgramById)
.put(programController.updateProgram)
.delete(programController.deleteProgram);

module.exports = router;
