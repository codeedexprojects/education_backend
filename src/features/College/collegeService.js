const mongoose = require('mongoose')
const College = require('./CollegeModel');
const Program = require('./programModel');
const Facility = require('./facilityModel');


exports.createCollege = async (data) => {
  const { programs, facilities, ...collegeData } = data;

  const college = await College.create(collegeData);

  if (Array.isArray(programs) && programs.length) {
    const programsWithCollege = programs.map(p => ({ ...p, collegeId: college._id }));
    await Program.insertMany(programsWithCollege);
  }

  if (Array.isArray(facilities) && facilities.length) {
    const facilitiesWithCollege = facilities.map(f => ({ ...f, collegeId: college._id }));
    await Facility.insertMany(facilitiesWithCollege);
  }

  return college;
};

exports.getAllColleges = async (filters = {}) => {
  return College.find(filters);
};

exports.getCollegeById = async (id) => {
  return await College.findById(id);
};

exports.updateCollege = async (id, updateData) => {
  const { programs, facilities, ...collegeData } = updateData;

  const updatedCollege = await College.findByIdAndUpdate(id, collegeData, { new: true });
  if (!updatedCollege) return null;


  if (Array.isArray(programs)) {
    for (const program of programs) {
      if (program._id && mongoose.Types.ObjectId.isValid(program._id)) {

        await Program.findOneAndUpdate(
          { _id: program._id, collegeId: id },
          program,
          { new: true }
        );
      } else {

        await Program.create({ ...program, collegeId: id });
      }
    }
  }


  if (Array.isArray(facilities)) {
    for (const facility of facilities) {
      if (facility._id && mongoose.Types.ObjectId.isValid(facility._id)) {
        await Facility.findOneAndUpdate(
          { _id: facility._id, collegeId: id },
          facility,
          { new: true }
        );
      } else {
        await Facility.create({ ...facility, collegeId: id });
      }
    }
  }

  return updatedCollege;
};

exports.deleteCollege = async (id) => {
  return await College.findByIdAndDelete(id);
};
