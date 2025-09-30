// routes/student.js
const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Application = require('../models/Application');
const Enquiry = require('../models/Enquiry');
const Payment = require('../models/Payment');

// Student Login - Step 5
router.post('/login', async (req, res) => {
  try {
    const { studentId, password } = req.body;
    
    const application = await Application.findOne({ studentId });
    if (!application) {
      return res.status(404).json({ success: false, message: 'Invalid credentials' });
    }
    
    const enquiry = await Enquiry.findOne({ enquiryNo: application.enquiryNo });
    
    // Password is DOB in format DDMMYYYY
    const dob = new Date(enquiry.dob);
    const day = String(dob.getDate()).padStart(2, '0');
    const month = String(dob.getMonth() + 1).padStart(2, '0');
    const year = dob.getFullYear();
    const dobPassword = `${day}${month}${year}`;
    
    if (password !== dobPassword) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
    // Create or get student record
    let student = await Student.findOne({ studentId });
    if (!student) {
      student = new Student({
        studentId,
        enquiryNo: application.enquiryNo,
        password: dobPassword,
        personalDetails: enquiry._id,
        applicationDetails: application._id
      });
      await student.save();
    }
    
    const payment = await Payment.findOne({ studentId });
    
    res.json({ 
      success: true, 
      message: 'Login successful',
      data: {
        student,
        enquiry,
        application,
        payment
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Generate Admission Form - Step 6
router.post('/generate-admission-form', async (req, res) => {
  try {
    const { studentId } = req.body;
    
    const student = await Student.findOne({ studentId })
      .populate('personalDetails')
      .populate('applicationDetails');
    
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    
    const payment = await Payment.findOne({ studentId });
    if (!payment || !payment.admissionKitIssued) {
      return res.status(400).json({ success: false, message: 'Payment not completed' });
    }
    
    student.admissionFormGenerated = true;
    student.admissionFormGeneratedAt = new Date();
    await student.save();
    
    res.json({ 
      success: true, 
      message: 'Admission form generated successfully',
      data: student
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get Student Dashboard
router.get('/dashboard/:studentId', async (req, res) => {
  try {
    const student = await Student.findOne({ studentId: req.params.studentId })
      .populate('personalDetails')
      .populate('applicationDetails')
      .populate('paymentDetails');
    
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    
    res.json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;