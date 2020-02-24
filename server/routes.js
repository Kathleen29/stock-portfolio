const router = require('express').Router();
const axios = require('axios');
const API_KEY = require('../config.js').token;

router.get('/', (req, res) => {
	res.sendStatus(200);
});

module.exports = router;
