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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var angular2_1 = require('angular2/angular2');
var settings_1 = require('../../settings');
var achievementsService_1 = require('../../services/achievementsService');
var di_1 = require('angular2/di');
var Home = (function () {
    function Home(achievementsService) {
        var _this = this;
        this.achievementsService = achievementsService;
        achievementsService.getAllAchievements()
            .map(function (r) { return r.json(); })
            .subscribe(function (a) {
            _this.achievements = a;
        });
    }
    Home = __decorate([
        angular2_1.Component({
            selector: 'home',
            injectables: [achievementsService_1.AchievementsService]
        }),
        angular2_1.View({
            templateUrl: settings_1._settings.buildPath + "/components/home/home.html",
            directives: [angular2_1.NgFor]
        }),
        __param(0, di_1.Inject(achievementsService_1.AchievementsService)), 
        __metadata('design:paramtypes', [achievementsService_1.AchievementsService])
    ], Home);
    return Home;
}());
exports.Home = Home;

//# sourceMappingURL=../../../maps/components/home/home.js.map
