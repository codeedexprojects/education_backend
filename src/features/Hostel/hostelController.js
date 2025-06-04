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
