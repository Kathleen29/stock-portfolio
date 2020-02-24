const app = require('./app');
const port = process.env.PORT || 3000;

// starting the server
app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
