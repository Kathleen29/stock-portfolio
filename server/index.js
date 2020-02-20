const express = require('express');
const port = process.env.port || 3000;

const app = express();

app.use(express.static(__dirname + '/../client/public'));

app.get('/', (req, res) => {
	res.sendStatus(200);
});

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});