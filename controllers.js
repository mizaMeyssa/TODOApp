exports.todoCounterController = function($scope, $routeParams, $http) {
	var encoded = encodeURIComponent($routeParams);
	console.log(encoded);

	$http.
		get('/api/todos' ).
		success(function (data) {
			console.log(data);
			$scope.today_count = 5;
			$scope.upcoming_count = 10;
		});

	// This is just for testing purposes
	setTimeout(function() {
	    $scope.$emit('todoController');
	}, 0);
};