// routes/payment.js
const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const Application = require('../models/Application');

// Generate Receipt Number
function generateReceiptNo() {
  const year = new Date().getFullYear();
  const random = Math.floor(100000 + Math.random() * 900000);
  return `REC${year}${random}`;
}

// Process Payment - Step 4
router.post('/process', async (req, res) => {
  try {
    const { enquiryNo, amount, paymentMode } = req.body;
    
    const application = await Application.findOne({ enquiryNo });
    if (!application || application.status !== 'Approved') {
      return res.status(400).json({ success: false, message: 'Application not approved yet' });
    }
    
    const transactionId = `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`;
    const receiptNo = generateReceiptNo();
    
    const payment = new Payment({
      enquiryNo,
      studentId: application.studentId,
      amount,
      paymentMode,
      transactionId,
      receiptNo,
      status: 'Completed',
      admissionKitIssued: true
    });
    
    await payment.save();
    
    res.json({ 
      success: true, 
      message: 'Payment successful', 
      receiptNo,
      studentId: application.studentId,
      data: payment 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get Payment Receipt
router.get('/receipt/:receiptNo', async (req, res) => {
  try {
    const payment = await Payment.findOne({ receiptNo: req.params.receiptNo });
    if (!payment) {
      return res.status(404).json({ success: false, message: 'Receipt not found' });
    }
    res.json({ success: true, data: payment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;