var _ = require('underscore');

exports.todoCounterController = function($scope, $routeParams, $http, AppBootsrapConfig, AppBootstrapData) {
	var encoded = encodeURIComponent($routeParams);
	var now = new Date();
	var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

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

exports.todoListController = function ($scope, $http, $route, $uibModal, AppBootstrapData) {

	$scope.statuses = {};
	AppBootstrapData.statuses.map(function(status){
		$scope.statuses[status._id] = status.label;
	});

	var isIE = function() {
		var userAgent = navigator.userAgent;
	    return userAgent.indexOf("MSIE ") > -1 || userAgent.indexOf("Trident/") > -1;
	}

	var textFormatData = function(todosData) {
		var text = "";
		Object.keys(todosData).forEach(function(type) {
			text += "\t "+ $scope.statuses[type] +"\n";
			todosData[type].forEach(function(todo) {
				text += "- Title : "+todo.title+"\n";
			});
			text += "\n\n";
		});
		return text;
	}

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
		if (confirm("Are you sure you want to delete : " + todo.title + " ?") == true) {
		    $http.
			post('/api/todos/delete/' + todo._id, {todo: todo}).
				then(function(data) {
					$route.reload();
				});
		} 
	};

	$scope.downloadTODOs = function() {
		var formattedData = textFormatData($scope.todos);
		if (!isIE()) {
          var blobdata = new Blob([formattedData],{type : 'text/plain'});
          var link = document.createElement('a');
          link.setAttribute('id', 'exportGrid');
          link.setAttribute('href', window.URL.createObjectURL(blobdata));
          link.setAttribute('download', 'workloadReport' + '.txt');
          window.document.body.appendChild(link);
          link.click();
        } else {
          var blob = new Blob([formattedData], {
            type: 'text/plain'
          });
          window.navigator.msSaveBlob(blob, (saveName || 'gridData') + '.csv');
        }
	}
}

exports.todoEditorController = function ($uibModalInstance, $scope, $http, $route, AppBootstrapData, todo) {

	$scope.statuses = AppBootstrapData.statuses;
	$scope.types = AppBootstrapData.types;

	if (todo) {
		$scope.todo_modal = angular.copy(todo);
		$scope.todo_modal.eta = new Date($scope.todo_modal.eta);
	} else {
		$scope.todo_modal = {};
		$scope.todo_modal.type = $scope.types[0]._id;;
		$scope.todo_modal.eta = new Date();
		$scope.todo_modal.status = $scope.statuses[0]._id;
	}
	

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