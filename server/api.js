var express = require('express');
var status = require('http-status');
var bodyParser = require('body-parser');

module.exports = function (wagner) {
	var api = express.Router();

	// configure api to use bodyParser() otherwise req won't contain any body for post and put methods
	api.use(bodyParser.urlencoded({
	    extended: true
	}));
	api.use(bodyParser.json());

	api.get('/todos', wagner.invoke(function(TODO) {
		return function(req, res) {
			TODO.find({}, function(error, todos) {
				if(error) {
					return res.
						status(status.INTERNAL_SERVER_ERROR).
						json({ error: error.toString() });
				}
				if (!todos) {
					return res.
						status(status.NOT_FOUND).
						json({ error: 'NOT FOUND' });
				}
				return res.json({ todos: todos });
			});
		}
	}));

	api.post('/todos/add', wagner.invoke(function(TODO) {
		return function(req, res) {
			console.log(req.body);
			var todo = new TODO(req.body.todo);
			todo.save(function(error, todo) {
				if(error) {
					return res.
						status(status.INTERNAL_SERVER_ERROR).
						json({ error: error.toString() });
				}
				return res.json({ todo: todo});
			});
		}
	}));

	return api;
}