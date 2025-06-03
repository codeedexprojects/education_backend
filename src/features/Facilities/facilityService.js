const Facility = require('./facilityModel');

exports.createFacility = (data) => {
  return Facility.create(data);
};

exports.getAllFacilities = () => {
  return Facility.find();
};

exports.getFacilityById = (id) => {
  return Facility.findById(id);
};

exports.updateFacility = (id, updateData) => {
  return Facility.findByIdAndUpdate(id, updateData, { new: true });
};

exports.deleteFacility = (id) => {
  return Facility.findByIdAndDelete(id);
};