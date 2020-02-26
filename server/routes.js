const API_KEY = require('../config.js').token;
const axios = require('axios');
const hashUtils = require('./db/hashUtils');
const models = require('./db/models');
const router = require('express').Router();

// return a user's portfolio if signed in
router.get('/portfolio/:user', async (req, res) => {
	try {
		let portfolio = await models.getPortfolio(req.params.user);
		res.send( { portfolio: portfolio });
	}
	catch(err) {
		console.log(err)
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
		let totalCost = req.body.shares * req.body.quote;
		if(models.checkBalance(req.body.user_id, totalCost)) {
			// updates transactions, portfolio, and user's balance
			let result = [
				await models.buyStock(req.body, totalCost),
				await models.addToPortfolio(req.body),
				await models.updateBalance(req.body)
			];
			res.sendStatus(201);
		}
		else {
			res.sendStatus(400);
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
		let result = await models.createUser(req.body);
		// if not inserted into the db, email already exists
		if(!result) {
			res.send('Email already exists');
		}
		res.sendStatus(201);
	}
	catch(err) {
		console.log(err);
		res.sendStatus(404);
	}
});

module.exports = router;
