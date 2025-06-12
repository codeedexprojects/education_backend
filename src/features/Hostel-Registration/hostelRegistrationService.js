const HostelRegistration = require('./hostelRegistrationModel');

exports.getAllRegistrations = async (status, search) => {
  const filter = {};

  if (status) {
    filter.status = status;
  }

  if (search) {
    const regex = new RegExp(search, 'i'); 
    filter.$or = [
      { ownerName: regex },
      { hostelName: regex },
      { 'address.city': regex },
      { 'address.state': regex },
      { 'address.district': regex }
    ];
  }

  return await HostelRegistration.find(filter).sort({ createdAt: -1 }).lean();
};

exports.getRegistrationById = async (id) => {
  return await HostelRegistration.findById(id).lean();
};

exports.updateStatus = async (id, newStatus) => {
  return await HostelRegistration.findByIdAndUpdate(
    id,
    { status: newStatus },
    { new: true }
  );
};

exports.createHostelRegistration = async (data, photoFilenames) => {
  return await HostelRegistration.create({
    ...data,
    photos: photoFilenames || [],
  });
};