import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * @author Vivien Weinfurter <k8wevi00@students.oamk.fi> 
*/

@Injectable()
export class SongsProvider {
  
  readonly urlSongs: string = 'https://musicdemons.com/api/v1/artist/';

  constructor(public http: HttpClient) {
    console.log('Hello SongsProvider Provider');
  }
  
  getSongs(artistID: string) {
    return new Promise ((resolve, reject) => {
      this.http.get(this.urlSongs + artistID + '/songs').subscribe(data => {
        resolve(data)
      }, error => {
        reject("Error retrieving artist.")
      });
    });
  }

}
