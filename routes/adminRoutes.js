const express = require('express');
const router = express.Router();

// Import the admin controller
const adminController = require('../controllers/adminController');

// Define the routes for admin operations
router.put('/reports/approve/:reportId', adminController.approveReport);
router.put('/reports/reject/:reportId', adminController.rejectReport);
router.delete('/reports/delete/:reportId', adminController.deleteReport);
router.get('/statistics/users/highestReports', adminController.getUsersWithHighestReports);

module.exports = router;