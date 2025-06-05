const mongoose = require('mongoose');

const studentCodeSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
      unique: true
    },
    studentCode: {
      type: String,
      required: true,
      unique: true,
      immutable: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('StudentCode', studentCodeSchema);
