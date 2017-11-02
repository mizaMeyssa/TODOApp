var mongoose = require('mongoose');
var TODOSchema = require('./todo.js');
var server = require('./server.js');

mongoose.connect('mongodb://127.0.0.1:27017/test');

server().listen(3000);
console.log('Server listening on port 3000!');

//@params (model_name, schema_name, collection) 
/*var TODOModel = mongoose.model('TODOModel', TODOSchema, 'todos');

var todo = new TODOModel({
	title: 'Test 1',
	description: 'Test Description 1',
});

todo.save(function (error) {
	if (error) {
		console.log(error);
		process.exit(1);
	}
	TODOModel.find({ title: 'Test 1'}, function(error, docs){
		if (error) {
			console.log(error);
			process.exit(1);
		}
		console.log(require('util').inspect(docs));
		process.exit(0);
	});
});*/