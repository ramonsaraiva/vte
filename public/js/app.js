/*
 * app.js
 *
 */

var app = angular.module('app', [
	'ngRoute',
	'ngSanitize',
	'ngCookies',

	'ui.bootstrap',
	'ui.select',
	'ngGrid',

	'controllers',
	'services'
]);

app.config(['$routeProvider', function($routeProvider) {

	$routeProvider
		.when('/', {
			redirectTo: '/usuarios'
		})
		.when('/login', {
			templateUrl: 'partials/login.tpl.html',
			controller: 'loginController'
		})
		.when('/usuarios', {
			templateUrl: 'partials/module.tpl.html',
			controller: 'module_controller',
			resolve: {
				config: function() {
					return {
						title: 'Usuários',
						name: 'usuarios',
						fields: [{
							field: 'nome',
							displayName: 'Nome'
						}, {
							field: 'senha',
							displayName: 'Senha'
						}, {
							field: 'login',
							displayName: 'Login'
						}]
					};
				}
			}
		})
		.otherwise({
			redirectTo: '/usuarios'
		});
}])

.run(['$rootScope', '$location', '$cookieStore', '$http',
		function($rootScope, $location, $cookieStore, $http) {
			// keep user logged in after page refresh
			$rootScope.globals = $cookieStore.get('globals') || {};
			if ($rootScope.globals.currentUser) {
				$http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
			}

			$rootScope.$on('$locationChangeStart', function (event, next, current) {
				// redirect to login page if not logged in
				if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
					$location.path('/login');
				}
			});
}]);
