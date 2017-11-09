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

/*
 * We put here the run block that will take place during the bootstrap process
 */
app
.run(function(AppBootsrapConfig, AppBootstrapData) {
	// To DO move this to dashboard controller
	AppBootsrapConfig
		.query()
		.then(function (data) {
			var bootstrapData = [];
			bootstrapData.statuses = data[0].data.statuses;
			bootstrapData.types = data[1].data.types;
			angular.extend(AppBootstrapData, bootstrapData);
		});
});