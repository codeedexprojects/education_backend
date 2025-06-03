const mongoose = require('mongoose')
const College = require('./collegeModel');
const Program = require('./programModel');
const Facility = require('./facilityModel');
const Seat = require('../Seat/seatModel')


exports.createCollege = async (collegeData) => {

  const programs = collegeData.programs || [];

    // Create college without seat references
    const programsForCollege = programs.map(({ seatCount, ...rest }) => rest);
    const college = await College.create({
      ...collegeData,
      programs: programsForCollege,
    });

    const collegeId = college._id;

    // Create seat documents
    const seatDocs = await Promise.all(
      programs.map(async (program) => {
        const seat = await Seat.create({
          collegeId: collegeId,
          programId: program.program,
          totalSeats: program.seatCount,
          availableSeats: program.seatCount,
          year:program.year,
          reservedSeats: 0,
        });

        return {
          programId: program.program,
          seatId: seat._id,
        };
      })
    );

    // Attach seat._id to the matching program entry in college.programs
    const updatedPrograms = college.programs.map((prog) => {
      const found = seatDocs.find((s) => s.programId.toString() === prog.program.toString());
      return found ? { ...prog.toObject(), seat: found.seatId } : prog;
    });

    // Update college with seat references
    college.programs = updatedPrograms;
    await college.save();
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
  const college = await College.findByIdAndDelete(id);
  if (!college) return null;

  await Program.deleteMany({ collegeId: id });
  await Facility.deleteMany({ collegeId: id });
  await Seat.deleteMany({ collegeId: id });

  return college;
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
