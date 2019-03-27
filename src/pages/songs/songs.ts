import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SongsProvider } from '../../providers/songs/songs';
import { Chart } from 'chart.js';

/**
 * @author Vivien Weinfurter <k8wevi00@students.oamk.fi> 
*/

@IonicPage()
@Component({
  selector: 'page-songs',
  templateUrl: 'songs.html',
})
export class SongsPage {
  
  @ViewChild('doughnutCanvas') doughnutCanvas;
  doughnutChart: any;
  
  songs: any;
  artistID: string;
  artistName: string;
  
  years: any;
  counterYears: any;
  coloR = [];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private songsProvider: SongsProvider) {
    this.artistID = navParams.get('artistID');
    this.artistName = navParams.get('artistName');
  }

  ionViewDidLoad() {
    this.showSongs();
  }
  
  showSongs() {
    this.songsProvider.getSongs(this.artistID).then(data => {
      this.songs = data;
      
      if(this.songs != "") {
        this.sortResults('title', true);
        this.countYears();
        this.drawDoughnutChart();
      }
      if(this.songs == ""){ 
        alert('Sorry, but there are no songs from this artist in our database.');
      }
      
    }, err => {
      console.log("Error" + err);
    });
  }
  
  sortResults(prop, asc) {
    this.songs.sort(function(a, b) {
        if (asc) {
            return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
        } else {
            return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
        }
    });
  }
  
  countYears() {
    var i;
    var years = [];
    
    // get years
    for (i=0; i< this.songs.length; i++) {
      var str = this.songs[i].released;
      console.log(str);
      if(str != null) {
        var date = str.substring(6,10); 
        years.push(date);
      }
    }
    
    // count the same years
    var yearsNumber = years.reduce(function(prev, cur) {
      prev[cur] = (prev[cur] || 0) + 1;
      return prev;
      }, {});
      
      this.years = Object.keys(yearsNumber);
      //this.counterYears = Object.values(yearsNumber); //doesn't work with typescript
      this.counterYears = Object.keys(yearsNumber).map(key => yearsNumber[key]);
  }
  
  drawDoughnutChart() {
    // create color for each year
    for (var i = 0; i < this.counterYears.length; i++) {
      var c = this.dynamicColors();
      this.coloR.push(c);
    }
    
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

            type: 'doughnut',
            data: {
                labels: this.years,

                datasets: [{
                    label: '# of Votes',
                    data: this.counterYears,
                    backgroundColor: this.coloR,
                    hoverBackgroundColor: this.coloR,
                }]
            },
            options: {
              //responsive: false,
              legend: {
                display: false,
                // position: 'left',
                // labels: {
                //   boxWidth: 10,
                //   position: 'left',
                // }
              }
            }
        });
  }
  
  // randomize colors
  dynamicColors() {
      var r = Math.floor(Math.random() * 255);
      var g = Math.floor(Math.random() * 255);
      var b = Math.floor(Math.random() * 255);
      return "rgb(" + r + "," + g + "," + b + ")";
  }

}
