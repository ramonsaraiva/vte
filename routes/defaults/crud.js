/*
 * crud.js
 * arquivo que contem as routes padroes de crud para os modulos que nao tiverem
 * uma definido uma anteriormente
 */

module.exports = function(app, models) {

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
};