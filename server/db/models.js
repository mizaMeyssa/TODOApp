var mongoose = require('mongoose').set('debug', true);

module.exports = function (wagner) {
	mongoose.connect('mongodb://127.0.0.1:27017');
	//mongoose.connect('mongodb://127.0.0.1:27017/todos');

	var TODO = mongoose.model('TODO', require('./schemas/todo.js'), 'todos');

	wagner.factory('TODO', function(){
		return TODO;
	});

	return {
		TODO : TODO
	}
}

