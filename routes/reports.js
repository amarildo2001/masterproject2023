const express = require('express');
const router = express.Router();

// Import the report controller
const reportController = require('../controllers/reportController');
const Report = require('../models/Report');

// Regular user routes
router.get('/', reportController.getUserReports);
router.get('/:id', reportController.getReportById);
router.post('/', reportController.createReport);
router.put('/:id', reportController.updateReport);
router.delete('/:id', reportController.deleteReport);

// Retrieve reports in a 30 km radius
router.get('/radius', async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    // Call the getReportsInRadius method from the Report model to retrieve reports within a 30 km radius
    const reports = await Report.getReportsInRadius(latitude, longitude, 30);

    if (!reports) {
      return res.status(500).json({ error: 'An error occurred while retrieving reports' });
    }

    res.json(reports);
  } catch (error) {
    console.error('Error retrieving reports in radius:', error);
    res.status(500).json({ error: 'An error occurred while retrieving reports' });
  }
});

module.exports = router;
