const reviewService = require('./reviewService');
const { sendResponse } = require('../../utils/responseHelper');

// Get all reviews
exports.getAllReviews = async (req, res) => {
  const status = req.query.status; 
  const reviews = await reviewService.getAllReviews(status);
  return sendResponse(res, 200, "Reviews retrieved", reviews);
};

// Approve a review
exports.approveReview = async (req, res) => {
  const updated = await reviewService.updateReviewStatus(req.params.id, 'Verified');
  if (!updated) return sendResponse(res, 404, "Review not found");
  return sendResponse(res, 200, "Review verified", updated);
};

// Edit a review
exports.editReview = async (req, res) => {
  const updated = await reviewService.editReview(req.params.id, req.body);
  if (!updated) return sendResponse(res, 404, "Review not found or not editable");
  return sendResponse(res, 200, "Review updated", updated);
};

// Delete a review
exports.deleteReview = async (req, res) => {
  const deleted = await reviewService.deleteReview(req.params.id);
  if (!deleted) return sendResponse(res, 404, "Review not found");
  return sendResponse(res, 200, "Review deleted successfully");
};
