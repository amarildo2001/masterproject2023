const express = require('express');
const router = express.Router();

// Import the authentication controller
const authController = require('../controllers/authController');

// Route for user registration
router.post('/register', authController.register);

// Route for user login
router.post('/login', authController.login);

module.exports = authController;