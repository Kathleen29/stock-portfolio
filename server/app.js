const express = require('express');
const routes = require('./routes');

const app = express();

// serves index.html
app.use(express.static(__dirname + '/../client/public'));
// configures app to use routes
app.use('/', routes);

module.exports = app;
