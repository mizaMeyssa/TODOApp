var express = require('express');
var wagner = require('wagner-core');

require('./db/models.js')(wagner);
var data_bootsrapper = require('./init.js');

var server = express();

// App server configuration
server.use(express.static('./', { maxAge: 4 * 60 * 60 * 1000 /* 2hrs */}));
server.use('/api', require('./api.js')(wagner));

if (process.argv[2] === "INIT") {
	data_bootsrapper.launch(wagner);
}

//DB Server configuration
server.listen(3000);
console.log('Server listening on port 3000!');