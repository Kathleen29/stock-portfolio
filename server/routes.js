const router = require('express').Router();
const axios = require('axios');
const API_KEY = require('../config.js').token;

router.get('/', (req, res) => {
	res.sendStatus(200);
});

// fetches quote for a given symbol from IEX API
router.get('/buy/:ticker/:qty', async(req, res) => {
	try {
		let quote = await axios.get(`https://cloud.iexapis.com/stable/stock/${req.params.ticker}/quote?token=${API_KEY}`);
		res.send({
			ticker: req.params.ticker,
			shares: req.params.qty,
			price: quote.data.latestPrice
		});
	}
	catch {
		res.send(404);
	}
});

module.exports = router;
