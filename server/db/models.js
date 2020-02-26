const db  = require('./index.js');
const hashUtils = require('./hashUtils');
const Portfolio = require('./models/Portfolio');
const Transactions = require('./models/Transactions');
const Users = require('./models/Users');

// creates portfolio, transactions, and user tables if not exists
db.sync()
	.then(() => console.log('Tables created!'))
	.catch(err => console.log(err));

// database entry for a transaction
const buyStock = (data) => {
	let totalCost = data.shares * data.quote;
	// check if a user can afford total transaction cost
	if(totalCost <= getBalance(data.user_id)) {
		return Transactions.create({
			trans_type: 'buy',
			ticker: data.ticker,
			shares: data.shares,
			price: data.quote,
			total: totalCost,
			user_id: data.user_id
		});
	} else {
		return false;
	}
};

// database entry for a portfolio
const addToPortfolio = (data) => {
	// check if user already has stock
	return Portfolio.findOne( { where: {
		user_id: data.user_id,
		ticker: data.ticker
	}})
		.then(current => {
			// if user does not have stock, create new entry
			if(!current) {
				return Portfolio.create({
					ticker: data.ticker,
					shares: data.shares,
					user_id: data.user_id
				});
			} else {
				// if user already has stock, update number of shares
				return current.update({ shares: current.shares + data.shares });
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
		email: data.email,
		hash: hashUtils.createHash(data.password, newSalt),
		salt:	newSalt,
		cash_in: 5000.00,
		balance: 5000.00
	});
};

// looks up an email in the users table
const verifyEmail = (email) => {
	return Users.findOne({ where: { email: email } });
};

// looks up portfolio given a user id
const getPortfolio = (userId) => {
	return Portfolio.findOne({ where: { user_id: userId }});
};

const getCashIn = (userId) => {
	return User.findOne({ where: { user_id: userId } });
};

const getBalance = (userId) => {
	return Users.findOne({ where: { user_id: userId} });
};

const getTransactionTotal = (userId) => {
	return Transactions.findAll({
		attributes: [
			[sequelize.fn('sum', sequelize.col('total'))]
		],
		where: {
			user_id: userId
		}
	})
};

module.exports = {
	buyStock,
	addToPortfolio,
	updateBalance,
	createUser,
	verifyEmail
};