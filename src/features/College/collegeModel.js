const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'College name is required'],
      trim: true,
    },
    shortName: {
      type: String,
      trim: true,
    },
    nationalRanking: {
      type: Number,
      min: [1, 'Ranking must be a positive number'],
    },
    establishedYear: {
      type: Number,
      required: [true, 'Established year is required'],
      min: [1800, 'Year must be after 1800'],
    },
    type: {
      type: String,
      required: [true, 'College type is required'],
      trim: true,
    },
    address: {
      street: { type: String, required: true, trim: true },
      city: { type: String, required: true, trim: true },
      district: { type: String, trim: true },
      state: { type: String, required: true, trim: true },
      country: { type: String, required: true, trim: true },
      postalCode: { type: String, trim: true },
      googleMapsLink: { type: String, trim: true },
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    website: {
      type: String,
      trim: true,
      match: [/^https?:\/\/.+/, 'Please enter a valid URL'],
    },
    logo: {
      type: String,
      trim: true,
    },
    images: [{ type: String, trim: true }],
    accreditation: {
      body: { type: String, trim: true },
      certificateNumber: { type: String, trim: true },
      validTill: { type: Date },
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive', 'Blacklisted'],
      default: 'Active',
    },
    placementRating: {
      type: Number,
      min: 1,
      max: 5,
    },
    facilities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Facility',
      }
    ],
    programs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Program',
      }
    ],
    hostel: {
      boysHostel: {
        available: { type: Boolean, default: false },
        numberOfRooms: { type: Number, default: 0 },
      },
      girlsHostel: {
        available: { type: Boolean, default: false },
        numberOfRooms: { type: Number, default: 0 },
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('College', collegeSchema);
