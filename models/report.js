const { DataTypes, Op } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const axios = require('axios');

const Report = sequelize.define('Report', {
  location: {
    type: DataTypes.GEOMETRY('POINT'),
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  submittedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  approvedAt: {
    type: DataTypes.DATE,
  },
});

// Define associations
Report.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(Report, { foreignKey: 'userId' });

// Additional methods
Report.prototype.updateStatus = async function (status) {
  this.status = status;
  await this.save();
};

Report.prototype.updateApprovedAt = async function (approvedAt) {
  this.approvedAt = approvedAt;
  await this.save();
};

Report.getReportsInRadius = async function (latitude, longitude, radius) {
  const apiKey = '4ae30ec13c65cf7d994f133534d253e7';
  const apiUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);
    const { name, country } = response.data[0];
    const nearestCity = `${name}, ${country}`;

    const reports = await Report.findAll({
      where: {
        location: {
          [Op.within]: sequelize.literal(`ST_DWithin(location, ST_MakePoint(${longitude}, ${latitude})::geography, ${radius * 1000})`),
        },
      },
    });

    const reportsWithCity = reports.map(report => {
      const reportData = report.toJSON();
      return { ...reportData, nearestCity };
    });

    return reportsWithCity;
  } catch (error) {
    console.error('Error retrieving reports in radius:', error);
    return null;
  }
};

module.exports = Report;
