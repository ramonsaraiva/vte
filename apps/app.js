/*
 * app.js
 *
 * teh main script
 *
 */

var path = require('path');
var Express = require('express');
var bodyParser = require('body-parser');

var app = new Express();

app.use('/', Express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
//app.use(body_parser.json({ type: 'application/vnd.api+json' }));

require('../routes')(app);

app.listen(3000);
