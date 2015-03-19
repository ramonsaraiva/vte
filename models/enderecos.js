/*
 * models do modulo de endereços
 */

module.exports = function(sequelize, DataTypes) {

	var bairros = sequelize.define('bairros', {
		nome:
		{
			type: DataTypes.STRING(128),
			allowNull: false,
			unique: true
		}
	});

	var cidades = sequelize.define('cidades', {
		nome:
		{
			type: DataTypes.STRING(64),
			allowNull: false,
			unique: true
		}
	});

	var estados = sequelize.define('estados', {
		nome:
		{
			type: DataTypes.STRING(2);
			allowNull: false,
			unique: true
		}
	});

	return [bairros, cidades, estados];
}