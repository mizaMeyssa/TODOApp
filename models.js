var mongoose = require('mongoose');

module.exports = function (wagner) {
	mongoose.connect('mongodb://127.0.0.1:27017/test');

	var TODO = mongoose.model('TODO', require('./todo.js'), 'todos');

	wagner.factory('TODO', function(){
		return TODO;
	});

	return {
		TODO : TODO
	}
}

