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

	$scope.addTODO = function() {
		$scope.todo = {};

		var modalInstance = $uibModal.open({
		  animation: true,
		  templateUrl: 'bin/templates/todo_form.html',
		  size: 'lg',
		  scope: $scope
		});

		$scope.cancel = function () {
		  modalInstance.dismiss('cancel');
		};

		$scope.save = function () {
		  modalInstance.close($scope.todo);
		  $http.
			post('/api/todos/add', {todo: $scope.todo}).
			then(function(res) {
				console.log(res);
			});
		  
		};
	}
}