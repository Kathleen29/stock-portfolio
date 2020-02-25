const db = require('../index.js');
const Sequelize = require('sequelize');

// creates table to store data for user portfolios
const Portfolio = db.define('portfolio', {
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  ticker: {
    type: Sequelize.STRING(32),
    allowNull: false
  },
  shares: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = Portfolio;
