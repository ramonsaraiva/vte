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
			DataTypes.INTEGER
		},
		ativo: {
		},
		tipo_operador: {

		},
		tipo_tecnico: {
		},
		tipo_estoquista: {

		},
		tipo_orcamento: {

		},
		tipo_gerencia: {

		}
	});

	return usuarios;
}