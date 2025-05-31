const Seat = require('./seatModel');

exports.addSeatAvailability = async (data) => {
  return await Seat.create(data);
};

exports.getAllSeatAvailability = async () => {
  return await Seat.find().populate('collegeId programId').lean();
};

exports.updateSeatAvailability = async (id, updateData) => {
  return await Seat.findByIdAndUpdate(id, updateData, { new: true });
};

exports.deleteSeatAvailability = async (id) => {
  return await Seat.findByIdAndDelete(id);
};

exports.getSeatAvailabilityByCollege = async (collegeId) => {
  return await Seat.find({ collegeId }).populate('programId').lean();
};
