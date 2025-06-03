const Program = require('./programModel');

exports.createProgram = (data) => {
  return Program.create(data);
};

exports.getAllPrograms = () => {
  return Program.find();
};

exports.getProgramById = (id) => {
  return Program.findById(id);
};

exports.updateProgram = (id, updateData) => {
  return Program.findByIdAndUpdate(id, updateData, { new: true });
};

exports.deleteProgram = (id) => {
  return Program.findByIdAndDelete(id);
};
