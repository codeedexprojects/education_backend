const Student = require('../Admission/studentModel');
const PDFDocument = require('pdfkit');
const Program = require('../Programs/programModel')
const crypto = require('crypto');
const StudentCode = require('./studentCodeModel')
const College = require('../College/collegeModel')

exports.createStudent = async (studentData) => {
  const student = await Student.create(studentData);

  const year = new Date().getFullYear().toString().slice(-2);
  const random = crypto.randomBytes(2).toString('hex');
  const studentCode = `S${year}-${random}`;

  await StudentCode.create({
    studentId: student._id,
    studentCode,
  });

  return student;
};


exports.getAllStudents = async (filters = {}) => {
  const query = {};


  if (filters.program && filters.program !== 'all') {
    query['appliedProgram.programId'] = filters.program;
  }

  if (filters.applicationStatus && filters.applicationStatus !== 'all') {
    query['appliedProgram.applicationStatus'] = filters.applicationStatus;
  }

  if (filters.paymentStatus && filters.paymentStatus !== 'all') {
    query['paymentStatus'] = filters.paymentStatus;
  }

  let students = await Student.find(query)
    .populate('appliedProgram.collegeId', 'name type')
    .lean();

  
  if (filters.collegeType && filters.collegeType !== 'all') {
    students = students.filter(
      (s) => s.appliedProgram.collegeId?.type === filters.collegeType      
    );
  }


  return students;
};



exports.getStudentById = async (id) => {
  return Student.findById(id)
    .populate('appliedProgram.collegeId', 'name')
};

exports.updateStudent = async (id, updateData) => {
  const student = await Student.findById(id);
  if (!student) return null;

  // Filter out null/undefined fields from updateData.documents
  const cleanUpdateDocs = {};
  if (updateData.documents) {
    Object.entries(updateData.documents).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        cleanUpdateDocs[key] = value;
      }
    });
  }

  const updatedDocs = {
    ...student.documents,
    ...cleanUpdateDocs,
  };

  updateData.documents = updatedDocs;

  const updated = await Student.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  return updated;
};


exports.deleteStudent = async (id) => {
  const deleted = await Student.findByIdAndDelete(id);
  if (!deleted) return null;

  await StudentCode.deleteOne({ studentId: id });

  return deleted;
};


exports.generateReceiptPDF = async (studentId) => {
  const student = await Student.findById(studentId)
    .populate('appliedProgram.collegeId', 'name');  

  if (!student) throw new Error('Student not found');

  const doc = new PDFDocument();
  const buffers = [];

  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => {});

  doc.fontSize(18).text('Admission Receipt', { align: 'center' });
  doc.moveDown();

  doc.fontSize(12).text(`Name: ${student.firstName} ${student.lastName}`);
  doc.text(`Email: ${student.email}`);
  doc.text(`Phone: ${student.phone}`);
  doc.text(`Date of Birth: ${student.dateOfBirth.toDateString()}`);
  doc.text(`Gender: ${student.gender}`);
  doc.text(`Nationality: ${student.nationality}`);
  doc.moveDown();

  doc.fontSize(14).text('Applied Program', { underline: true });
  doc.moveDown(0.5);

  if (!student.appliedProgram) {
    doc.text('No applied program found.');
  } else {
    const app = student.appliedProgram;

    doc.fontSize(12).text(`College: ${app.collegeId?.name || 'N/A'}`);
    doc.text(`Program Name: ${app.programName || 'N/A'}`);
    doc.text(`Academic Year: ${app.academicYear || 'N/A'}`);
    doc.text(`Mode of Study: ${app.modeOfStudy || 'N/A'}`);
    doc.text(`Application Status: ${app.applicationStatus || 'N/A'}`);
    doc.text(`Applied Date: ${app.appliedDate ? new Date(app.appliedDate).toDateString() : 'N/A'}`);
    doc.moveDown(0.5);
  }

  doc.moveDown();
  doc.fontSize(12).text('Thank you for your admission!', { align: 'center' });

  doc.end();

  return new Promise((resolve, reject) => {
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });
    doc.on('error', reject);
  });
};
