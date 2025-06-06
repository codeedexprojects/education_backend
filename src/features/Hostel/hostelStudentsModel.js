const mongoose = require('mongoose');

const studentMappingSchema = new mongoose.Schema(
  {
    studentCode: {
      type: String,
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
