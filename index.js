var controllers = require('./controllers.js');
var directives = require('./directives.js');
var services = require('./services.js');
var _ = require('underscore');

var app = angular.module('myApp', ['ng']);

_.each( controllers, function (controller, name) {
	app.controller(name, controller);
});

_.each( directives, function (directive, name) {
	app.directive(name, directive);
});

_.each( services, function (service, name) {
	app.factory(name, service);
});

/* This script starts the express server */
/*var mongoose = require('mongoose');
var server = require('./server.js');

mongoose.connect('mongodb://127.0.0.1:27017/test');

server().listen(3000);
console.log('Server listening on port 3000!');*/