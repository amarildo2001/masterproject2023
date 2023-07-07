const express = require('express');
const jwtMiddleware = require('./jwtMiddleware');
const reportController = require('./controllers/reportController');
const authRoutes = require('./routes/auth');
const reportsRoutes = require('./routes/reports');
const statisticsRoutes = require('./routes/statistics');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get('/protected-route', jwtMiddleware, (req, res) => {
  // route logic here
});

// Report routes
app.get('/routes/reports', reportController.getAllReports);
app.post('/routes/reports', reportController.createReport);
app.put('/routes/reports/:id', reportController.updateReport);
app.delete('/routes/reports/:id', reportController.deleteReport);

// Authentication routes
app.use('/routes/auth', authRoutes);

// Reports routes
app.use('/routes/reports', reportsRoutes);

// Statistics routes
app.use('/routes/statistics', statisticsRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
