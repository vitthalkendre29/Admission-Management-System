// routes/enquiry.js
const express = require('express');
const router = express.Router();
const Enquiry = require('../models/Enquiry');

// Generate Enquiry Number
function generateEnquiryNo() {
  const year = new Date().getFullYear();
  const random = Math.floor(100000 + Math.random() * 900000);
  return `ENQ${year}${random}`;
}

// Create Enquiry - Step 1
router.post('/create', async (req, res) => {
  try {
    const enquiryNo = generateEnquiryNo();

    // console.log(enquiryNo,req.body);
    
    
    const enquiry = new Enquiry({
      enquiryNo,
      ...req.body
    });
    
    await enquiry.save();
    res.json({ success: true, enquiryNo, message: 'Enquiry created successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get Enquiry by Number
router.get('/:enquiryNo', async (req, res) => {
  try {
    const enquiry = await Enquiry.findOne({ enquiryNo: req.params.enquiryNo });
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }
    res.json({ success: true, data: enquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;







