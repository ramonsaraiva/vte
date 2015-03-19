/*
 * sync.js
 *
 */

var models = require('../models');

models.sequelize.sync({force: true})
.on('success', function() {
	console.log('Success.');
})
.on('failure', function(e) {
	console.log(e);
});
