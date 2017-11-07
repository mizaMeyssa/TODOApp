exports.appBootsrapConfig = function ($http, $q) {

	var defer = $q.defer();
	var data = [];

	var query = function() {
		$http.
		get('/api/statuses').
		success(function(data) {
			data.statuses = data.statuses;
			defer.resolve(data);
		}).
		error(function(data, $status) {
			defer.reject([]);
		});
		return defer.promise;
	}
	return {
		query : query
	};
}