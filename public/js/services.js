/*
 * services.js
 *
 */

var services = angular.module('services', []);

services.factory('db', ['$http', function($http, module) {

	function db(module)
	{
		this.m = module;
		this.url = '/db/' + this.m + '/';
	}

	db.prototype.create = function(record) {
		return $http.post(this.url, { data: record });
	};

	db.prototype.read = function(id) {
		return $http.get(this.url + id);
	};

	db.prototype.update = function(id, record) {
		return $http.patch(this.url + id, { data: record });
	};

	db.prototype.delete = function(id) {
		return $http.delete(this.url + id);
	};

	db.prototype.list = function() {
		return $http.get(this.url);
	};

	db.prototype.list_params = function(params) {
		return $http.get(this.url, { params: { filter_params: params } });
	};

	return db;
}]);

//services = angular.module('services', ['ngResource']);
//services.factory('db2', ['$resource', function($resource, module) {
//	return $resource('/db/module/:id');
//}]);
//

services.factory('AuthenticationService',
    ['$http', '$cookieStore', '$rootScope', '$timeout',
    function ($http, $cookieStore, $rootScope, $timeout) {
        var service = {};

        service.Login = function (username, password, callback) {

            /* Dummy authentication for testing, uses $timeout to simulate api call
             ----------------------------------------------*/
            $timeout(function(){
                var response = { success: username === 'admin' && password === 'admin' };
                if(!response.success) {
                    response.message = 'Username or password is incorrect';
                }
                callback(response);
            }, 1000);


            /* Use this for real authentication
             ----------------------------------------------*/
            //$http.post('/api/authenticate', { username: username, password: password })
            //    .success(function (response) {
            //        callback(response);
            //    });

        };
 
        service.SetCredentials = function (username, password) {
            var authdata = username + ':' + password;
 
            $rootScope.globals = {
                currentUser: {
                    username: username,
                    authdata: authdata
                }
            };
 
            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
            $cookieStore.put('globals', $rootScope.globals);
        };
 
        service.ClearCredentials = function () {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic ';
        };
 
        return service;
}])
