const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  enquiryNo: { type: String, required: true },
  password: { type: String, required: true }, // DOB in format DDMMYYYY
  personalDetails: { type: mongoose.Schema.Types.ObjectId, ref: 'Enquiry' },
  applicationDetails: { type: mongoose.Schema.Types.ObjectId, ref: 'Application' },
  paymentDetails: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' },
  admissionFormGenerated: { type: Boolean, default: false },
  admissionFormGeneratedAt: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Student', StudentSchema);