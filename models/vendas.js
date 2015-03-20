/*
 * models.js
 *
 */

module.exports = function(sequelize, DataTypes) {
	var pkey =
	{
		type: DataTypes.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	};

	var clientes = sequelize.define('clientes', {
		id: pkey,
		nome:
		{
			type: DataTypes.STRING(30),
			allowNull: false
		},
		telefones: DataTypes.STRING(40),
		email:
		{
			type: DataTypes.STRING(50),
			validate:
			{
				isEmail:
				{
					args: true,
					msg: 'É necessário um E-Mail válido.'
				}
			}
		}
	});

	var familias = sequelize.define('familias', {
		id: pkey,
		descricao:
		{
			type: DataTypes.STRING(50),
			allowNull: false
		}
	});

	var fornecedores = sequelize.define('fornecedores', {
		id: pkey,
		descricao:
		{
			type: DataTypes.STRING(50),
			allowNull: false
		}
	});

	var produtos = sequelize.define('produtos', {
		id: pkey,
		id_familia: DataTypes.INTEGER,
		nome:
		{
			type: DataTypes.STRING(30),
			allowNull: false
		},
		codigo: DataTypes.STRING(40),
		estoque:
		{
			type: DataTypes.INTEGER,
			defaultValue: 0
		},
		preco:
		{
			type: DataTypes.DECIMAL(10,2),
			defaultValue: 0
		}
	}, {
		classMethods:
		{
			associate: function(models) {
				produtos.belongsTo(models.familias, {foreignKey: 'id_familia'});
			},

			qAll: function(args) {
				if(!args)
					args = {};
				args['include'] = [familias];
				return produtos.all(args);
			},

			qFind: function(args) {
				args['include'] = [familias];
				return produtos.find(args);
			},

			qFindAll: function(args) {
				args['include'] = [familias];
				return produtos.findAll(args);
			}
		}
	});

	var vendas = sequelize.define('vendas', {
		id: pkey,
		id_produto:
		{
			type: DataTypes.INTEGER,
			allowNull: false
		},
		id_cliente: DataTypes.INTEGER,
		quantidade:
		{
			type: DataTypes.INTEGER,
			allowNull: false
		},
		preco: DataTypes.DECIMAL(10,2),
		data:
		{
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		}
	}, {
		hooks:
		{
			beforeCreate: function(venda, options, done) {
				produtos.find({
					where: { id: venda.id_produto }
				})
				.on('success', function(produto) {
					venda.preco = produto.preco;
				});

				return done(null, venda);
			},
			afterCreate: function(venda, options, done) {
				produtos.find({
					where: { id: venda.id_produto }
				})
				.on('success', function(produto) {
					produto.updateAttributes({estoque: produto.estoque - venda.quantidade});
				});

				return done();
			}
		},

		classMethods:
		{
			associate: function(models) {
				vendas.belongsTo(models.produtos, {foreignKey: 'id_produto'});
				vendas.belongsTo(models.clientes, {foreignKey: 'id_cliente'});
			},

			deps: function() {
				return [produtos, clientes];
			},

			qAll: function(args) {
				if(!args)
					args = {};
				args['include'] = vendas.deps();
				return vendas.all(args);
			},

			qFind: function(args) {
				args['include'] = vendas.deps();
				return vendas.find(args);
			},

			qFindAll: function(args) {
				args['include'] = vendas.deps();
				return vendas.findAll();
			}
		}
	});

	var compras = sequelize.define('compras', {
		id: pkey,
		id_produto:
		{
			type: DataTypes.INTEGER,
			allowNull: false
		},
		id_fornecedor: DataTypes.INTEGER,
		quantidade:
		{
			type: DataTypes.INTEGER,
			allowNull: false
		},
		preco:
		{
			type: DataTypes.DECIMAL(10,2),
			allowNull: false
		},
		data:
		{
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		}
	}, {
		hooks:
		{
			afterCreate: function(compra, options, done) {
				produtos.find({
					where: { id: compra.id_produto }
				})
				.on('success', function(produto) {
					produto.updateAttributes({estoque: produto.estoque + compra.quantidade});
				});

				return done();
			}
		},

		classMethods:
		{
			//colocar isso aqui como hooks de afterDefine pra nao precisar chamar nada no index.js
			associate: function() {
				compras.belongsTo(produtos, {foreignKey: 'id_produto'});
				compras.belongsTo(fornecedores, {foreignKey: 'id_fornecedor'});
			},

			deps: function() {
				return [produtos, fornecedores];
			},

			qAll: function(args) {
				if(!args)
					args = {};
				args['include'] = compras.deps();
				return compras.all(args);
			},

			qFind: function(args) {
				args['include'] = compras.deps();
				return compras.find(args);
			},

			qFindAll: function(args) {
				args['include'] = compras.deps();
				return compras.findAll(args);
			}
		}
	});

	var models = [clientes, familias, fornecedores, produtos, compras, vendas];

/*
	for(var k in models)
	{
		if('associate' in models[k])
			models[k].associate(models);
	}*/

	return models;
};
