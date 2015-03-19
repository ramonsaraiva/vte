/*
 * auth.s
 * arquivo que vai lidar com as routes de authenticacao
 */

var passport = require('passport');
var Strategy = require('passport-http').BasicStrategy;

module.exports = function(app) {

	app.use(passport.initialize());

	passport.use(new Strategy(function(username, password, done) {
		console.log('passport use');
		done(null, 'test', 'test');
	}));

	app.use(passport.authenticate('basic', {session: false}), function(req, res, next) {
		console.log('passport authenticate');
		next();
	});
}

