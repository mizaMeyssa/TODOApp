var _ = require('underscore');

exports.todoCounterController = function($scope, $routeParams, $http) {
	var encoded = encodeURIComponent($routeParams);
	console.log(encoded);
	var now = new Date();
	console.log(now);
	var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	console.log(today);


	$http.
		get('/api/todos' ).
		success(function (data) {
			var today_todos = [];
			var upcoming_todos = [];
			var today = new Date().toISOString();
			_.each(data.todos, function(todo) {

				if (todo.eta <= today) {
					today_todos.push(todo);
				} else {
					upcoming_todos.push(todo);
				}
			});
			$scope.today_count = today_todos.length;
			$scope.upcoming_count = upcoming_todos.length;
			$scope.routeTitle = "KPIs";
		});

	// This is just for testing purposes
	setTimeout(function() {
	    $scope.$emit('todoCounterController');
	}, 0);
};

exports.todoListController = function ($scope, $http, $uibModal) {
	$http.
		get('/api/todos').
		success(function(data) {
			$scope.todos = data.todos;
			$scope.routeTitle = "TO DOs' list";
		});

	// This is just for testing purposes
	setTimeout(function() {
	    $scope.$emit('todoListController');
	}, 0);

	// Edit function either adds a new todo or update an existing one
	$scope.editTODO = function(todo) {
		$scope.todo = todo || null;

		var modalInstance = $uibModal.open({
		  animation: true,
		  templateUrl: 'bin/templates/todo_form.html',
		  controller: 'todoEditorController',
		  resolve: {
		  	todo: function() {
		  		return $scope.todo;
		  	}
		  }
		});
	}
}

exports.todoEditorController = function ($uibModalInstance, $scope, $http, $route, todo) {

	$scope.todo_modal = angular.copy(todo);

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};

	$scope.save = function () {
		$uibModalInstance.close($scope.todo_modal);
		if (todo) {
			console.log('edit');
			$http.
				post('/api/todos/update/' + $scope.todo_modal._id, {todo: $scope.todo_modal}).
				then(function(res) {
					$route.reload();
				});
		} else {
			console.log('add');
			$http.
				post('/api/todos/add', {todo: $scope.todo_modal}).
				then(function(res) {
					$route.reload();
				});
		}
		  
	};
}