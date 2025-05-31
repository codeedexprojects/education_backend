const reviewService = require('./reviewService');
const { sendResponse } = require('../../utils/responseHelper');

// Get all reviews
exports.getAllReviews = async (req, res) => {
  const reviews = await reviewService.getAllReviews();
  return sendResponse(res, 200, "Reviews retrieved", reviews);
};

// Approve review
exports.verifyReview = async (req, res) => {
  const updated = await reviewService.updateReviewStatus(req.params.id, 'Verified');
  if (!updated) return sendResponse(res, 404, "Review not found");
  return sendResponse(res, 200, "Review approved", updated);
};

// Reject review


// Update review (edit)
exports.updateReview = async (req, res) => {
  const updated = await reviewService.editReview(req.params.id, req.body);
  if (!updated) return sendResponse(res, 404, "Review not found or not editable");
  return sendResponse(res, 200, "Review updated", updated);
};

// Delete review
exports.deleteReview = async (req, res) => {
  const deleted = await reviewService.deleteReview(req.params.id);
  if (!deleted) return sendResponse(res, 404, "Review not found");
  return sendResponse(res, 200, "Review deleted successfully");
};
