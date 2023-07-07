const express = require('express');

const router = express.Router();
const reportController = require('../controllers/reportController');

// Statistics routes
router.get('/users/highest-reports', reportController.getUsersWithHighestReports);
router.get('/users/highest-approved-reports', reportController.getUsersWithHighestApprovedReports);
router.get('/users/highest-rejected-reports', reportController.getUsersWithHighestRejectedReports);

module.exports = router;
