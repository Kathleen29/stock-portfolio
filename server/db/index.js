const mysql = require('mysql');
const Sequelize = require('sequelize');

// 'mysql://b0404b70907b7e:f6cb7138@us-cdbr-iron-east-04.cleardb.net/heroku_e319ed1fe746801?reconnect=true'

// connects to stock_portfolio database
const db = new Sequelize('stock_portfolio', 'root', '', {
  dialect: 'mysql',
  host: 'mysql://b0404b70907b7e:f6cb7138@us-cdbr-iron-east-04.cleardb.net/heroku_e319ed1fe746801?reconnect=true  '
});

db.authenticate()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.log('Unable to connect to the database:', err));

module.exports = db;
