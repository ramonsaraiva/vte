/*
 * usuarios.js
 * model do modulo de usuarios
 */

module.exports = function(sequelize, DataTypes) {
	var usuarios = sequelize.define('usuarios', {
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
			type: DataTypes.BOOLEAN
		},
		tipo_operador: {
			type: DataTypes.BOOLEAN
		},
		tipo_tecnico: {
			type: DataTypes.BOOLEAN
		},
		tipo_estoquista: {
			type: DataTypes.BOOLEAN
		},
		tipo_orcamento: {
			type: DataTypes.BOOLEAN
		},
		tipo_gerencia: {
			type: DataTypes.BOOLEAN
		}
	});

	return usuarios;
}