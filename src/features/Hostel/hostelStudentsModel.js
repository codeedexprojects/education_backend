const mongoose = require('mongoose');

const studentMappingSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    studentCode: {
      type: String,
      required: true,
      unique: true, 
    },
    hostelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hostel',
      required: true,
    },
    hostelCode: {
      type: String,
      required: true,
    },
    room: {
      type: String,
    },
    joinedOn: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('StudentMapping', studentMappingSchema);
