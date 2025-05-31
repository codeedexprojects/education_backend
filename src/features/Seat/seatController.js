const seatService = require('./seatService');
const { sendResponse } = require('../../utils/responseHelper');

exports.addSeatAvailability = async (req, res) => {
  const seat = await seatService.addSeatAvailability(req.body);
  return sendResponse(res, 201, 'Seat availability added successfully', seat);
};

exports.getAllSeatAvailability = async (req, res) => {
  const seats = await seatService.getAllSeatAvailability();
  return sendResponse(res, 200, 'Seat availability list fetched', seats);
};

exports.getSeatAvailabilityByCollege = async (req, res) => {
  const seats = await seatService.getSeatAvailabilityByCollege(req.params.collegeId);
  if (!seats || seats.length === 0) {
    return sendResponse(res, 404, 'No seat availability found for this college');
  }
  return sendResponse(res, 200, 'Seat availability fetched', seats);
};

exports.updateSeatAvailability = async (req, res) => {
  const updatedSeat = await seatService.updateSeatAvailability(req.params.id, req.body);
  if (!updatedSeat) {
    return sendResponse(res, 404, 'Seat availability not found');
  }
  return sendResponse(res, 200, 'Seat availability updated successfully', updatedSeat);
};

exports.deleteSeatAvailability = async (req, res) => {
  const deleted = await seatService.deleteSeatAvailability(req.params.id);
  if (!deleted) {
    return sendResponse(res, 404, 'Seat availability not found');
  }
  return sendResponse(res, 200, 'Seat availability deleted successfully');
};
