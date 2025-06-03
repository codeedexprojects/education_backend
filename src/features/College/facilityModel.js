const mongoose = require('mongoose');

const facilitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Facility name is required'],
      trim: true,
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
