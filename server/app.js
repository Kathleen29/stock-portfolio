const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

// serves index.html
app.use(express.static(__dirname + '/../client/public'));
// configures request content-type json
app.use(bodyParser.json());
// configures app to use routes
app.use('/', routes);

module.exports = app;
