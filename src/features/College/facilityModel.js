const mongoose = require('mongoose');

const facilitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Facility name is required'],
      trim: true,
    },
    type: {
      type: String,
      enum: ['Academic', 'Hostel', 'Sports', 'Medical', 'Transport', 'Other'],
      default: 'Other',
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
    status: {
      type: String,
      enum: ['Available', 'Unavailable'],
      default: 'Available',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Facility', facilitySchema);
