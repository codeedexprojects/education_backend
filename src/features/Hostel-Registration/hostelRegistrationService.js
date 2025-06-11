const HostelRegistration = require('./hostelRegistrationModel');

exports.createHostelRegistration = async (data, photoFilenames) => {
  return await HostelRegistration.create({
    ...data,
    photos: photoFilenames || [],
  });
};