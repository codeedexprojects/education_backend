const mongoose = require('mongoose');

const programSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Program name is required'],
      trim: true,
    },
    level: {
      type: String,
      enum: ['Undergraduate', 'Postgraduate', 'Diploma', 'Doctorate'],
      required: [true, 'Program level is required'],
    },
    durationYears: {
      type: Number,
      min: [1, 'Minimum duration must be at least 1 year'],
      required: [true, 'Duration is required'],
    },
    collegeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'College',
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Program', programSchema);
