import { Component } from '@angular/core';
import {SearchResult} from "./search.model";
let loadingGif: string = ((<any>window).__karma__) ? '' : require('../assets/images/loading.gif');

@Component({
  selector: 'youtube-search',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class YoutubeSearchComponent {

  results: SearchResult[];


  updateResults(results: SearchResult[]): void {
    this.results = results;
  }



}
