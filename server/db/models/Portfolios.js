const db = require('../index.js');
const Sequelize = require('sequelize');
const Users = require('./Users.js');

// defines table that stores data for user portfolios
const Portfolios = db.define('portfolios', {
  ticker: {
    type: Sequelize.STRING(32),
    allowNull: false
  },
  shares: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

// adds user id as the foreign key in the transactions table
Portfolios.belongsTo(Users, { foreignKey: 'user_id' });

module.exports = Portfolios;
