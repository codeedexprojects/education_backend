const mongoose = require('mongoose');

const hostelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      district: { type: String },
      state: { type: String, required: true },
      country: { type: String, required: true },
      postalCode: { type: String, required: true },
    },
    monthlyRent: {
      type: Number,
      required: true,
      index: true,
    },
    securityDeposit: {
      type: Number,
      default: 0,
    },
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
    foodIncludedInRent: {
      type: Boolean,
      default: false,
    },
    safety_rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 3,
      index: true,
    },
    googleMapsLink: {
      type: String,
      required: true,
      trim: true,
    },
    distance: {
      type: Number, 
      required: true,
      index: true
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    ownerName: {
      type: String,
      required: true,
      trim: true,
    },
    ownerPhone: {
      type: String,
      required: true,
      trim: true,
    },
    hostelType: {
      type: String,
      enum: ['Dormitory', 'Single Room', 'Shared Room', 'PG'],
      required: true,
    },
    amenities: [
      {
        type: String,
        trim: true,
      }
    ],
    contact: {
      phone: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Hostel', hostelSchema);
