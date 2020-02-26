const router = require('express').Router();
const axios = require('axios');
const API_KEY = require('../config.js').token;
const db = require('./db/index.js');
const Transactions = require('./db/models/transactions')

router.get('/', (req, res) => {
	res.sendStatus(200);
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
router.post('/:transaction', async (req, res) => {
	try {
		let trans = await Transactions.create({
			trans_type: req.params.transaction,
			ticker: req.body.ticker,
			shares: req.body.shares,
			price: req.body.quote,
			total: req.body.shares * req.body.quote,
		});
		res.sendStatus(201);
	}
	catch(err) {
		res.sendStatus(404);
	}
});

module.exports = router;
