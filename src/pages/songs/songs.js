"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
var chart_js_1 = require('chart.js');
var SongsPage = (function () {
    function SongsPage(navCtrl, navParams, songsProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.songsProvider = songsProvider;
        this.coloR = [];
        this.artistID = navParams.get('artistID');
        this.artistName = navParams.get('artistName');
    }
    SongsPage.prototype.ionViewDidLoad = function () {
        this.showSongs();
    };
    SongsPage.prototype.showSongs = function () {
        var _this = this;
        this.songsProvider.getSongs(this.artistID).then(function (data) {
            _this.songs = data;
            if (_this.songs != "") {
                _this.sortResults('title', true);
                _this.hasSongs = true;
                _this.countYears();
                _this.drawDoughnutChart();
            }
            if (_this.songs == "") {
                _this.hasSongs = false;
                alert('Sorry, but there are no songs from this artist in our database.');
            }
        }, function (err) {
            console.log("Error" + err);
        });
    };
    SongsPage.prototype.sortResults = function (prop, asc) {
        this.songs.sort(function (a, b) {
            if (asc) {
                return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
            }
            else {
                return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
            }
        });
    };
    SongsPage.prototype.countYears = function () {
        var i;
        var years = [];
        // get years
        for (i = 0; i < this.songs.length; i++) {
            var str = this.songs[i].released;
            console.log(str);
            if (str != null) {
                var date = str.substring(6, 10);
                console.log(date);
                years.push(date);
            }
        }
        // count the same years
        var yearsNumber = years.reduce(function (prev, cur) {
            prev[cur] = (prev[cur] || 0) + 1;
            return prev;
        }, {});
        console.log(yearsNumber);
        this.years = Object.keys(yearsNumber);
        console.log(this.years);
        //this.counterYears = Object.values(yearsNumber); //doesn't work with typescript
        this.counterYears = Object.keys(yearsNumber).map(function (key) { return yearsNumber[key]; });
        console.log(this.counterYears);
    };
    SongsPage.prototype.drawDoughnutChart = function () {
        // create color for each year
        for (var i = 0; i < this.counterYears.length; i++) {
            var c = this.dynamicColors();
            this.coloR.push(c);
        }
        console.log(this.coloR);
        this.doughnutChart = new chart_js_1.Chart(this.doughnutCanvas.nativeElement, {
            type: 'doughnut',
            data: {
                options: {
                    ledgent: {
                        boxWidth: labels, this: .years
                    }
                },
                datasets: [{
                        label: '# of Votes',
                        data: this.counterYears,
                        backgroundColor: this.coloR,
                        hoverBackgroundColor: this.coloR
                    }]
            }
        });
    };
    // randomize colors
    SongsPage.prototype.dynamicColors = function () {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + "," + b + ")";
    };
    __decorate([
        core_1.ViewChild('doughnutCanvas')
    ], SongsPage.prototype, "doughnutCanvas");
    SongsPage = __decorate([
        ionic_angular_1.IonicPage(),
        core_1.Component({
            selector: 'page-songs',
            templateUrl: 'songs.html'
        })
    ], SongsPage);
    return SongsPage;
}());
exports.SongsPage = SongsPage;
