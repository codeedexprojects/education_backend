const Hostel = require('./hostelModel');
const Photo = require('./hostelPhotosModel');

exports.createHostel = async (data, photoFilenames) => {
  const hostel = await Hostel.create(data);

  if (photoFilenames.length) {
    const photos = photoFilenames.map((filename) => ({
      hostelId: hostel._id,
      url: filename,
    }));
    await Photo.insertMany(photos);
  }

  return await Hostel.findById(hostel._id).lean();
};

exports.getAllHostels = async (filters = {}) => {
  const hostels = await Hostel.find(filters).lean();

  const hostelIds = hostels.map(h => h._id);
  const photos = await Photo.find({ hostelId: { $in: hostelIds } }).lean();

  return hostels.map(hostel => ({
    ...hostel,
    photos: photos.filter(p => p.hostelId.toString() === hostel._id.toString()),
  }));
};

exports.getHostelById = async (id) => {
  const hostel = await Hostel.findById(id).lean();
  if (!hostel) return null;

  const photos = await Photo.find({ hostelId: id }).lean();
  return { ...hostel, photos };
};

exports.updateHostel = async (id, updateData, files) => {
  const updated = await Hostel.findByIdAndUpdate(id, updateData, { new: true }).lean();
  if (!updated) return null;

  if (files?.length) {
    const photos = files.map((file) => ({
      hostelId: id,
      url: file.filename,
    }));
    await Photo.insertMany(photos);
  }

  const allPhotos = await Photo.find({ hostelId: id }).lean();
  return { ...updated, photos: allPhotos };
};

exports.deleteHostel = async (id) => {
  const hostel = await Hostel.findByIdAndDelete(id);
  if (!hostel) return null;

  await Photo.deleteMany({ hostelId: id });
  return hostel;
};
