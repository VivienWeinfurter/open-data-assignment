import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * @author Vivien Weinfurter <k8wevi00@students.oamk.fi> 
*/

@Injectable()
export class ArtistProvider {
  
  readonly urlArtists: string = 'https://musicdemons.com/api/v1/artist';
  
  constructor(public http: HttpClient) {
    console.log('Hello ArtistProvider Provider');
  }
  
  getAllArtist() {
    return new Promise ((resolve, reject) => {
      this.http.get(this.urlArtists).subscribe(data => {
        resolve(data)
      }, error => {
        reject("Error retrieving artist.")
      });
    });
  }

  
}
