const express = require('express');

const router = express.Router();
const reportController = require('../controllers/reportController');

// Statistics routes
router.get('/users/highest-reports', reportController.getUsersWithHighestReports);



module.exports = router;
