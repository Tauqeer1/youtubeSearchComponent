
import { Http, Response } from '@angular/http';
import {Injectable, Inject} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {SearchResult} from "./search.model";

export var YOUTUBE_API_KEY: string = 'AIzaSyDOfT_BO81aEZScosfTYMruJobmpjqNeEk';
export var YOUTUBE_API_URL: string = 'https://www.googleapis.com/youtube/v3/search';


@Injectable()
export class YoutubeService {

  constructor(private http: Http,
                      @Inject(YOUTUBE_API_KEY) private apiKey: string,
                      @Inject(YOUTUBE_API_URL) private apiUrl: string){

  }

  search(query: string): Observable<SearchResult[]> {
    let params: string = [
      `q=${query}`,
      `key=${this.apiKey}`,
      `part=snippet`,
      `type=video`,
      `maxResults=10`
    ].join('&');

    let queryUrl: string = `${this.apiUrl}?${params}`;
    return this.http.get(queryUrl)
      .map((response: Response) => {
        return (<any>response.json()).items.map(item => {
          return new SearchResult({
            id: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnailUrl: item.snippet.thumbnails.high.url
          });
        });
      });
  }
}

export var youtubeServiceInjectables: any[] = [
  {provide: YoutubeService, useClass: YoutubeService},
  {provide: YOUTUBE_API_KEY, useValue: YOUTUBE_API_KEY},
  {provide: YOUTUBE_API_URL, useValue: YOUTUBE_API_URL}
];
