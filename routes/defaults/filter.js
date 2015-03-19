/*
 * filter.js
 * funcao horrenda e enorme, mudei de arquivo para facilitar
 */

module.exports = function(app, models) {
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

}
