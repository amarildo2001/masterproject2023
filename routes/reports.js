const express = require('express');
const router = express.Router();

// Import the report controller
const reportController = require('../controllers/reportController');

// Regular user routes
router.get('/', reportController.getUserReports);
router.get('/:id', reportController.getReportById);
router.post('/', reportController.createReport);
router.put('/:id', reportController.updateReport);
router.delete('/:id', reportController.deleteReport);

module.exports = router;
