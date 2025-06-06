const hostelService = require('./hostelService');
const { sendResponse } = require('../../utils/responseHelper');

exports.addHostel = async (req, res, next) => {
  const data = req.body;
  const photos = req.files?.map((file) => file.filename) || [];  

  const hostel = await hostelService.addHostel(data, photos);
  return sendResponse(res, 201, 'Hostel added successfully', hostel);
};

exports.getAllHostels = async (req, res, next) => {
  const filters = {};

  if (req.query.gender) filters.gender = req.query.gender;
  if (req.query.food) filters.food = req.query.food;
  if (req.query.rent) filters.rent = { $lte: Number(req.query.rent) };

  const hostels = await hostelService.getAllHostels(filters);
  return sendResponse(res, 200, 'Hostels retrieved', hostels);
};

exports.getHostelById = async (req, res, next) => {
  const hostel = await hostelService.getHostelById(req.params.id);
  if (!hostel) return sendResponse(res, 404, 'Hostel not found');
  return sendResponse(res, 200, 'Hostel retrieved', hostel);
};

exports.updateHostel = async (req, res, next) => {
  const updated = await hostelService.updateHostel(req.params.id, req.body, req.files);
  if (!updated) return sendResponse(res, 404, 'Hostel not found');
  return sendResponse(res, 200, 'Hostel updated', updated);
};

exports.deleteHostel = async (req, res, next) => {
  const deleted = await hostelService.deleteHostel(req.params.id);
  if (!deleted) return sendResponse(res, 404, 'Hostel not found');
  return sendResponse(res, 200, 'Hostel deleted', deleted);
};

exports.compareHostels = async (req, res, next) => {
  const { hostelIds } = req.body;

  if (!Array.isArray(hostelIds) || hostelIds.length === 0) {
    return sendResponse(res, 400, 'Hostel IDs are required');
  }

  const data = await hostelService.compareHostels(hostelIds);
  return sendResponse(res, 200, 'Comparison data retrieved', data);
};

exports.getHostelMapData = async (req, res, next) => {  
  const { rent, gender, food, safety_rating, distance } = req.query;

  const filters = {};

  if (rent) filters.rent = { $lte: Number(rent) };
  if (gender) filters.gender = gender;
  if (food) filters.food = food;
  if (safety_rating) filters.safety_rating = { $gte: Number(safety_rating) };
  if (distance) filters.distance = { $lte: Number(distance) };

  const data = await hostelService.getMapData(filters);
  return sendResponse(res, 200, 'Hostel map data retrieved', data);
};


exports.mapStudentToHostel = async (req, res, next) => {
  const { studentCode, hostelCode } = req.body;

  if (!studentCode || !hostelCode) {
    return sendResponse(res, 400, 'Both studentCode and hostelCode are required');
  }

  const mapping = await hostelService.mapStudentToHostel(studentCode, hostelCode);
  return sendResponse(res, 201, 'Student mapped to hostel successfully', mapping);
};

exports.getAllMappings = async (req, res, next) => {
  const mappings = await hostelService.getAllStudentMappings();
  return sendResponse(res, 200, 'All student mappings retrieved', mappings);
};