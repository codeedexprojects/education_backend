const admissionService = require('./admissionService');
const { sendResponse } = require('../../utils/responseHelper');

exports.createStudentAdmission = async (req, res, next) => {
  const student = await admissionService.createStudent(req.body);
  return sendResponse(res, 201, 'Student admission created successfully', student);
};

exports.generateAdmissionReceipt = async (req, res, next) => {
  const studentId = req.params.studentId;
  const pdfBuffer = await admissionService.generateReceiptPDF(studentId);

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=admission_receipt_${studentId}.pdf`);
  res.send(pdfBuffer);
};