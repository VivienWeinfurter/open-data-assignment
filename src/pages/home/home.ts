import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ArtistProvider } from '../../providers/artist/artist';
import { SongsPage } from '../songs/songs';

/**
 * @author Vivien Weinfurter <k8wevi00@students.oamk.fi> 
*/

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  artists: any;
  artists2: any;

  constructor(public navCtrl: NavController, private artistProvider: ArtistProvider) {
    this.showAllArtists();
  }
  
  showAllArtists(){
    this.artistProvider.getAllArtist().then(data => {
      this.artists = data;
      this.sortResults('name', true);
    }, err => {
      console.log("Error" + err);
    });
  }
  
  // Sort artists name asc
  sortResults(prop, asc) {
    this.artists.sort(function(a, b) {
        if (asc) {
            return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
        } else {
            return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
        }
    });
  }
  
  showSongs(id: string, name: string) {
    this.navCtrl.push(SongsPage, {
      artistID: id, artistName: name
    })
  }
  
  getArtist(event: any) {
    this.artists2 = this.artists;
    const val = event.target.value;
    if (val && val.trim() != '') {
      this.artists2 = this.artists2.filter((artist) => {
        return (artist.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
