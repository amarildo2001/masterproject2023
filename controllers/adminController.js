const Report = require('../models/report');
const User = require('../models/user');

// Controller method to approve a report
exports.approveReport = async (req, res) => {
  const { reportId } = req.params;

  try {
    const report = await Report.findById(reportId);
    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }

    report.status = 'approved';
    report.timestampApproval = new Date();
    await report.save();

    return res.status(200).json({ message: 'Report approved successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller method to reject a report
exports.rejectReport = async (req, res) => {
  const { reportId } = req.params;

  try {
    const report = await Report.findById(reportId);
    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }

    report.status = 'rejected';
    report.timestampRejection = new Date();
    await report.save();

    return res.status(200).json({ message: 'Report rejected successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller method to delete a report
exports.deleteReport = async (req, res) => {
  const { reportId } = req.params;

  try {
    await Report.findByIdAndDelete(reportId);
    return res.status(200).json({ message: 'Report deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller method to get users with the highest number of reports
exports.getUsersWithHighestReports = async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $lookup: {
          from: 'reports',
          localField: '_id',
          foreignField: 'userId',
          as: 'reports',
        },
      },
      {
        $project: {
          _id: 1,
          username: 1,
          reportCount: { $size: '$reports' },
        },
      },
      { $sort: { reportCount: -1 } },
    ]).limit(10);

    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

