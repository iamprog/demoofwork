"use strict";
var AuthenticationService = (function () {
    function AuthenticationService() {
        this.isAuthenticated = false;
        this.internalAuthenticate(true);
    }
    AuthenticationService.prototype.login = function () {
        console.log('proceed login');
        this.internalAuthenticate(false);
    };
    AuthenticationService.prototype.logout = function () {
        console.log('proceed logout');
        this.isAuthenticated = false;
        this.setUserData('', '');
        window.fetch(AuthenticationService.logoutUrl + gapi.auth.getToken().access_token, { mode: 'no-cors' });
    };
    AuthenticationService.prototype.internalAuthenticate = function (immediate) {
        var _this = this;
        return this.proceedAuthentication(immediate)
            .then(function () { return _this.initializeGooglePlusAPI(); })
            .then(function () { return _this.initializeGoogleCalendarAPI(); })
            .then(function () { return _this.loadGooglePlusUserData(); })
            .then(function (response) { return _this.setUserData(response.result.emails[0].value, response.result.image.url); })
            .catch(function (error) { console.log('authentication failed: ' + error); });
    };
    AuthenticationService.prototype.proceedAuthentication = function (immediate) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log('proceed authentication - immediate: ' + immediate);
            gapi.client.setApiKey(AuthenticationService.apiKey);
            var authorisationRequestData = {
                'client_id': AuthenticationService.clientId,
                'scope': AuthenticationService.scopes,
                'immediate': immediate
            };
            gapi.auth.authorize(authorisationRequestData, function (authenticationResult) {
                if (authenticationResult && !authenticationResult.error) {
                    _this.isAuthenticated = true;
                    _this.setUserData('unknown', '');
                    resolve();
                }
                else {
                    _this.isAuthenticated = false;
                    _this.setUserData('', '');
                    reject();
                }
            });
        });
    };
    AuthenticationService.prototype.initializeGooglePlusAPI = function () {
        return new Promise(function (resolve, reject) {
            console.log('initialize Google Plus API');
            resolve(gapi.client.load('plus', 'v1'));
        });
    };
    AuthenticationService.prototype.initializeGoogleCalendarAPI = function () {
        return new Promise(function (resolve, reject) {
            console.log('initialize Google Calendar API');
            resolve(gapi.client.load('calendar', 'v3'));
        });
    };
    AuthenticationService.prototype.loadGooglePlusUserData = function () {
        return new Promise(function (resolve, reject) {
            console.log('load Google Plus data');
            resolve(gapi.client.plus.people.get({ 'userId': 'me' }));
        });
    };
    AuthenticationService.prototype.setUserData = function (userName, userImageUrl) {
        this.userName = userName;
        this.userImageUrl = userImageUrl;
        console.log('user: ' + this.userName + ', image: ' + this.userImageUrl);
    };
    AuthenticationService.clientId = '551098082224-trnrafkt265uasioeib02bs0qf6dmjmo.apps.googleusercontent.com';
    AuthenticationService.apiKey = 'AIzaSyA--Geq9f04wIRsHgx7sNSr3NbWN7MVSB4';
    AuthenticationService.scopes = ['https://www.googleapis.com/auth/plus.me', 'https://www.googleapis.com/auth/calendar.readonly', 'https://www.googleapis.com/auth/userinfo.email'];
    AuthenticationService.logoutUrl = 'https://accounts.google.com/o/oauth2/revoke?token=';
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;

//# sourceMappingURL=../../maps/services/authenticationservice.js.map
