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
    establishedYear: {
      type: Number,
      required: [true, 'Established year is required'],
      min: [1800, 'Year must be after 1800'],
    },
    type: {
      type: String,
      enum: ['University', 'College', 'Community College', 'Technical Institute', 'Research Institute'],
      required: [true, 'College type is required'],
    },
    address: {
      street: { type: String, required: true, trim: true },
      city: { type: String, required: true, trim: true },
      state: { type: String, required: true, trim: true },
      country: { type: String, required: true, trim: true },
      postalCode: { type: String, trim: true },
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
    images: [
      {
        type: String, 
        trim: true,
      }
    ],
    accreditation: {
      body: { type: String, trim: true }, 
      certificateNumber: { type: String, trim: true },
      validTill: { type: Date }
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
  },
  { timestamps: true }
);

module.exports = mongoose.model('College', collegeSchema);
