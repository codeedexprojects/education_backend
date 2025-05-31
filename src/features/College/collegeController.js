const collegeService = require('./collegeService');
const { sendResponse } = require('../../utils/responseHelper');

exports.addCollege = async (req, res) => {
  const college = await collegeService.createCollege(req.body);
  return sendResponse(res, 201, 'College added successfully', college);
};

exports.getAllColleges = async (req, res) => {
  const colleges = await collegeService.getAllColleges();
  return sendResponse(res, 200, 'Colleges retrieved', colleges);
};

exports.getCollegeById = async (req, res) => {
  const college = await collegeService.getCollegeById(req.params.id);
  if (!college) {
    return sendResponse(res, 404, 'College not found');
  }
  return sendResponse(res, 200, 'College retrieved', college);
};

exports.updateCollege = async (req, res) => {
  const updated = await collegeService.updateCollege(req.params.id, req.body);
  if (!updated) {
    return sendResponse(res, 404, 'College not found');
  }
  return sendResponse(res, 200, 'College updated successfully', updated);
};

exports.deleteCollege = async (req, res) => {
  const deleted = await collegeService.deleteCollege(req.params.id);
  if (!deleted) {
    return sendResponse(res, 404, 'College not found');
  }
  return sendResponse(res, 200, 'College deleted successfully');
};
