const API_KEY = require('../config.js').token;
const axios = require('axios');
const hashUtils = require('./db/hashUtils');
const models = require('./db/models');
const router = require('express').Router();

// return a user's portfolio from the database
router.get('/portfolio/:user', async (req, res) => {
	try {
		let portfolio = await models.getPortfolio(req.params.user);
		// get user's balance from the users table
		let balance = await models.checkBalance(req.params.user);

		// fetch the current price for each stock the user owns
		let fetchCurrPrice = async (stocks) => {
			for(let i = 0; i < stocks.length; i++) {
				let quote = await axios.get(`https://cloud.iexapis.com/stable/stock/${stocks[i].ticker}/quote?token=${API_KEY}`);

				stocks[i].dataValues['currVal'] = quote.data.latestPrice;
				// if open price, set openPrice to open, else set openPrice to the previousClose price
				stocks[i].dataValues['openPrice'] = quote.data.open || quote.data.previousClose;
			};
			return stocks;
		};

		let result = await fetchCurrPrice(portfolio);

		res.send({
			portfolio: result,
			balance: balance
		});
	}
	catch(err) {
		res.sendStatus(400);
	}
});

// return all transactions made by the user from the database
router.get('/transactions/:user', async (req, res) => {
	try {
		let userTrans = await models.getTransactions(req.params.user);
		res.send( { transactions: userTrans });
	}
	catch(err) {
		res.sendStatus(400);
	}
});

// fetches quote for a given symbol from IEX API
router.get('/quote/:ticker', async (req, res) => {
	try {
		let quote = await axios.get(`https://cloud.iexapis.com/stable/stock/${req.params.ticker}/quote?token=${API_KEY}`);
		res.send({ quote: quote.data.latestPrice });
	}
	catch {
		res.sendStatus(404);
	}
});

// adds a transaction to the database
router.post('/buy', async (req, res) => {
	try {
		// total cost is shares times the current price of the stock
		let totalCost = req.body.shares * req.body.quote;
		// check if user can afford total transaction cost
		let balance = await models.checkBalance(req.body.user_id);
		if(balance >= totalCost) {
			// updates transactions, portfolio, and user's balance
			let result = [
				await models.buyStock(req.body, totalCost),
				await models.addToPortfolio(req.body),
				await models.updateBalance(req.body)
			];
			res.send({
				result: result,
				balance: balance
			});
		} else {
			res.send(balance >= totalCost);
		}
	}
	catch(err) {
		console.log(err);
		res.sendStatus(404);
	}
});

// verifies login information provided
router.post('/login', async (req, res) => {
	try {
		// search for email in the db
		let login = await models.verifyEmail(req.body.email);
		// if email not found...
		if(!login) {
			res.sendStatus(400);
			// checks if password provided matches hashed password in db
		} else if (!hashUtils.compareHash(req.body.password, login.hash, login.salt)) {
			res.sendStatus(400);
		} else {
			res.send({ user_id: login.user_id });
		}
	}
	catch(err) {
		res.sendStatus(404);
	}
});

// creates a new user and adds to the database
router.post('/signup', async (req, res) => {
	try {
		let newUserId = await models.createUser(req.body);
		// return the newly created user id
		res.send({
			userId: newUserId
		});
	}
	catch(err) {
		// if not inserted into the db, email already exists
		res.sendStatus(400);
	}
});

module.exports = router;
