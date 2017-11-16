var express = require('express');
var status = require('http-status');
var bodyParser = require('body-parser');
var _ = require('underscore');

module.exports = function (wagner) {

	var api = express.Router();

	// configure api to use bodyParser() otherwise req won't contain any body for post and put methods
	api.use(bodyParser.urlencoded({
	    extended: true
	}));
	api.use(bodyParser.json());

	api.get('/statuses', wagner.invoke(function(Status) {
		return function(req, res) {
			Status.find({}, function(error, statuses) {
				if(error) {
					return res.
						status(status.INTERNAL_SERVER_ERROR).
						json({ error: error.toString() });
				}
				if (!statuses) {
					return res.
						status(status.NOT_FOUND).
						json({ error: 'NOT FOUND' });
				}
				return res.json({ statuses: statuses });
			});
		}
	}));

	api.get('/types', wagner.invoke(function(Type) {
		return function(req, res) {
			Type.find({}, function(error, types) {
				if(error) {
					return res.
						status(status.INTERNAL_SERVER_ERROR).
						json({ error: error.toString() });
				}
				if (!types) {
					return res.
						status(status.NOT_FOUND).
						json({ error: 'NOT FOUND' });
				}
				return res.json({ types: types });
			});
		}
	}));

	/*
	 * I didn't find how to group by status without aggregating, for now I'am doing this..
	 */
	api.get('/todos', wagner.invoke(function(TODO) {
		return function(req, res) {
			var data = {};
			TODO
			.find({status: 'pending'}, {}, {sort: {eta: 1}}, function(error, todos) {
				if(error) {
					return res.
						status(status.INTERNAL_SERVER_ERROR).
						json({ error: error.toString() });
				}
				data.pending = todos;

				TODO
				.find({status: 'inProgress'}, {}, {sort: {eta: 1}}, function(error, todos) {
					if(error) {
						return res.
							status(status.INTERNAL_SERVER_ERROR).
							json({ error: error.toString() });
					}
					data.inProgress = todos;

					TODO
					.find({status: 'done'}, {}, {sort: {eta: 1}}, function(error, todos) {
						if(error) {
							return res.
								status(status.INTERNAL_SERVER_ERROR).
								json({ error: error.toString() });
						}
						data.done = todos;
						return res.json({ todos: data });
					});
				});
			});
		}
	}));

	api.get('/todos/count', wagner.invoke(function(TODO) {
		return function(req, res) {
			TODO.aggregate([{ $group: { _id: {status: '$status'}, count: {$sum: 1}}}], function(error, data) {
				if(error) {
					return res.
						status(status.INTERNAL_SERVER_ERROR).
						json({ error: error.toString() });
				}
				if (!data) {
					return res.
						status(status.NOT_FOUND).
						json({ error: 'NOT FOUND' });
				}
				var count_arr = {};
				_.each(data,function(element){
					count_arr[element._id.status] = element.count;
				});
				return res.json({ counts: count_arr });
			});
		}
	}));

	api.post('/todos/add', wagner.invoke(function(TODO) {
		return function(req, res) {
			var todo = new TODO(req.body.todo);
			console.log(todo);
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

	api.post('/todos/update/:id', wagner.invoke(function(TODO) {
		return function(req, res) {
			TODO.findById(req.params.id, function(error, todo) {
				console.log(todo);
				todo.update(req.body.todo, {upsert:true}, function(error, todo) {
					if(error) {
						return res.
							status(status.INTERNAL_SERVER_ERROR).
							json({ error: error.toString() });
					}
					return res.json({ todo: todo});
				});
			});
		}
	}));

	api.post('/todos/delete/:id', wagner.invoke(function(TODO) {
		return function(req, res) {
			TODO.remove({ _id: req.params.id}, function(error) {
				if(error) {
						return res.
							status(status.INTERNAL_SERVER_ERROR).
							json({ error: error.toString() });
					}
					return res.json({});
			});
		}
	}));

	return api;
}