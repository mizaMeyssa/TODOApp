var controllers = require('./components/controllers.js');
var directives = require('./components/directives.js');
var services = require('./components/services.js');
var _ = require('underscore');

// 1st module: define the SPA components 
var components = angular.module('myApp.components', ['ng']);

_.each( controllers, function (controller, name) {
	components.controller(name, controller);
});

_.each( directives, function (directive, name) {
	components.directive(name, directive);
});

_.each( services, function (service, name) {
	components.factory(name, service);
});

// 1st module: define the SPA routing
var app = angular.module('myApp', ['myApp.components', 'ngRoute', 'ui.bootstrap']);

app.config(function ($routeProvider) {
	$routeProvider.
		when('/dashboard', {
			template: '<todo-counter></todo-counter>'
		}).
		when('/workload/today', {
			template: '<todo-list></todo-list>'
		})
});

app
.value('AppBootstrapData', {});