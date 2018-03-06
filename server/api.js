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
	api.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  next();
	});

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
	api.get('/todos/today', wagner.invoke(function(TODO) {
		return function(req, res) {
			var data = {};
			var today = new Date().setHours(0,0,0,0); // last midnight
			console.log(today);
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
					.find({status: 'done', closureDate: {"$gte": today} }, {}, {sort: {eta: 1}}, function(error, todos) {
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

	api.get('/todos/archive', wagner.invoke(function(TODO) {
		return function(req, res) {
			var data = {};
			var today = new Date().setHours(0,0,0,0); // last midnight
			console.log(today);
			TODO
			//.find({status: 'done', $or:[ {closureDate: {"$lt": today}}, {closureDate: {$exists: false}} ]}, {}, {sort: {eta: 1}}, function(error, todos) {
			.find({$nor :[ {status: 'done'},{status: 'inProgress'},{status: 'pending'}  ]}, {}, {sort: {eta: 1}}, function(error, todos) {
				if(error) {
					return res.
						status(status.INTERNAL_SERVER_ERROR).
						json({ error: error.toString() });
				}
				return res.json({ todos: todos });
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

	api.get('/todos/overdue', wagner.invoke(function(TODO) {
		return function(req, res) {
			var data = {};
			var now = new Date();
			TODO
			.find({ $or:[ {'status':'pending'}, {'status':'inProgress'} ], eta: {"$lte": now}}, {}, {sort: {eta: 1}}, function(error, data) {
				if(error) {
					return res.
						status(status.INTERNAL_SERVER_ERROR).
						json({ error: error.toString() });
				}
				return res.json({ todos: data });
			});
		}
	}));

	api.post('/todos/add', wagner.invoke(function(TODO) {
		return function(req, res) {
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

	api.post('/todos/update/:id', wagner.invoke(function(TODO) {
		return function(req, res) {
			TODO.findById(req.params.id, function(error, todo) {
				var now = new Date();
				var req.body.todo.closureDate = (!req.body.todo.closureDate && req.body.todo.status === 'done' && now);
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

	api.post('/todos/update/workflow/:id', wagner.invoke(function(TODO) {
		return function(req, res) {
			TODO.findById(req.params.id, function(error, todo) {				
				var now = new Date();
				var workflow = (req.body.status === 'done' && { status : req.body.status, closureDate : now }) ||
							   (req.body.status  !== 'done' && { status : req.body.status });
				todo.update(workflow, {upsert:true}, function(error, todo) {
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