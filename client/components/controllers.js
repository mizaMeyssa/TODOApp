var _ = require('underscore');

exports.todoCounterController = function($scope, $routeParams, $http, appBootsrapConfig, AppBootstrapData) {
	var encoded = encodeURIComponent($routeParams);
	var now = new Date();
	var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

	// To DO move this to dashboard controller
	appBootsrapConfig
		.query()
		.then(function (data) {
			angular.extend(AppBootstrapData, data);
		});

	$http.
		get('/api/todos/count' ).
		success(function (data) {
			$scope.pending = data.counts.pending || 0;
			$scope.inProgress = data.counts.inProgress || 0;
			$scope.done = data.counts.done || 0;
		});

	$scope.routeTitle = "KPIs";

	// This is just for testing purposes
	setTimeout(function() {
	    $scope.$emit('todoCounterController');
	}, 0);
};

exports.todoListController = function ($scope, $http, $route, $uibModal) {
	$scope.statusColor = {
		'inProgress' : 'primary',
		'pending' : 'yellow',
		'done': 'green'
	};

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

	$scope.startProgress = function(todo) {
		editTODOStatus(todo, 'inProgress');
	};

	$scope.finishProgress = function(todo) {
		editTODOStatus(todo, 'done');
	};

	$scope.stopProgress = function(todo) {
		editTODOStatus(todo, 'pending');
	};

	var editTODOStatus = function(todo, status) {
		todo.status = status;
		$http.
		post('/api/todos/update/' + todo._id, {todo: todo}).
			then(function(data) {
				$route.reload();
			});

	}

	$scope.deleteTODO = function(todo) {
		$http.
		post('/api/todos/delete/' + todo._id, {todo: todo}).
			then(function(data) {
				$route.reload();
			});
	};
}

exports.todoEditorController = function ($uibModalInstance, $scope, $http, $route, AppBootstrapData, todo) {

	$scope.todo_modal = angular.copy(todo);
	$scope.statuses = AppBootstrapData.statuses;

	$scope.datePopup = {
		opened : false
	};
	$scope.dateOptions = {
	    formatYear: 'yy',
	    maxDate: new Date(2020, 5, 22),
	    minDate: new Date(),
	    startingDay: 1
	  };
	$scope.openDatePopup = function() {
	    $scope.datePopup.opened = true;
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};

	$scope.save = function () {
		$uibModalInstance.close($scope.todo_modal);
		if (todo) {
			$http.
				post('/api/todos/update/' + $scope.todo_modal._id, {todo: $scope.todo_modal}).
				then(function(res) {
					$route.reload();
				});
		} else {
			$http.
				post('/api/todos/add', {todo: $scope.todo_modal}).
				then(function(res) {
					$route.reload();
				});
		}
		  
	};
}