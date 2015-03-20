/*
 * auth.s
 * arquivo que vai lidar com as routes de authenticacao
 */

module.exports = function(app, models) {

	app.use(function(req, res, next) {
		var auth;

		if (req.headers.authorization)
			auth = req.headers.authorization.substring(6).split(':');

		if (!auth)
		{
			res.sendStatus(401);
			return;
		}

		models.usuarios.find({
			where: { login: auth[0] }
		})
		.on('success', function(user) {
			if (!user)
			{
				res.sendStatus(401);
			}
			else if (user.senha !== auth[1])
			{
				res.sendStatus(401);
			}
			else
			{
				next();
			}
		})
		.on('failure', function(e) {
			res.sendStatus(500);
		})
		.on('error', function(e) {
			res.sendStatus(500);
		});
	});
}
