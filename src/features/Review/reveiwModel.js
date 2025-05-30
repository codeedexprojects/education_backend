const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    collegeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'College',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'userType',
      required: true,
    },
    userType: {
      type: String,
      required: true,
      enum: ['Student', 'Parent']
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: 1,
      max: 5,
    },
    title: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    comment: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending',
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Review', reviewSchema);
