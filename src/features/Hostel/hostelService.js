const Hostel = require('./hostelModel');
const Photo = require('./hostelPhotosModel');
const crypto = require('crypto');
const HostelCode = require('./hostelCodeModel');
const StudentMapping = require('./hostelStudentsModel')


exports.addHostel = async (data, photoFilenames) => {
  const hostel = await Hostel.create(data);
  const uniqueCode = crypto.randomBytes(3).toString('hex'); 

    await HostelCode.create({
        hostelCode:uniqueCode,
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
    monthlyRent: hostel.monthlyRent,
    securityDeposit: hostel.securityDeposit,
    rating: hostel.safety_rating,
    food: hostel.food,
    foodIncludedInRent: hostel.foodIncludedInRent,
    gender: hostel.gender,
    distance: hostel.distance,
    hostelType: hostel.hostelType,
    amenities: hostel.amenities,
    googleMapsLink: hostel.googleMapsLink,
    address: `${hostel.address.street}, ${hostel.address.city}, ${hostel.address.state}`,
    description: hostel.description,
    photos: hostelPhotos
      .filter(p => p.hostelId.toString() === hostel._id.toString())
      .map(p => p.url),
  }));
};


exports.getMapData = async (filters = {}) => {
  const hostels = await Hostel.find(filters, {
    name: 1,
    monthlyRent: 1,
    gender: 1,
    food: 1,
    foodIncludedInRent: 1,
    safety_rating: 1,
    distance: 1,
    googleMapsLink: 1,
    hostelType: 1,
    amenities: 1,
    'address.street': 1,
    'address.city': 1,
    'address.state': 1,
    'address.district': 1,
    'address.country': 1,
  }).lean();

  return hostels.map(h => ({
    name: h.name,
    monthlyRent: h.monthlyRent,
    gender: h.gender,
    food: h.food,
    foodIncludedInRent: h.foodIncludedInRent,
    safety_rating: h.safety_rating,
    distance: h.distance,
    hostelType: h.hostelType,
    googleMapsLink: h.googleMapsLink,
    amenities: h.amenities,
    address: {
      street: h.address?.street,
      city: h.address?.city,
      district: h.address?.district,
      state: h.address?.state,
      country: h.address?.country,
    },
  }));
};


exports.mapStudentToHostel = async (studentCode, hostelCode) => {
  const existing = await StudentMapping.findOne({ studentCode });
  if (existing) {
    throw new Error('Student is already mapped to a hostel');
  }
  console.log(hostelCode);
  
  const hostel = await HostelCode.findOne({ hostelCode: hostelCode });
  if (!hostel) {
    throw new Error('Invalid hostel code');
  }

  const mapping = await StudentMapping.create({ studentCode, hostelCode });
  return mapping;
};

exports.getAllStudentMappings = async () => {
  return await StudentMapping.find().lean();
};