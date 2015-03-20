/*
 * index.js
 * controller do modulo de routes
 */

module.exports = function(app) {

	var models = require('../models');

	require('./defaults/log.js')(app);
	require('./defaults/auth.js')(app, models);

	//vira um loop
	//require('../modules/*')(app, models);

	require('./defaults/crud.js')(app, models);
	require('./defaults/filter.js')(app, models);

	app.get('*', function(req, res) {
		res.sendStatus(404);
	});
}
