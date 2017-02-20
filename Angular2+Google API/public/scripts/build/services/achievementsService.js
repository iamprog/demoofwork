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
var di_1 = require('angular2/di');
var http_1 = require('angular2/http');
var AchievementsService = (function () {
    function AchievementsService(http) {
        this.http = http;
    }
    AchievementsService.prototype.getAchievementsOfType = function (type) {
        var path = '/api/achievements/' + type;
        return this.http.get(path);
    };
    AchievementsService.prototype.getAllAchievements = function () {
        var path = '/api/achievements';
        return this.http.get(path);
    };
    AchievementsService.prototype.addAnAchievement = function (newAchievement) {
        var path = '/api/achievements';
        return this.http.post(path, JSON.stringify(newAchievement));
    };
    AchievementsService = __decorate([
        __param(0, di_1.Inject(http_1.Http)), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AchievementsService);
    return AchievementsService;
}());
exports.AchievementsService = AchievementsService;

//# sourceMappingURL=../../maps/services/achievementsService.js.map
