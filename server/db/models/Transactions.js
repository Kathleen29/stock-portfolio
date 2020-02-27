const db = require('../index.js');
const Sequelize = require('sequelize');
const Users = require('./Users.js');

// defines table that stores all user transactions
const Transactions = db.define('transactions', {
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
    type: Sequelize.DECIMAL(10,2),
    allowNull: false
  },
  total: {
    type: Sequelize.DECIMAL(10,2),
    allowNull: false
  }
});

// adds user id as the foreign key in the transactions table
Transactions.belongsTo(Users, { foreignKey: 'user_id' });

module.exports = Transactions;
