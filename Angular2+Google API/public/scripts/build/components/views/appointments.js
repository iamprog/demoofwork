"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var appointmentsservice_1 = require('../../services/appointmentsservice');
var authenticationservice_1 = require('../../services/authenticationservice');
var settings_1 = require('../../settings');
var Appointments = (function () {
    function Appointments(appointmentService, authenticationService) {
        this.authenticationService = authenticationService;
        this.appointmentService = appointmentService;
    }
    Appointments = __decorate([
        angular2_1.Component({
            selector: 'a2os-appointments'
        }),
        angular2_1.View({
            templateUrl: settings_1._settings.buildPath + '/components/views/appointments.html',
            directives: [angular2_1.NgFor, angular2_1.NgIf]
        }), 
        __metadata('design:paramtypes', [appointmentsservice_1.AppointmentsService, authenticationservice_1.AuthenticationService])
    ], Appointments);
    return Appointments;
}());
exports.Appointments = Appointments;

//# sourceMappingURL=../../../maps/components/views/appointments.js.map
