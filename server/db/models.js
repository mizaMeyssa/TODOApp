var mongoose = require('mongoose').set('debug', true);
var _ = require('underscore');

module.exports = function (wagner) {
	mongoose.connect('mongodb://127.0.0.1:27017');
	//mongoose.connect('mongodb://127.0.0.1:27017/todos');

	var TODO = mongoose.model('TODO', require('./schemas/todo.js'), 'todos');
	var Status = mongoose.model('Status', require('./schemas/status.js'), 'statuses');

	var models = {
		TODO : TODO,
		Status : Status
	};

	_.each(models, function(value, key) {
		wagner.factory(key, function(){
			return value;
		});
	});

	return models;
}

