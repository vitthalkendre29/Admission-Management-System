const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  enquiryNo: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  
  // Educational Details
  tenthSchool: { type: String, required: true },
  tenthBoard: { type: String, required: true },
  tenthPercentage: { type: Number, required: true },
  tenthYearOfPassing: { type: String, required: true },
  
  twelfthSchool: { type: String },
  twelfthBoard: { type: String },
  twelfthPercentage: { type: Number },
  twelfthYearOfPassing: { type: String },
  
  graduationCollege: { type: String },
  graduationUniversity: { type: String },
  graduationPercentage: { type: Number },
  graduationYearOfPassing: { type: String },
  
  // Documents
  documents: {
    tenthMarksheet: { type: String },
    twelfthMarksheet: { type: String },
    graduationMarksheet: { type: String },
    photo: { type: String },
    signature: { type: String }
  },
  
  status: { 
    type: String, 
    enum: ['Pending', 'Approved', 'Rejected'], 
    default: 'Pending' 
  },
  
  studentId: { type: String },
  approvalDate: { type: Date },
  rejectionReason: { type: String },
  
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', ApplicationSchema);