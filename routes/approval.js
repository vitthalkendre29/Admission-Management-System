// routes/approval.js
const express = require('express');
const router = express.Router();
const Application = require('../models/Application');

// Generate Student ID
function generateStudentId() {
  const year = new Date().getFullYear();
  const random = Math.floor(10000 + Math.random() * 90000);
  return `STU${year}${random}`;
}

// Approve Application - Step 3
router.post('/approve', async (req, res) => {
  try {
    const { enquiryNo } = req.body;
    
    const application = await Application.findOne({ enquiryNo });
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }
    
    const studentId = generateStudentId();
    
    application.status = 'Approved';
    application.studentId = studentId;
    application.approvalDate = new Date();
    
    await application.save();
    
    res.json({ 
      success: true, 
      message: 'Application approved successfully', 
      studentId,
      data: application 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Reject Application
router.post('/reject', async (req, res) => {
  try {
    const { enquiryNo, reason } = req.body;
    
    const application = await Application.findOne({ enquiryNo });
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }
    
    application.status = 'Rejected';
    application.rejectionReason = reason;
    
    await application.save();
    
    res.json({ success: true, message: 'Application rejected', data: application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;