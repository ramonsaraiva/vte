/*
 * routes.js
 *
 */

var models = require('./models');
//var passport = require('passport');

/*
 * quero que a conexao do db seja persistente, soh vai ter auth pro sistema e
 * nao pro db, menos lixo por request, entao nao fica ali o new Sequelize etc,
 * acho que da pra fazer o db.js mesmo e devolver a instancia do sequelize para
 * fazer o sync e outras operaçoes que sejam necessarias
 */

module.exports = function(app) {

	app.use(function(req, res, next) {
		//console.log(req.method, req.url);
		next();
	});

	app.use(function(err, req, res, next) {
		var e = new Error(err);
		next(e);
	});

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

	/*
	 * overridden routes
	 */
	app.get('/teste', function(req, res) {
	    console.log('test');
	    res.sendStatus(200);
	});
	/*
	 * end of overridden routes
	 */

	//na verdade eu deveria sempre chamar findAll, ai eu ja removeria a all()
	//da porra do models e resolveria esse if-else gigante imundo
	//se bobear da pra colocar isso tudo numa funcao soh e derrepente num route
	//soh, usando app.use e verificando qual method, se tem id ou nao, e chamar
	//a funcao certa
	app.get('/db/:module', function(req, res) {
		var name = req.params.module;
		var m = models[name];
		var filter = req.param('filter_params');
		var where = '';

		if(filter)
		{
			/*
			 *	formato do where;
			 *	custom query;
			 *	ilike;
			 */
			filter = JSON.parse(filter);

			for(var k in filter)
			{
				if(!filter[k])
					continue;

				var sql = null;
				var value = null;
				/*
				var r = parseInt(filter[k]);

				if(isNaN(r))
					value = filter[k];
				else
					value = r;
				*/

				value = filter[k];
				switch(typeof value)
				{
				case 'string':
					sql = 'lower(' + k + ') LIKE ' + "'%" + value.toLowerCase() + "%'" + ' AND ';
					break;

				case 'number':
					sql = k + ' = ' + value + ' AND ';
					break;

				case 'undefined':
				case 'boolean':
				case 'symbol':
				case 'function':
				case 'object':
					break;
				default:
					break;
				}

				where += (sql);
			}

			where = where.replace(/ AND $/, '');
			console.log(where);

			m[m.qFindAll? 'qFindAll' : 'findAll']({
				where: [where],
			})
			.on('success', function(records) {
				res.json(records);
			})
			.on('failure', function(e) {
				res.status(401).send(e);
			})
			.on('error', function(e) {
				res.status(401).send(e);
			});
		}
		else
		{
			m[m.qAll? 'qAll' : 'all']()
			.on('success', function(records) {
				res.json(records);
			})
			.on('failure', function(e) {
				res.status(401).send(e);
			})
			.on('error', function(e) {
				res.status(401).send(e);
			});
		}
	});

	app.get('/db/:module/:id', function(req, res) {
		var m = models[req.params.module];
		var id = req.params.id;

		m[m.qFind? 'qFind' : 'find']({
			where: { id: id }
		})
		.on('success', function(record) {
			res.json(record);
		})
		.on('failure', function(e) {
			res.status(401).send(e);
		})
		.on('error', function(e) {
			res.status(401).send(e);
		});
	});

	app.post('/db/:module', function(req, res) {
		var m = models[req.params.module];
		var data = req.param('data');

		m.create(data)
			.on('success', function(result) {
				res.status(201).send('Created.');
			})
			.on('failure', function(e) {
				res.status(401).send(e);
			})
			.on('error', function(e) {
				console.log(e);
				res.status(401).send(e);
			});
	});

	app.patch('/db/:module/:id', function(req, res) {
		var m = models[req.params.module];
		var id = req.params.id;
		var data = req.param('data');

		m.find({
			where: { id: id }
		})
		.on('success', function(record) {
			record.updateAttributes(data)
				.on('success', function(result) {
					res.status(200).send('Updated.');
				})
				.on('failure', function(e) {
					res.status(401).send(e);
				});
		})
		.on('failure', function(e) {
			res.status(401).send(e);
		});
	});

	app.delete('/db/:module/:id', function(req, res) {
		var m = models[req.params.module];
		var id = req.params.id;

		m.find({
			where: { id: id }
		})
		.on('success', function(record) {
			record.destroy()
				.on('success', function(result) {
					res.status(200).send('Deleted.');
				})
				.on('failure', function(e) {
					res.status(401).send(e);
				})
				.on('error', function(e) {
					res.status(401).send(e);
				});
		})
		.on('failure', function(e) {
			res.status(401).send(e);
		})
		.on('error', function(e) {
			res.status(401).send(e);
		});
	});

/*
	app.get('/', function(req, res) {
		var options =
		{
			root: __dirname + '/public/',
			dotfiles: 'deny'
		};
		res.sendFile('index.html', options);
	});
	*/

	//caso nenhum outro route tenha sido executado
	app.get('*', function(req, res) {
		res.sendStatus(404);
	});
};