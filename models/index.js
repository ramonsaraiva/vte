/*
 * index.js
 *
 * index do diretorio de models
 *
 */

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var config = require(path.join(__dirname, '../configs/db.json'));

var sequelize = new Sequelize(config.database, config.username, config.password, config.sequelize);
var models = {};

//colocar isso em cada model
/*
	var pkey =
	{
		type: DataTypes.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	};
	*/

fs.readdirSync(__dirname).filter(function(file) {
	return (file.indexOf('.') !== 0) && (file !== 'index.js') && (file === 'models.js');
})
.forEach(function(file) {
	var model = sequelize.import(path.join(__dirname, file));
	if(model instanceof Array)
	{
		model.forEach(function(m) {
			models[m.name] = m;
		});
	}
	else
	{
		models[model.name] = model;
	}
});

Object.keys(models).forEach(function(modelName) {
	if('associate' in models[modelName])
		models[modelName].associate(models);
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

sequelize.authenticate()
.on('success', function() {
	console.log('Ok.');
})
.on('failure', function(e) {
	console.log(e);
});

module.exports = models;