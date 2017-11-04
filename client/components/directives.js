exports.todoCounter = function() {
  return {
    controller: 'todoCounterController',
    templateUrl: 'bin/templates/todo_counter.html'
  };
};

exports.todoList = function () {
	return {
    controller: 'todoListController',
    templateUrl: 'bin/templates/todo_list.html'
  };
}