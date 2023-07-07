const express = require('express');
const router = express.Router();


// Import the report controller
const reportController = require('../controllers/reportController');

// Regular user routes
router.get('/reports', reportController.getUserReports);
router.get('/reports/:id', reportController.getReportById);
router.post('/reports', reportController.createReport);
router.put('/reports/:id', reportController.updateReport);
router.delete('/reports/:id', reportController.deleteReport);

// Admin user routes
router.get('/reports/pending', reportController.getPendingReports);
router.put('/reports/approve', reportController.approveReports);
router.put('/reports/reject', reportController.rejectReports);

// Statistics routes
router.get('/statistics/users/highest-reports', reportController.getUsersWithHighestReports);
router.get('/statistics/users/highest-approved-reports', reportController.getUsersWithHighestApprovedReports);
router.get('/statistics/users/highest-rejected-reports', reportController.getUsersWithHighestRejectedReports);

module.exports = router;
