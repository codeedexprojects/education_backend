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

exports.getAllStudents = async (req, res) => {
  const { collegeType, program, applicationStatus, paymentStatus } = req.query;
  
  const filters = {
    collegeType,
    program,
    applicationStatus,
    paymentStatus
  };

  const students = await admissionService.getAllStudents(filters);
  return sendResponse(res, 200, 'All students retrieved', students);
};


exports.getStudentById = async (req, res, next) => {
  const student = await admissionService.getStudentById(req.params.id);
  if (!student) {
    return sendResponse(res, 404, 'Student not found');
  }
  return sendResponse(res, 200, 'Student retrieved', student);
};

exports.updateStudent = async (req, res, next) => {
  const files = req.files;

  const updatedData = {
    ...req.body,
    documents: {
      tenthMarksheet: files?.tenthMarksheet?.[0]?.path,
      twelfthMarksheet: files?.twelfthMarksheet?.[0]?.path,
      aadharCard: files?.aadharCard?.[0]?.path,
      photo: files?.photo?.[0]?.path,
      additionalDoc: files?.additionalDoc?.[0]?.path,
    },
  };

  const updated = await admissionService.updateStudent(req.params.id, updatedData);
  if (!updated) {
    return sendResponse(res, 404, 'Student not found');
  }
  return sendResponse(res, 200, 'Student updated successfully', updated);
};

exports.deleteStudent = async (req, res, next) => {
  const deleted = await admissionService.deleteStudent(req.params.id);
  if (!deleted) {
    return sendResponse(res, 404, 'Student not found or already deleted');
  }
  return sendResponse(res, 200, 'Student deleted successfully', deleted);
};



exports.generateAdmissionReceipt = async (req, res, next) => {
  const studentId = req.params.studentId;
  const pdfBuffer = await admissionService.generateReceiptPDF(studentId);

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=admission_receipt_${studentId}.pdf`);
  res.send(pdfBuffer);
};