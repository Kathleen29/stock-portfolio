const mysql = require('mysql');
const Sequelize = require('sequelize');

// connects to stock_portfolio database
const db = new Sequelize('stock_portfolio', 'root', '', {
  dialect: 'mysql',
  host: 'localhost'
});

db.authenticate()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.log('Unable to connect to the database:', err));

module.exports = db;
