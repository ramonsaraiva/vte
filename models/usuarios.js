/*
 * usuarios.js
 * model do modulo de usuarios
 */

module.exports = function(sequelize, DataTypes) {
	var usuarios = sequelize.define('usuarios', {
		id:
		{
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		login: {
			type: DataTypes.STRING(16),
			allowNull: false,
			unique: true
		},
		senha: {
			type: DataTypes.STRING(16),
			allowNull: false
		},
		nome: {
			type: DataTypes.STRING(16),
			allowNull: false
		},
		id_etapa: {
			type: DataTypes.INTEGER
		},
		ativo: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},
		tipo_operador: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},
		tipo_tecnico: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},
		tipo_estoquista: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},
		tipo_orcamento: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},
		tipo_gerencia: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		}
	});

	return usuarios;
}