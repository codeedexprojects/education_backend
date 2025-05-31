const College = require('./CollegeModel');
exports.createCollege = async (data) => {
  const newCollege = new College(data);
  return await newCollege.save();
};

exports.getAllColleges = async (filters = {}) => {
  return College.find(filters);
};

exports.getCollegeById = async (id) => {
  return await College.findById(id);
};

exports.updateCollege = async (id, updateData) => {
  return await College.findByIdAndUpdate(id, updateData, { new: true });
};

exports.deleteCollege = async (id) => {
  return await College.findByIdAndDelete(id);
};
