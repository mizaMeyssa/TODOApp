exports.$todo = function ($http) {
	var service = {};

	service.loadTodo = function() {
		$http.
		get('/api/todos').
		success(function(data) {
			service.todos = data.todos;
		}).
		error(function(data, $status) {
			service.todos =  [];
		});
	}

	return service;
}