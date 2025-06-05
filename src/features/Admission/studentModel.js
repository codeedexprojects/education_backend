const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    phone: { type: String, required: true, trim: true },
    dateOfBirth: { type: Date, required: true },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: true
    },
    nationality: { type: String, required: true, trim: true },

    address: {
      street: { type: String, required: true, trim: true },
      city: { type: String, required: true, trim: true },
      state: { type: String, required: true, trim: true },
      country: { type: String, required: true, trim: true },
      postalCode: { type: String, trim: true }
    },

    tenthPercentage: { type: Number, required: true, min: 0, max: 100 },
    twelfthPercentage: { type: Number, required: true, min: 0, max: 100 },
    entranceExam: { type: String, required: true },
    entranceExamScore: { type: Number, required: true },
    graduationPercentage: { type: Number, min: 0, max: 100 },

    appliedProgram: {
      collegeId: { type: mongoose.Schema.Types.ObjectId, ref: 'College' },
      programId: { type: mongoose.Schema.Types.ObjectId, ref: 'Program' },
      academicYear: {
        type: String,
        match: [/^\d{4}-\d{4}$/, 'Academic year must be in YYYY-YYYY format']
      },
      modeOfStudy: {
        type: String,
        enum: ['Online', 'Offline', 'Hybrid'],
        required: true
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
    },
    paymentMethod: {
      type: String,
      enum: ['UPI', 'Bank Transfer', 'Card', 'Cash'],
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Paid', 'Failed'],
      default: 'Pending'
    },
    documents: {
      tenthMarksheet: { type: String, required: true },
      twelfthMarksheet: { type: String, required: true },
      aadharCard: { type: String, required: true },
      photo: { type: String, required: true },
      additionalDoc: { type: String } 
    },

    profileImage: { type: String, trim: true },

    status: {
      type: String,
      enum: ['Active', 'Inactive', 'Suspended'],
      default: 'Active'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Student', studentSchema);
