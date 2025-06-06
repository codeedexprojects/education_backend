const collegeService = require('./collegeService');
const { sendResponse } = require('../../utils/responseHelper');

exports.addCollege = async (req, res, next) => {
  const college = await collegeService.createCollege(req.body);
  return sendResponse(res, 201, 'College added successfully', college);
};

exports.getAllColleges = async (req, res, next) => {
  const filters = {};

  if (req.query.type) {
    filters.type = req.query.type;
  }

  if (req.query.country) {
    filters['address.country'] = req.query.country;
  }

  if (req.query.accreditation) {
    filters['accreditation.body'] = req.query.accreditation;
  }

  const colleges = await collegeService.getAllColleges(filters);
  return sendResponse(res, 200, 'Colleges retrieved', colleges);
};

exports.getCollegeById = async (req, res, next) => {
  const college = await collegeService.getCollegeById(req.params.id);
  if (!college) {
    return sendResponse(res, 404, 'College not found');
  }
  return sendResponse(res, 200, 'College retrieved', college);
};

exports.updateCollege = async (req, res, next) => {
  const updated = await collegeService.updateCollege(req.params.id, req.body);
  if (!updated) {
    return sendResponse(res, 404, 'College not found');
  }
  return sendResponse(res, 200, 'College updated successfully', updated);
};

exports.deleteCollege = async (req, res, next) => {
  const deletedCollege = await collegeService.deleteCollege(req.params.id);
  if (!deletedCollege) {
    return sendResponse(res, 404, 'College not found');
  }
  return sendResponse(res, 200, 'College deleted successfully', deletedCollege);
};

exports.compareColleges = async(req, res) => {
  const { collegeIds } = req.body;
  if (!Array.isArray(collegeIds) || collegeIds.length < 2) {
    return sendResponse(res, 400, "At least two college IDs are required for comparison");
  }

  const colleges = await collegeService.getCollegesByIds(collegeIds);
  return sendResponse(res, 200, "Colleges retrieved for comparison", colleges);
}