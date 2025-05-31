const admissionService = require('./admissionService');
const { sendResponse } = require('../../utils/responseHelper');

exports.createStudentAdmission = async (req, res, next) => {
  const student = await admissionService.createStudent(req.body);
  return sendResponse(res, 201, 'Student admission created successfully', student);
};
