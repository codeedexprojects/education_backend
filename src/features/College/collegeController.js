const collegeService = require('./collegeService');
const { sendResponse } = require('../../utils/responseHelper');

exports.addCollege = async (req, res) => {
  try {
    const college = await collegeService.createCollege(req.body);
    return sendResponse(res, 201, 'College added successfully', college);
  } catch (err) {
    return sendResponse(res, 500, err.message || 'Failed to add college');
  }
};

exports.getAllColleges = async (req, res) => {
  try {
    const colleges = await collegeService.getAllColleges();
    return sendResponse(res, 200, 'Colleges retrieved', colleges);
  } catch (err) {
    return sendResponse(res, 500, err.message || 'Failed to get colleges');
  }
};

exports.getCollegeById = async (req, res) => {
  try {
    const college = await collegeService.getCollegeById(req.params.id);
    if (!college) {
      return sendResponse(res, 404, 'College not found');
    }
    return sendResponse(res, 200, 'College retrieved', college);
  } catch (err) {
    return sendResponse(res, 500, err.message || 'Failed to get college');
  }
};

exports.updateCollege = async (req, res) => {
  try {
    const updated = await collegeService.updateCollege(req.params.id, req.body);
    if (!updated) {
      return sendResponse(res, 404, 'College not found');
    }
    return sendResponse(res, 200, 'College updated successfully', updated);
  } catch (err) {
    return sendResponse(res, 500, err.message || 'Failed to update college');
  }
};

exports.deleteCollege = async (req, res) => {
  try {
    const deleted = await collegeService.deleteCollege(req.params.id);
    if (!deleted) {
      return sendResponse(res, 404, 'College not found');
    }
    return sendResponse(res, 200, 'College deleted successfully');
  } catch (err) {
    return sendResponse(res, 500, err.message || 'Failed to delete college');
  }
};
