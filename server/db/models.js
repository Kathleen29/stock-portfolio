const db  = require('./index.js');
const hashUtils = require('./hashUtils');
const Portfolios = require('./models/Portfolios');
const Transactions = require('./models/Transactions');
const Users = require('./models/Users');

// creates portfolios, transactions, and user tables if not exists
db.sync()
	.then(() => console.log('Tables created!'))
	.catch(err => console.log(err));

// database entry for a transaction
const buyStock = (data, total) => {
	return Transactions.create({
		trans_type: 'buy',
		ticker: data.ticker,
		shares: data.shares,
		price: data.quote,
		total: total,
		user_id: data.user_id
	});
};

// database entry for a portfolio
const addToPortfolio = (data) => {
	// check if user already has stock
	return Portfolios.findOne( { where: {
		user_id: data.user_id,
		ticker: data.ticker
	}})
		.then(current => {
			// if user does not have stock, create new entry
			if(!current) {
				return Portfolios.create({
					ticker: data.ticker,
					shares: data.shares,
					user_id: data.user_id
				});
			} else {
				// if user already has stock, update number of shares
				return current.update({ shares: Number(current.shares) + Number(data.shares) });
			}
		})
};

// updates a user's balance
const updateBalance =  (data) => {
	// look up user's current balance
	return Users.findOne({ where: { user_id: data.user_id } })
		.then(user => {
			// subtract transaction total from current balance and update entry
			let newBal = user.balance - (data.shares * data.quote);
			return user.update({ balance: newBal })
		});
};

// creates entry for a new user
const createUser = (data) => {
	let newSalt = hashUtils.createSalt();
	// default cash in and balance for new users is $5000.00
	return Users.create({
		name: data.name,
		email: data.email,
		hash: hashUtils.createHash(data.password, newSalt),
		salt:	newSalt,
		cash_in: 5000.00,
		balance: 5000.00
	})
	.then((user) => {
		return user.user_id;
	})
};

// looks up an email in the users table
const verifyEmail = (email) => {
	return Users.findOne({ where: { email: email } })
		.then((user) => {
			console.log('queried')
			return user;
		})
};

// looks up portfolio given a user id
const getPortfolio = (userId) => {
	return Portfolios.findAll({ where: { user_id: userId }})
		.then((res) => {
			return res;
		})
};

const checkBalance = (userId) => {
	// check if a user can afford total transaction cost{
	return Users.findOne({
		where: { user_id: userId }
	})
	.then((res) => {
		return res.balance;
	})
};

const getTransactions = (userId) => {
	return Transactions.findAll({ where: { user_id: userId }});
};

module.exports = {
	buyStock,
	addToPortfolio,
	updateBalance,
	createUser,
	verifyEmail,
	checkBalance,
	getPortfolio,
	getTransactions
};
