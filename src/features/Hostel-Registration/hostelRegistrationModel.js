const mongoose = require('mongoose');

const hostelRegistrationSchema = new mongoose.Schema(
  {
    ownerName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    hostelName: { type: String, required: true, trim: true },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      district: { type: String },
      state: { type: String, required: true },
      country: { type: String, required: true },
      postalCode: { type: String, required: true },
    },
    rent: { type: Number, required: true, index: true },
    gender: {
      type: String,
      enum: ['male', 'female', 'unisex'],
      required: true,
      index: true,
    },
    food: {
      type: String,
      enum: ['veg', 'non-veg', 'both'],
      required: true,
      index: true,
    },
    safety_rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 3,
      index: true,
    },
    location: {
      latitude: { type: Number, required: true, index: true },
      longitude: { type: Number, required: true, index: true },
    },
    contact: {
      phone: { type: String, required: true, trim: true },
      email: { type: String, required: true, trim: true },
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
      index: true,
    },
    photos: [
      {
        type: String,
      },
    ],
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('HostelRegistration', hostelRegistrationSchema);
