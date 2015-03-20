/*
 * log.js
 * arquivo que vai lidar com logs e erros das requests
 */

module.exports = function(app) {

	app.use(function(req, res, next) {
		console.log(req.method, req.url);
		next();
	});

	app.use(function(err, req, res, next) {
		var e = new Error(err);
		next(e);
	});
}
