exports.AppBootsrapConfig = function ($http, $q) {

	var data = [];

	var query = function() {
		var promises = [
			$http.
			get('/api/statuses'),
			$http.
			get('/api/types')
		];
		return $q.all(promises);
	}
	return {
		query : query
	};
}