// routes/application.js
const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const Enquiry = require('../models/Enquiry');

// Verify Enquiry and Mobile - Step 2 Entry
router.post('/verify', async (req, res) => {
  try {
    const { enquiryNo, mobile } = req.body;
    
    const enquiry = await Enquiry.findOne({ enquiryNo, mobile });
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Invalid Enquiry Number or Mobile Number' });
    }
    
    // Check if application already exists
    const existingApp = await Application.findOne({ enquiryNo });
    if (existingApp) {
      return res.json({ success: true, message: 'Application already exists', data: existingApp });
    }
    
    res.json({ success: true, message: 'Verification successful', data: enquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Submit Application - Step 2
router.post('/submit', async (req, res) => {
  try {
    const application = new Application(req.body);
    await application.save();
    
    res.json({ success: true, message: 'Application submitted successfully. Status: Pending', data: application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get Application Status
router.get('/status/:enquiryNo', async (req, res) => {
  try {
    const application = await Application.findOne({ enquiryNo: req.params.enquiryNo });
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }
    res.json({ success: true, data: application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;