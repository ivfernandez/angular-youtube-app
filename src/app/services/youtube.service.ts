import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { YoutubeResponse } from '../models/youtube.models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeUrl    = 'https://www.googleapis.com/youtube/v3';
  private apiKey       = 'AIzaSyC0zll75H4Cp7tDsOT74HOWrfvmfAewL_o';
  private playlist      = 'UUlx9gLfTq0gX8oC0j_nkAGw';
  private nextPageToken = '';

  constructor(private http: HttpClient) { 

  }


  getVideos() {

    const url = `${ this.youtubeUrl }/playlistItems`;

    const params = new HttpParams().set('part', 'snippet')
                                   .set('maxResults', '10')
                                   .set('playlistId', this.playlist)
                                   .set('key', this.apiKey)
                                   .set('pageToken', this.nextPageToken)

    
    return this.http.get<YoutubeResponse>(url, { params })
             .pipe(

               //Como en este map tengo mas de 1 linea, tengo que usar llaves y el return
               map(resp => {
                this.nextPageToken = resp.nextPageToken;
                return resp.items;
               }),

               //Como en este map tengo una sola linea, no hace falta usar llaves ni el return
               map(items => items.map(video => video.snippet))

             )

  }


}

