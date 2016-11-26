import { Component } from '@angular/core';
import {SearchResult} from "./search.model";

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
