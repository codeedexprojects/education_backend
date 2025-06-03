const facilityService = require('./facilityService');
const { sendResponse } = require('../../utils/responseHelper');

// Create facility
exports.addFacility = async (req, res, next) => {
  const facility = await facilityService.createFacility(req.body);
  return sendResponse(res, 201, 'Facility added successfully', facility);
};

// Get all facility
exports.getAllFacilities = async (req, res, next) => {
  const filters = {};

  if (req.query.level) {
    filters.level = req.query.level;
  }

  if (req.query.name) {
    filters.name = { $regex: req.query.name, $options: 'i' };
  }

  const facilities = await facilityService.getAllFacilities(filters);
  return sendResponse(res, 200, 'Facilities retrieved', facilities);
};

// Get a single facility
exports.getFacilityById = async (req, res, next) => {
  const facility = await facilityService.getFacilityById(req.params.id);
  if (!facility) {
    return sendResponse(res, 404, 'Facility not found');
  }
  return sendResponse(res, 200, 'Facility retrieved', facility);
};

// Update facility
exports.updateFacility = async (req, res, next) => {
  const updated = await facilityService.updateFacility(req.params.id, req.body);
  if (!updated) {
    return sendResponse(res, 404, 'Facility not found');
  }
  return sendResponse(res, 200, 'Facility updated successfully', updated);
};

// Delete facility
exports.deleteFacility = async (req, res, next) => {
  const deleted = await facilityService.deleteFacility(req.params.id);
  if (!deleted) {
    return sendResponse(res, 404, 'Facility not found');
  }
  return sendResponse(res, 200, 'Facility deleted successfully');
};