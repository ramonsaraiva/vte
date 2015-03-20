/*
 * auth.s
 * arquivo que vai lidar com as routes de authenticacao
 */

var passport = require('passport');
var Strategy = require('passport-http').BasicStrategy;

module.exports = function(app, models) {

	app.use(passport.initialize());

	passport.use(new Strategy(function(username, password, done) {

		models.usuarios.find({
			where: { login: username }
		})
		.on('success', function(user) {
			if (!user)
				return done(null, false);

			if (user.senha != password) 
				return done(null, false);

			return done(null, user);
		})
		.on('failure', function(e) {
			return done(e);
		})
		.on('error', function(e) {
			return done(e);
		});
	}));

	app.use(passport.authenticate('basic', {session: false}), function(req, res, next) {
		console.log('passport authenticate');
		next();
	});
}

