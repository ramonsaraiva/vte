/*
 * controllers.js
 *
 */

var controllers = angular.module('controllers', []);

/*
 * funcao from hell que maloquei dum lugar ai e nao sei o que faz, mas resolveu uma treta ali
 */
controllers.filter('propsFilter', function() {
	return function(items, props) {
		var out = [];

		if(!angular.isArray(items))
			return items;

		items.forEach(function(item) {
			var itemMatches = false;
			var keys = Object.keys(props);

			for(var i = 0; i < keys.length; i++)
			{
				var prop = keys[i];
				var text = props[prop].toLowerCase();

				if(item[prop].toString().toLowerCase().indexOf(text) !== -1)
				{
					itemMatches = true;
					break;
				}
			}

			if(itemMatches)
				out.push(item);
		});

		return out;
	}
});

/*
 * se eu nao conseguir fazer isso direito para todos, fazer com que pelo menos seja facil de extender
 * para modulos especificos, aproveitando ja as funcoes basicas desse
 */
controllers.controller('module_controller',  ['$scope', '$sce', 'config', 'db', function($scope, $sce, config, db) {

	$scope.module_title = null;
	$scope.module_name = null;
	$scope.module_form = null;

	/*
	 * db: instancia de um service da angular que faz as requests para o envio
	 * e recebimento de dados;
	 */
	$scope.db = null;

	/*
	 * data: array de dados do modulo;
	 * form: objeto com relaçoes e campos e dados para o envio em create() filter() e update();
	 *
	 * selected: dados de visualizaçao de 1 elemento completo (acho que sera retirado para utilizaçao do selected);
	 */
	$scope.data = null;
	$scope.form = null;

	$scope.selected = null;

	/*
	 * variavel que armazena dados de submodulos para preencher selects
	 */
	$scope.submodules = null;
	$scope.submodule_params = null;

	/*
	 * messages: mensagens de sucesso, aviso e erros que vem do servidor
	 */
	$scope.messages = null;

	/*
	 * action: variavel que contra visibiliade dos forms;
	 */
	$scope.action = null;

	/*
	 * grid: opcoes do grid;
	 * selected: items selecionados;
	 *
	 * faltando encontrar: bindar o selected do grid ao controller para nao poluir
	 * as actions;
	 */
	$scope.grid_opts = null;
	$scope.grid_selected = null;

	$scope.init = function()
	{
		$scope.module_name = config.name;
		$scope.module_form = config.form;
		$scope.module_title = config.title;

		if(!$scope.module_form)
			$scope.module_form = $scope.module_name + '.tpl.html';

		$scope.submodules = {};
		$scope.submodule_params = {};
		$scope.messages = {};

		$scope.db = new db($scope.module_name);

		$scope.form = {};
		$scope.selected = {};
		$scope.grid_selected = [];

		$scope.grid_opts =
		{
			primaryKey: 'id',
			data: 'data',
			multiSelect: false,
			showFilter: true,
			selectedItems: $scope.grid_selected,
			afterSelectionChange: $scope.on_select_row,
			enableColumnResize: true,
			enableColumnReordering: true,
			enableSorting: true,
			showColumnMenu: true,
			columnDefs: config.fields
		};

		$scope.fill();
	};

	$scope.debug = function()
	{
		alert($scope.submodule_params.id);
	}

	/*
	 * control-functions
	 */
	$scope.on_actions = function(actions)
	{
		if($scope.action == actions)
			return true;

		if(actions.indexOf($scope.action) > -1)
			return true;

		return false;
	}

	$scope.on_module = function(module)
	{
		if($scope.module_name == module)
			return true;

		return false;
	}

	/*
	 * grid-functions
	 */
	$scope.fill = function()
	{
		$scope.data = null;

		$scope.db.list()
			.success(function(data) {
				$scope.data = data;
			})
			.error(function(e) {
				$scope.error(e);
			});
	};

	$scope.on_select_row = function(row, e)
	{
		if($scope.action == 'update')
			$scope.form = angular.copy($scope.grid_selected[0]);

		$scope.selected = $scope.grid_selected[0];
	};

	$scope.clear_selection = function()
	{
		//seleciona o primeiro registro
	}

	/*
	 * messages
	 * talvez seja melhor fazer uma funçao soh e passar o nome do tipo;
	 */
	$scope.success = function(m)
	{
		if(!$scope.messages.success)
			$scope.messages.success = [];

		$scope.messages.success.push(m);
	}

	$scope.info = function(m)
	{
		if(!$scope.messages.info)
			$scope.messages.info = [];

		$scope.messages.info.push(m);
	}

	$scope.warning = function(m)
	{
		if(!$scope.messages.warning)
			$scope.messages.warning = [];

		$scope.messages.warning.push(m);
	}

	$scope.error = function(m)
	{
		if(!$scope.messages.danger)
			$scope.messages.danger = [];

		$scope.messages.danger.push(m);
	}

	$scope.set_messages = function(type, msg)
	{
		if(!$scope.messages[type])
			$scope.messages[type] = [];

		$scope.messages[type].push(msg);
	}

	$scope.get_messages = function(type)
	{
		return $scope.messages[type];
	}

	$scope.clear_messages = function()
	{
		$scope.messages = {};
	}

	/*
	 * form-functions
	 */
	$scope.form_open = function(action)
	{
		if($scope.action == action)
		{
			$scope.form_close();
			return;
		}

		if(action == 'create')
			$scope.form = {};
		if(action == 'update')
			$scope.form = angular.copy($scope.grid_selected[0]);

		$scope.action = action;
	};

	$scope.form_close = function()
	{
		$scope.action = null;
	}

	$scope.form_clear = function()
	{
		//se action for update, o 'clear' eh recopiar pro que tava selecionado e nao zerar
		$scope.form = {};
	}

	$scope.form_submit = function()
	{
		switch($scope.action)
		{
		case 'create':
			$scope.create();
			break;
		case 'update':
			if(!$scope.selected)
			{
				$scope.warning('Nenhum registro selecionado.');
				return;
			}

			$scope.update();
			$scope.form_close()
			break;
		case 'delete':
			if(!$scope.selected)
			{
				$scope.warning('Nenhum registro selecionado.');
				return;
			}

			$scope.delete();
			break;
		default:
			break;
		}
	};

	//FIXME: isso aqui ta um HORROR, mas vai ficar assim por enqt
	$scope.form_exists = function(name)
	{
		var forms = document.getElementById('forms');
		if(!forms)
			return false;

		var form = forms.querySelector("[id*=" + name + "]");
		if(!form)
			return false;

		return true;
	}
	/*
	 * end of form-functions
	 */

	$scope.is_empty = function(obj)
	{
	    var hasOwnProperty = Object.prototype.hasOwnProperty;

	    if (obj === null)
	        return true;

	    if (obj.length > 0)
	        return false;
	    if (obj.length === 0)
	        return true;

	    for (var key in obj)
	    {
	        if(hasOwnProperty.call(obj, key))
	            return false;
	    }

	    return true;
	};

	$scope.html_escape = function(v)
	{
		return $sce.trustAsHtml(v);
	}

	$scope.list = function()
	{
		$scope.db.list()
			.success(function(data) {
				$scope.data = data;
			})
			.error(function(e) {
				$scope.error(e);
			});
	};

	$scope.list_submodule = function(module)
	{
		var m = new db(module);
		m.list()
			.success(function(data) {
				$scope.submodules[module] = data;
			})
			.error(function(e) {
				$scope.error(e);
			});
	}

	$scope.list_submodule_params = function(module)
	{
		var m = new db(module);
		m.list_params($scope.submodule_params)
			.success(function(data) {
				$scope.submodules[module] = data;
			})
			.error(function(e) {
				$scope.error(e);
			});
	}

	$scope.filter_activate = function()
	{
		$scope.db.list_params($scope.form)
			.success(function(data) {
				$scope.data = null;
				$scope.data = data;
			})
			.error(function(e) {
				$scope.error(e);
			});
	}

	$scope.filter_deactivate = function()
	{
		$scope.fill();
	}

	/*
	 * CRUD-functions
	 *
	 * as operaçoes de form === null nao funcionam
	 * porque eu setei ele como {}, que, nao tava
	 * funcionando nao sei porque como null inicial
	 */
	$scope.create = function()
	{
		if($scope.form === null)
			return;

		$scope.db.create($scope.form)
			.success(function(data) {
				$scope.form = {};
				$scope.fill();
			})
			.error(function(e) {
				$scope.error(e);
			});
	};

	$scope.read = function()
	{
		if($scope.grid_selected[0] === undefined)
			return;

		$scope.db.read($scope.grid_selected[0].id)
			.success(function(data) {
				$scope.selected = data;
			})
			.error(function(e) {
				$scope.error(e);
			});
	};

	$scope.update = function()
	{
		if($scope.form === null)
			return;

		$scope.db.update($scope.grid_selected[0].id, $scope.form)
			.success(function(data) {
				$scope.form = {};
				$scope.fill();
			})
			.error(function(e) {
				$scope.error(e);
			});
	};

	$scope.delete = function()
	{
		$scope.db.delete($scope.grid_selected[0].id)
			.success(function(data) {
				$scope.form = {};
				$scope.selected = null;
				$scope.fill();
			})
			.error(function(e) {
				$scope.error(e);
			});
	};
	/*
	 * end of CRUD-functions
	 */

	$scope.init();
}]);

controllers.controller('loginController', ['$scope', '$rootScope', '$location', 'AuthenticationService', function($scope, $rootScope, $location, AuthenticationService) {

	AuthenticationService.ClearCredentials();

	$scope.login = function() {
		AuthenticationService.Login($scope.username, $scope.password, function(response) {
			if (response.success)
			{
				AuthenticationService.SetCredentials($scope.username, $scope.password);
				$location.path('/');
			}
			else
			{
				alert(response.message);
			}
		});
	};
}]);
