const Hostel = require('./hostelModel');
const Photo = require('./hostelPhotosModel');
const crypto = require('crypto');
const HostelCode = require('./hostelCodeModel');


exports.addHostel = async (data, photoFilenames) => {
  const hostel = await Hostel.create(data);
  const uniqueCode = `H-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`;

    await HostelCode.create({
        code:uniqueCode,
        hostelId:hostel._id
    })

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

exports.compareHostels = async (hostelIds) => {

  const hostels = await Hostel.find({ _id: { $in: hostelIds } }).lean();
  const hostelPhotos = await Photo.find({ hostelId: { $in: hostelIds } }).lean();

  return hostels.map((hostel) => ({
    id: hostel._id,
    name: hostel.name,
    rent: hostel.rent,
    rating: hostel.safety_rating,
    food: hostel.food,
    gender: hostel.gender,
    distance: hostel.distance || null, 
    address: `${hostel.address.street}, ${hostel.address.city}, ${hostel.address.state}`,
    location: hostel.location,
    photos: hostelPhotos
      .filter(p => p.hostelId.toString() === hostel._id.toString())
      .map(p => p.url),
  }));
};

exports.getMapData = async (filters = {}) => {
  
  const hostels = await Hostel.find(filters, {
    name: 1,
    rent: 1,
    gender: 1,
    food: 1,
    safety_rating: 1,
    distance: 1,
    'address.street': 1,
    'address.city': 1,
    'address.state': 1,
    latitude: 1,
    longitude: 1,
    'location.latitude': 1,
    'location.longitude': 1
  }).lean();

  
  return hostels.map(h => ({
    name: h.name,
    price: h.rent,
    gender: h.gender,
    food: h.food,
    safety_rating: h.safety_rating,
    distance: h.distance,
    address: {
      street: h.address?.street,
      city: h.address?.city,
      state: h.address?.state,
    },
    coordinates: {
      lat: h.location.latitude,
      lng: h.location.longitude
    }
  }));
};
