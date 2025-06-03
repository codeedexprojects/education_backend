const programService = require('./programService');
const { sendResponse } = require('../../utils/responseHelper');

// Create program
exports.addProgram = async (req, res, next) => {
  const program = await programService.createProgram(req.body);
  return sendResponse(res, 201, 'Program added successfully', program);
};

// Get all programs
exports.getAllPrograms = async (req, res, next) => {
  const filters = {};

  if (req.query.level) {
    filters.level = req.query.level;
  }

  if (req.query.name) {
    filters.name = { $regex: req.query.name, $options: 'i' };
  }

  const programs = await programService.getAllPrograms(filters);
  return sendResponse(res, 200, 'Programs retrieved', programs);
};

// Get a single program
exports.getProgramById = async (req, res, next) => {
  const program = await programService.getProgramById(req.params.id);
  if (!program) {
    return sendResponse(res, 404, 'Program not found');
  }
  return sendResponse(res, 200, 'Program retrieved', program);
};

// Update program
exports.updateProgram = async (req, res, next) => {
  const updated = await programService.updateProgram(req.params.id, req.body);
  if (!updated) {
    return sendResponse(res, 404, 'Program not found');
  }
  return sendResponse(res, 200, 'Program updated successfully', updated);
};

// Delete program
exports.deleteProgram = async (req, res, next) => {
  const deleted = await programService.deleteProgram(req.params.id);
  if (!deleted) {
    return sendResponse(res, 404, 'Program not found');
  }
  return sendResponse(res, 200, 'Program deleted successfully');
};
