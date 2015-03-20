/*
 * sync.js
 *
 */

var models = require('../models');

models.sequelize.sync({force: true})
.on('success', function() {
	console.log('Success.');
	models.usuarios.create({ login: 'admin', senha: 'admin', nome: 'Administrador'}).then(function(user) {
		console.log('User ' + user.nome + ' created.');
	});
})
.on('failure', function(e) {
	console.log(e);
});
