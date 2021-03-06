var _ = require('underscore');

module.exports.launch = function (wagner) {

	//bootsrap the model data
	wagner.invoke(function(Status) {
		var statuses = [
			{_id: 'inProgress', label: 'In Progress'},
			{_id: 'pending', label: 'Pending'},
			{_id: 'done', label: 'Done'}
		];
		_.each(statuses, function(element) {
			var status = new Status(element);
			status.save(function(error, status) {
					if(error) {
						console.log({ error: error.toString() });
					}
				});
		});
	});

	wagner.invoke(function(Type) {
		var types = [
			{_id: 'action', label: 'Action'},
			{_id: 'followup', label: 'Follow-Up'}
		];
		_.each(types, function(element) {
			var type = new Type(element);
			type.save(function(error, type) {
					if(error) {
						console.log({ error: error.toString() });
					}
				});
		});
	});
}