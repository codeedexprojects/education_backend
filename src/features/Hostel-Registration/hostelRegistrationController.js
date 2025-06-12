const hostelRegistrationService = require('./hostelRegistrationService');
const { sendResponse } = require('../../utils/responseHelper');

exports.getAllRegistrations = async (req, res) => {
  const { status, search } = req.query;
  const registrations = await hostelRegistrationService.getAllRegistrations(status, search);
  return sendResponse(res, 200, 'Hostel registrations fetched successfully', registrations);
};

exports.getRegistrationById = async (req, res) => {
  const registration = await hostelRegistrationService.getRegistrationById(req.params.id);
  if (!registration) {
    return res.status(404).json({ success: false, message: 'Registration not found' });
  }
  return sendResponse(res, 200, 'Registration fetched successfully', registration);
};

exports.approveRegistration = async (req, res) => {
  const updated = await hostelRegistrationService.updateStatus(req.params.id, 'approved');
  if (!updated) {
    return res.status(404).json({ success: false, message: 'Registration not found' });
  }
  return sendResponse(res, 200, 'Registration approved', updated);
};

exports.rejectRegistration = async (req, res) => {
  const updated = await hostelRegistrationService.updateStatus(req.params.id, 'rejected');
  if (!updated) {
    return res.status(404).json({ success: false, message: 'Registration not found' });
  }
  return sendResponse(res, 200, 'Registration rejected', updated);
};

exports.registerHostel = async (req, res) => {
  const data = req.body;
  const photos = req.files?.map(file => file.filename) || [];

  const registration = await hostelRegistrationService.createHostelRegistration(data, photos);
  return sendResponse(res, 201, 'Hostel registration submitted successfully', registration);
};