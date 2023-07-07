// models/Report.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

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

Report.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(Report, { foreignKey: 'userId' });

module.exports = Report;