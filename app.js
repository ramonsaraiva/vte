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

app.use('/', Express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
//app.use(body_parser.json({ type: 'application/vnd.api+json' }));

/*
 * acho que fica mais limpo implementar a instancia de routes e devolver pra k,
 * ai rola app.use(routes) e gg
 */
//require('./auth.js')(app);
require('./routes.js')(app);

app.listen(3000);
