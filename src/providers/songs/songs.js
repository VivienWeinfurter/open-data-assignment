"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var SongsProvider = (function () {
    function SongsProvider(http) {
        this.http = http;
        this.urlSongs = 'https://musicdemons.com/api/v1/artist/';
        console.log('Hello SongsProvider Provider');
    }
    SongsProvider.prototype.getSongs = function (artistID) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.urlSongs + artistID + '/songs').subscribe(function (data) {
                resolve(data);
            }, function (error) {
                reject("Error retrieving artist.");
            });
        });
    };
    SongsProvider = __decorate([
        core_1.Injectable()
    ], SongsProvider);
    return SongsProvider;
}());
exports.SongsProvider = SongsProvider;
