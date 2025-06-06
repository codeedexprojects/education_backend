const admissionService = require('./admissionService');
const { sendResponse } = require('../../utils/responseHelper');

exports.createStudentAdmission = async (req, res, next) => {
  const files = req.files;

  const studentData = {
    ...req.body,
    documents: {
      tenthMarksheet: files?.tenthMarksheet?.[0]?.path,
      twelfthMarksheet: files?.twelfthMarksheet?.[0]?.path,
      aadharCard: files?.aadharCard?.[0]?.path,
      photo: files?.photo?.[0]?.path,
      additionalDoc: files?.additionalDoc?.[0]?.path || null,
    },
  };

  const student = await admissionService.createStudent(studentData);
  return sendResponse(res, 201, 'Student admission created successfully', student);
};

exports.generateAdmissionReceipt = async (req, res, next) => {
  const studentId = req.params.studentId;
  const pdfBuffer = await admissionService.generateReceiptPDF(studentId);

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=admission_receipt_${studentId}.pdf`);
  res.send(pdfBuffer);
};