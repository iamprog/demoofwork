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
var appointments_1 = require('../views/appointments');
var authenticationservice_1 = require('../../services/authenticationservice');
var appointmentsservice_1 = require('../../services/appointmentsservice');
var calendarService_1 = require('../../services/calendarService');
var settings_1 = require('../../settings');
var Calendars = (function () {
    function Calendars(authenticationService, calendarService, appointmentService, elementRef) {
        this.elementRef = elementRef;
        this.calendarlist = [{ summary: 'Please refresh view', id: 'none' }];
        this.attendees = [{ email: '', invitenum: 0 }];
        this.most = '';
        this.appointments = [{ title: 'Please select calendar', time: 0, invite: 0 }];
        this.timemin = new Date();
        this.timemax = new Date();
        this.timemax.setHours(23, 59, 59);
        this.timemin.setHours(0, 0, 0);
        this.authenticationService = authenticationService;
        this.appointmentService = appointmentService;
        this.calendarService = calendarService;
    }
    Calendars.prototype.refreshAppointments = function () {
        var _this = this;
        this.calendarService.loadCalendarlists().then(function (newcalendars) {
            _this.calendarlist.splice(0, _this.calendarlist.length);
            _this.calendarlist.push.apply(_this.calendarlist, newcalendars);
            console.log('displaying ' + _this.calendarlist.length + ' calendars');
        });
    };
    Calendars.prototype.viewevents = function () {
        var _this = this;
        this.appointmentService.loadAppointments(this.calendarid, this.timemax, this.timemin).then(function (newAppointments) {
            _this.appointments.splice(0, _this.appointments.length);
            _this.attendees.splice(0, _this.attendees.length);
            _this.appointments.push.apply(_this.appointments, newAppointments);
            _this.attendees.push.apply(_this.attendees, _this.appointmentService.attendees);
            console.log('displaying ' + _this.appointments.length + ' appointments');
            var max;
            var temp;
            if (_this.attendees.length != 0) {
                max = _this.attendees[0].invitenum;
                for (var i = 1; i < _this.attendees.length; i++) {
                    if (max < _this.attendees[i].invitenum) {
                        max = _this.attendees[i].invitenum;
                    }
                }
                console.log("max" + max);
                for (var i = 0; i < _this.attendees.length; i++) {
                    if (_this.attendees[i].invitenum == max) {
                        _this.most = _this.most + "   " + _this.attendees[i].email;
                    }
                }
            }
        });
    };
    Calendars.prototype.rangefilter = function (value) {
        var min;
        var max;
        var d = value.split(" ~ ");
        min = d[0];
        max = d[1];
        this.timemin = new Date(min);
        this.timemax = new Date(max);
        this.viewevents();
        console.log(this.timemin);
        console.log(this.timemax);
    };
    Calendars.prototype.setdata = function () {
        alert('It works!');
    };
    Calendars.prototype.selectcalendar = function (calendar) {
        this.calendarid = calendar.id;
        this.calendar = calendar.summary;
        console.log(this.calendarid);
        this.viewevents();
    };
    Calendars.prototype.setdate = function (datarange) {
        this.timemax = new Date();
        this.timemin = new Date();
        if (datarange == 'lastmonth') {
            var date = new Date();
            var lastmonth = date.getMonth() - 1;
            this.timemax.setMonth(lastmonth + 1);
            this.timemin.setMonth(lastmonth);
            this.timemax.setDate(0);
            this.timemin.setDate(1);
        }
        if (datarange == 'lastweek') {
            var date = new Date();
            this.timemin.setDate(date.getDate() - 7);
            this.timemax.setHours(23, 59, 59);
            this.timemin.setHours(0, 0, 0);
        }
        if (datarange == 'lastday') {
            var date = new Date();
            var lastday = date.getDate() - 1;
            this.timemax.setDate(lastday);
            this.timemin.setDate(lastday);
            this.timemax.setHours(23, 59, 59);
            this.timemin.setHours(0, 0, 0);
        }
        if (datarange == 'today') {
            var date = new Date();
            var today = date.getDate();
            this.timemax.setDate(today);
            this.timemin.setDate(today);
            this.timemax.setHours(23, 59, 59);
            this.timemin.setHours(0, 0, 0);
        }
        if (datarange == 'nextday') {
            var date = new Date();
            var nextday = date.getDate() + 1;
            this.timemax.setDate(nextday);
            this.timemin.setDate(nextday);
            this.timemax.setHours(23, 59, 59);
            this.timemin.setHours(0, 0, 0);
        }
        if (datarange == 'nextweek') {
            var date = new Date();
            this.timemax.setDate(date.getDate() + 7);
            this.timemax.setHours(23, 59, 59);
            this.timemin.setHours(0, 0, 0);
        }
        if (datarange == 'nextmonth') {
            var date = new Date();
            var nextmonth = date.getMonth() + 1;
            if (date.getMonth() == 11) {
                this.timemax.setMonth(0);
                this.timemax.setDate(31);
                this.timemax.setFullYear(date.getFullYear() + 1);
            }
            else {
                this.timemax.setMonth(nextmonth + 1);
                this.timemax.setDate(0);
            }
            this.timemin.setMonth(nextmonth);
            this.timemin.setDate(1);
        }
        console.log(this.timemax);
        console.log(this.timemin);
        console.log(this.calendarid);
        this.viewevents();
    };
    Calendars = __decorate([
        angular2_1.Component({
            selector: 'calendars'
        }),
        angular2_1.View({
            templateUrl: settings_1._settings.buildPath + '/components/views/calendars.html',
            directives: [angular2_1.NgFor, angular2_1.NgIf, appointments_1.Appointments]
        }), 
        __metadata('design:paramtypes', [authenticationservice_1.AuthenticationService, calendarService_1.CalendarService, appointmentsservice_1.AppointmentsService, (typeof (_a = typeof angular2_1.ElementRef !== 'undefined' && angular2_1.ElementRef) === 'function' && _a) || Object])
    ], Calendars);
    return Calendars;
    var _a;
}());
exports.Calendars = Calendars;

//# sourceMappingURL=../../../maps/components/views/calendars.js.map
