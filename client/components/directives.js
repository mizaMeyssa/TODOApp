exports.todoCounter = function() {
  return {
    controller: 'todoCounterController',
    templateUrl: 'dist/templates/todo_counter.html'
  };
};

exports.todoList = function () {
	return {
    controller: 'todoListController',
    templateUrl: 'dist/templates/todo_list.html'
  };
}