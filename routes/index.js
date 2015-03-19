/*
 * index.js
 * controller do modulo de routes
 */

module.exports = function(app) {

	require('./defaults/log.js')(app);
	require('./defaults/auth.js')(app);

	//vira um loop
	//require('../modules/*')(app);

	require('./defaults/crud.js')(app);
	//require('./filter.js')(app);

	app.get('*', function(req, res) {
		res.sendStatus(404);
	});
}
