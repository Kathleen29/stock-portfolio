const db = require('../index.js');
const Sequelize = require('sequelize');

// defines table that stores user emails and passwords for log-in
const Users = db.define('users', {
  user_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  hash: {
    type: Sequelize.STRING,
    allowNull: false
  },
  salt: {
    type: Sequelize.STRING,
    allowNull: false
  },
  cash_in: {
    type: Sequelize.DECIMAL(10,2),
    allowNull: false
  },
  balance: {
    type: Sequelize.DECIMAL(10,2),
    allowNull: false
  }
});

module.exports = Users;
