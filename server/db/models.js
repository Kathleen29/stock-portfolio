const db  = require('./index.js');
const hashUtils = require('./hashUtils');
const Portfolio = require('./models/Portfolio');
const Transactions = require('./models/Transactions');
const Users = require('./models/Users');

// creates portfolio, transactions, and user tables if not exists
// db.sync()
// 	.then(() => console.log('Tables created!'))
// 	.catch(err => console.log(err));

// database entry for a transaction
const buyStock = (data) => {
	return Transactions.create({
		trans_type: 'buy',
		ticker: data.ticker,
		shares: data.shares,
		price: data.quote,
		total: data.shares * data.quote
	});
};

// database entry for a portfolio
const addToPortfolio = (data) => {
	return Portfolio.create({
		ticker: data.ticker,
		shares: data.shares
	});
};

// updates a user's balance
const updateBalance =  (data) => {
	return Users.findOne({ where: { user_id: data.id } })
		.then(user => {
			let newBal = user.balance - (data.shares * data.quote);
			return user.update({ balance: newBal })
		});
};

// creates entry for a new user
const createUser = (data) => {
	let newSalt = hashUtils.createSalt();
	return Users.create({
		email: data.email,
		hash: hashUtils.createHash(data.password, newSalt),
		salt:	newSalt,
		cash_in: 5000.00,
		balance: 5000.00
	});
};

// returns user entry for a given email
const verifyLogin = async(data) => {
	return Users.findOne({ where: { email: data.email } });
};

module.exports = {
	buyStock,
	addToPortfolio,
	updateBalance,
	createUser,
	verifyLogin
};