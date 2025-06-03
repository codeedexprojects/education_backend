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

    nationality: {
      type: String,
      required: [true, 'Nationality is required'],
      trim: true
    },

    address: {
      street: { type: String, required: true, trim: true },
      city: { type: String, required: true, trim: true },
      state: { type: String, required: true, trim: true },
      country: { type: String, required: true, trim: true },
      postalCode: { type: String, trim: true }
    },

    highSchoolName: {
      type: String,
      required: [true, 'High School Name is required'],
      trim: true
    },

    graduationYear: {
      type: Number,
      required: [true, 'Graduation Year is required'],
      min: [1900, 'Graduation year must be after 1900'],
      max: [new Date().getFullYear(), 'Graduation year cannot be in the future']
    },

    gpa: {
      type: Number,
      required: [true, 'GPA is required'],
      min: 0,
      max: 4
    },

    satScore: {
      type: Number,
      min: 400,
      max: 1600,
      default: null
    },

    actScore: {
      type: Number,
      min: 1,
      max: 36,
      default: null
    },

    essays: {
      personalStatement: {
        type: String,
        maxlength: [3000, 'Personal Statement cannot exceed 3000 characters'], 
        required: [true, 'Personal Statement is required']
      },
      whyThisCollege: {
        type: String,
        maxlength: [1800, 'Why This College essay cannot exceed 1800 characters'], 
        required: [true, 'Why This College essay is required']
      }
    },

    achievementsAwards: {
      type: String,
      trim: true,
      default: ''
    },

    extracurricularActivities: {
      type: String,
      trim: true,
      default: ''
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

