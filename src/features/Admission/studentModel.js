const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Date of birth is required']
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: true
    },
    address: {
      street: { type: String, required: true, trim: true },
      city: { type: String, required: true, trim: true },
      state: { type: String, required: true, trim: true },
      country: { type: String, required: true, trim: true },
      postalCode: { type: String, trim: true }
    },
    academicDetails: {
      highestQualification: { type: String, required: true, trim: true },
      percentage: { type: Number, required: true, min: 0, max: 100 },
      yearOfPassing: { type: Number, required: true },
      certificate: { type: String, required: true, trim: true },
      boardOrUniversity: { type: String, required: true, trim: true }
    },
    appliedPrograms: [
      {
        collegeId: { type: mongoose.Schema.Types.ObjectId, ref: 'College' },
        programId: { type: mongoose.Schema.Types.ObjectId, ref: 'Program' },
        academicYear: {
          type: String,
          match: [/^\d{4}-\d{4}$/, 'Academic year must be in YYYY-YYYY format']
        },
        status: {
          type: String,
          enum: ['Applied', 'Admitted', 'Rejected', 'Cancelled'],
          default: 'Applied'
        },
        appliedDate: {
          type: Date,
          default: Date.now
        }
      }
    ],
    profileImage: {
      type: String, 
      trim: true
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive', 'Suspended'],
      default: 'Active'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Student', studentSchema);