const db = require('../index.js');
const Sequelize = require('sequelize');

// creates table to store all user transactions
const Transactions = db.define('transactions', {
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  trans_type: {
    type: Sequelize.STRING(10),
    allowNull: false
  },
  ticker: {
    type: Sequelize.STRING(32),
    allowNull: false
  },
  shares: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  total: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
});

module.exports = Transactions;
