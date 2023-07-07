const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  database: 'projectmaster',
  username: 'amarildoprendi',
  password: 'rildo123',
  host: 'localhost',
  port: '5432',
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = sequelize;