const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  enquiryNo: { type: String, required: true },
  studentId: { type: String, required: true },
  amount: { type: Number, required: true },
  paymentMode: { type: String, required: true },
  transactionId: { type: String, required: true, unique: true },
  status: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
  receiptNo: { type: String, unique: true },
  admissionKitIssued: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', PaymentSchema);