/*
 * auth.s
 * arquivo que vai lidar com as routes de authenticacao
 */

var passport = require('passport');

module.exports = function(app) {

	app.use(function(req, res, next)
	{
		if (!req.isAuthenticated())
			res.send(401);
		else
			next();
	});

	app.get('/loggedin', function(req, res) {
		res.send('0');
	});

	app.get('/login', passport.authenticate('local'), function(req, res) {
		res.send(req.user);
	});

	app.get('/logout', function(req, res) {
		req.logOut();
		res.sendStatus(200);
	});
}

//var passport = require('passport');
//var Strategy = require('passport-http').BasicStrategy;

//na angular, controller principal, colocar um location pra '#/login' caso volte
//um 401
//#/login preenche o header (digest acho que eh melhor, md5 ja resolve o pala)
//#/logout desfaz o header
//#/register envia info de user pro server pra authentica com headers novos

//lembrar o nome daquele painel de admin la e ver se me serve

//acho que aqui que fica o misterio, agente ve se tem header ou nao, se nao
//tiver, envia alguma coisa avisando pra angular mostrar a tela de login
//se tiver, avisa que tem e a angular redireciona pra alguma outra tela, tipo
//de vendas
//o login deve ser comparado com o database e deve ter opçao de registrar,
//trocar senha etc
//talvez eu use session pra evitar query no database (que se bobear funciona
//mais rapido que a session)
//passport.use(new Strategy(function(username, password, done) {
//    if(username == 'admin' && password == 'admin')
//        return done(null, {name: 'admin'});

//    return done(null, false, {message: 'ta errado'});
//}));

//module.exports = function(app) {
//	app.use(passport.initialize());
//};

/* #LOGIN
	app.use(passport.authenticate('basic', {session: false}), function(req, res, next) {
		//preciso colocar essa mensagem no negocio do passport e configurar o passport pra enviar o negocio de
		//"o servidor diz";
		//res.status(401).send('Você precisa estar logado para acessar ' + req.method + ': ' + req.url + '.');

		next();
	});

	app.get('/logout', function(req, res) {
		req.logOut();
		res.sendStatus(200);
	});
*/

