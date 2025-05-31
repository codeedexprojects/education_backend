const Student = require('../Admission/studentModel');

exports.createStudent = (studentData) => {
  const student = new Student(studentData);
  return student.save();
};