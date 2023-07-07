// controllers/reportController.js

const Report = require('../models/Report');
const User = require('../models/User');

// Function to retrieve the list of reports for a regular user
const getUserReports = (req, res) => {
  const userId = req.user.id; // Assuming the user ID is stored in the request object after authentication
  // Logic to fetch and return the list of reports for the user
  const userReports = Report.find({ userId });
  res.json(userReports);
};

// Function to retrieve a report by ID
const getReportById = (req, res) => {
  const reportId = req.params.id;
  // Logic to fetch and return a report by ID
  const report = Report.findById(reportId);
  if (!report) {
    return res.status(404).json({ error: 'Report not found' });
  }
  res.json(report);
};

// Function to create a new report
const createReport = (req, res) => {
  const { coordinates, type, description } = req.body;
  const userId = req.user.id; // Assuming the user ID is stored in the request object after authentication
  // Logic to create a new report
  const newReport = Report.create({
    coordinates,
    type,
    description,
    userId,
    status: 'pending',
  });
  res.status(201).json(newReport);
};

// Function to update a report
const updateReport = (req, res) => {
  const reportId = req.params.id;
  const { coordinates, type, description } = req.body;
  // Logic to update a report
  const report = Report.findByIdAndUpdate(
    reportId,
    { coordinates, type, description, status: 'pending' },
    { new: true }
  );
  if (!report) {
    return res.status(404).json({ error: 'Report not found' });
  }
  res.json(report);
};

// Function to delete a report
const deleteReport = (req, res) => {
  const reportId = req.params.id;
  // Logic to delete a report
  const deletedReport = Report.findByIdAndDelete(reportId);
  if (!deletedReport) {
    return res.status(404).json({ error: 'Report not found' });
  }
  res.json({ message: 'Report deleted successfully' });
};

// Function to retrieve the list of pending reports for an admin user
const getPendingReports = (req, res) => {
  // Logic to fetch and return the list of pending reports
  const pendingReports = Report.find({ status: 'pending' });
  res.json(pendingReports);
};

// Function to approve reports in bulk
const approveReports = (req, res) => {
  const reportIds = req.body.reportIds;
  // Logic to approve reports
  Report.updateMany({ _id: { $in: reportIds } }, { status: 'approved' });
  res.json({ message: 'Reports approved successfully' });
};

// Function to reject reports in bulk
const rejectReports = (req, res) => {
  const reportIds = req.body.reportIds;
  // Logic to reject reports
  Report.updateMany({ _id: { $in: reportIds } }, { status: 'rejected' });
  res.json({ message: 'Reports rejected successfully' });
};

// Function to retrieve the list of users with the highest number of reports
const getUsersWithHighestReports = (req, res) => {
  // Logic to fetch and return the list of users with the highest number of reports
  const usersWithHighestReports = User.aggregate([
    { $lookup: { from: 'reports', localField: '_id', foreignField: 'userId', as: 'reports' } },
    { $project: { _id: 1, username: 1, reportCount: { $size: '$reports' } } },
    { $sort: { reportCount: -1 } },
    { $limit: 10 },
  ]);
  res.json(usersWithHighestReports);
};

module.exports = {
  getUserReports,
  getReportById,
  createReport,
  updateReport,
  deleteReport,
  getPendingReports,
  approveReports,
  rejectReports,
  getUsersWithHighestReports,
};
