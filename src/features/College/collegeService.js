const mongoose = require('mongoose')
const College = require('./CollegeModel');
const Program = require('./programModel');
const Facility = require('./facilityModel');


exports.createCollege = async (collegeData) => {

  const college = await College.create(collegeData);
  return college;
};

exports.getAllColleges = async (filters = {}) => {
  return College.find(filters);
};

exports.getCollegeById = async (id) => {
  return await College.findById(id);
};

exports.updateCollege = async (id, updateData) => {


  const updatedCollege = await College.findByIdAndUpdate(id, updateData, { new: true });
  
  if (!updatedCollege) return null;
  return updatedCollege;
};


exports.deleteCollege = async (id) => {
  return await College.findByIdAndDelete(id);
};

exports.getCollegesByIds = async (collegeIds) => {
  const colleges = await College.find({ _id: { $in: collegeIds } });

  const collegeData = await Promise.all(
    colleges.map(async (college) => {
      const facilities = await Facility.find({ collegeId: college._id });
      const programs = await Program.find({ collegeId: college._id });

      return {
        ...college.toObject(),
        facilities,
        programs,
      };
    })
  );

  return collegeData;
};