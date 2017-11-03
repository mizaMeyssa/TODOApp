var express = require('express');
var mongoose = require('mongoose');

var server = express();
server.use(express.static('./', { maxAge: 4 * 60 * 60 * 1000 /* 2hrs */}));
server.listen(3000);
console.log('Server listening on port 3000!');

mongoose.connect('mongodb://127.0.0.1:27017/test');