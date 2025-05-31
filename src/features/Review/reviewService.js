const Review = require('./reviewModel');

exports.getAllReviews = async (status) => {
  const filter = {};
  if (status === 'Verified') {
    filter.status = 'Verified';
  } else if (status === 'Unverified') {
    filter.status = 'Unverified';
  }
  return await Review.find(filter)
    .populate('collegeId')
    .populate('userId');
};


exports.updateReviewStatus = async (reviewId, status) => {
  return await Review.findByIdAndUpdate(
    reviewId,
    { status },
    { new: true }
  );
};

exports.editReview = async (reviewId, updateData) => {
  return await Review.findByIdAndUpdate(
    reviewId,
    updateData,
    { new: true }
  );
};

exports.deleteReview = async (reviewId) => {
  return await Review.findByIdAndDelete(reviewId);
};
