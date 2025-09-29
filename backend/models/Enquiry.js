const mongoose = require('mongoose');

const EnquirySchema = new mongoose.Schema({
  enquiryNo: {
    type: String,
    required: true,
    unique: true
  },
  surname: { type: String, required: true },
  name: { type: String, required: true },
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  academicYear: { type: String, required: true },
  stream: { type: String, required: true },
  course: { type: String, required: true },
  class: { type: String, required: true },
  branch: { type: String, required: true },
  instituteCode: { type: String, required: true },
  campus: { type: String, required: true },
  admissionType: { type: String, enum: ['Government', 'Institute Level'], required: true },
  panCardNo: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Enquiry', EnquirySchema);