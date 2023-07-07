const express = require('express');
const jwtMiddleware = require('./jwtMiddleware');
const reportController = require('./controllers/reportController');
const authController = require('./routes/auth');
const reportsRoutes = require('./routes/reports');
const statisticsRoutes = require('./routes/statistics');
const adminRoutes = require('./routes/adminRoutes');
const userController = require('./controllers/userController');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get('/protected-route', jwtMiddleware, (req, res) => {
  // route logic here
});

// Report routes
app.get('/routes/reports', reportController.getUserReports);
app.post('/routes/reports', reportController.createReport);
app.put('/routes/reports/:id', reportController.updateReport);
app.delete('/routes/reports/:id', reportController.deleteReport);

app.get('/users', userController.getUsers);
app.get('/users/:id', userController.getUserById);
app.post('/users', userController.createUser);
// ...

// Report routes
app.get('/reports', reportController.getUserReports);
app.get('/reports/:id', reportController.getReportById);
app.post('/reports', reportController.createReport);
// ...


// Reports routes
app.use('/routes/reports', reportsRoutes);

// Statistics routes
app.use('/routes/statistics', statisticsRoutes);

//Admin
app.use('/admin', adminRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
