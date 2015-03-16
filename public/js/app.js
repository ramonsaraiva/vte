/*
 * app.js
 *
 */

var app = angular.module('app', [
	'ngRoute',
	'ngSanitize',

	'ui.bootstrap',
	'ui.select',
	'ngGrid',

	'controllers',
	'services'
]);

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			redirectTo: '/vendas'
		})
		.when('/login', {
			templateUrl: 'partials/login.tpl.html',
			controller: 'loginController'
		})
		.when('/familias', {
			templateUrl: 'partials/module.tpl.html',
			controller: 'module_controller',
			resolve: {
				config: function () {
					return {
						title: 'Famílias',
						name: 'familias',
						form: 'familias-fornecedores.tpl.html',
						fields: [{
							field: 'descricao',
							displayName: 'Descrição'
						}]
					};
				}
			}
		})
		.when('/fornecedores', {
			templateUrl: 'partials/module.tpl.html',
			controller: 'module_controller',
			resolve: {
				config: function() {
					return {
						title: 'Fornecedores',
						name: 'fornecedores',
						form: 'familias-fornecedores.tpl.html',
						fields: [{
							field: 'descricao',
							displayName: 'Descrição'
						}]
					};
				}
			}
		})
		.when('/clientes', {
			templateUrl: 'partials/module.tpl.html',
			controller: 'module_controller',
			resolve: {
				config: function() {
					return {
						title: 'Clientes',
						name: 'clientes',
						fields: [{
							field: 'nome',
							displayName: 'Nome'
						}, {
							field: 'telefones',
							displayName: 'Telefones'
						}, {
							field: 'email',
							displayName: 'E-Mail'
						}]
					};
				}
			}
		})
		.when('/produtos', {
			templateUrl: 'partials/module.tpl.html',
			controller: 'module_controller',
			resolve: {
				config: function() {
					return {
						title: 'Produtos',
						name: 'produtos',
						fields: [{
							field: 'nome',
							displayName: 'Nome'
						}, {
							field: 'codigo',
							displayName: 'Código'
						}, {
							field: 'preco',
							displayName: 'Preço'
						}, {
							field: 'estoque',
							displayName: 'Estoque'
						}]
					};
				}
			}
		})
		.when('/compras', {
			templateUrl: 'partials/module.tpl.html',
			controller: 'module_controller',
			resolve: {
				config: function() {
					return {
						title: 'Compras',
						name: 'compras',
						form: 'compras-vendas.tpl.html',
						fields: [{
							field: 'produto.nome',
							displayName: 'Produto'
						}, {
							field: 'fornecedore.descricao',
							displayName: 'Fornecedor'
						}, {
							field: 'quantidade',
							displayName: 'Quantidade'
						}, {
							field: 'preco',
							displayName: 'Valor Unitário'
						}, {
							field: 'data',
							displayName: 'Data'
						}]
					};
				}
			}
		})
		.when('/vendas', {
			templateUrl: 'partials/module.tpl.html',
			controller: 'module_controller',
			resolve: {
				config: function() {
					return {
						title: 'Vendas',
						name: 'vendas',
						form: 'compras-vendas.tpl.html',
						fields: [{
							field: 'produto.nome',
							displayName: 'Produto'
						}, {
							field: 'cliente.nome',
							displayName: 'Cliente'
						}, {
							field: 'quantidade',
							displayName: 'Quantidade'
						}, {
							field: 'preco',
							displayName: 'Valor Unitário'
						}, {
							field: 'data',
							displayName: 'Data'
						}]
					};
				}
			}
		})
		.otherwise({
			redirectTo: '/vendas'
		});
}]);