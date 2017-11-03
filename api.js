var express = require('express');
var status = require('http-status');

module.exports = function (wagner) {
	var api = express.Router();

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

	return api;
}