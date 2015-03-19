/*
 * auth.s
 * arquivo que vai lidar com as routes de authenticacao
 */

var passport = require('passport');
var Strategy = require('passport-http').BasicStrategy;

module.exports = function(app) {

	passport.use(new Strategy(function(username, password, done) {
		console.log('passport use');
		return done(null, false);
	}));

	app.use(passport.authenticate('basic', {session: false}), function(req, res, next) {
		console.log('passport authenticate');
		next();
	});

	/*
	app.get('/login', passport.authenticate('local'), function(req, res) {
		res.send(req.user);
	});

	app.get('/logout', function(req, res) {
		req.logOut();
		res.sendStatus(200);
	});
	*/
}

