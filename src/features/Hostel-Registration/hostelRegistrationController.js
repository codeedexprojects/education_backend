const hostelRegistrationService = require('./hostelRegistrationService');
const { sendResponse } = require('../../utils/responseHelper');

exports.registerHostel = async (req, res) => {
  const data = req.body;
  const photos = req.files?.map(file => file.filename) || [];

  const registration = await hostelRegistrationService.createHostelRegistration(data, photos);
  return sendResponse(res, 201, 'Hostel registration submitted successfully', registration);
};