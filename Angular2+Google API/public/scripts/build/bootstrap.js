"use strict";
var angular2_1 = require('angular2/angular2');
var router_1 = require('angular2/router');
var achievementsService_1 = require('./services/achievementsService');
var http_1 = require('angular2/http');
var forms_1 = require('angular2/forms');
var appointmentsservice_1 = require('./services/appointmentsservice');
var authenticationservice_1 = require('./services/authenticationservice');
var calendarService_1 = require('./services/calendarService');
var app_1 = require('./components/app/app');
angular2_1.bootstrap(app_1.MyApp, [router_1.routerInjectables, http_1.httpInjectables, forms_1.formInjectables, achievementsService_1.AchievementsService, appointmentsservice_1.AppointmentsService, authenticationservice_1.AuthenticationService, calendarService_1.CalendarService]);

//# sourceMappingURL=../maps/bootstrap.js.map
