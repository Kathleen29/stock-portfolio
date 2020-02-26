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
  }
});

module.exports = Users;
