const Student = require('../Admission/studentModel');
const PDFDocument = require('pdfkit');
const Program = require('../Programs/programModel')
const crypto = require('crypto');
const StudentCode = require('./studentCodeModel')

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

exports.generateReceiptPDF = async (studentId) => {
  const student = await Student.findById(studentId)
    .populate('appliedPrograms.collegeId', 'name')  
    .populate('appliedPrograms.programId', 'name'); 

  if (!student) throw new Error('Student not found');

  const doc = new PDFDocument();
  const buffers = [];

  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => {});

  // Title
  doc.fontSize(18).text('Admission Receipt', { align: 'center' });
  doc.moveDown();

  // Student Info
  doc.fontSize(12).text(`Name: ${student.firstName} ${student.lastName}`);
  doc.text(`Email: ${student.email}`);
  doc.text(`Phone: ${student.phone}`);
  doc.text(`Date of Birth: ${student.dateOfBirth.toDateString()}`);
  doc.text(`Gender: ${student.gender}`);
  doc.text(`Nationality: ${student.nationality}`);
  doc.moveDown();

  // Admission Programs
  doc.fontSize(14).text('Applied Programs', { underline: true });
  doc.moveDown(0.5);

  if (student.appliedPrograms.length === 0) {
    doc.text('No applied programs found.');
  } else {
    student.appliedPrograms.forEach((app, index) => {
      doc.fontSize(12).text(`Program ${index + 1}:`);
      doc.text(`  College: ${app.collegeId?.name || 'N/A'}`);
      doc.text(`  Program: ${app.programId?.name || 'N/A'}`);
      doc.text(`  Academic Year: ${app.academicYear}`);
      doc.text(`  Status: ${app.status}`);
      doc.text(`  Applied Date: ${new Date(app.appliedDate).toDateString()}`);
      doc.moveDown(0.5);
    });
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