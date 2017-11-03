exports.todoController = function($scope, $todo) {
  $scope.todo = $todo;

  setTimeout(function() {
    $scope.$emit('todoController');
  }, 0);
};