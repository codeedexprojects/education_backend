const mongoose = require('mongoose');

const studentMappingSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    hostelCode: {
      type: String,
      required: true,
    },
    mappedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('StudentMapping', studentMappingSchema);
