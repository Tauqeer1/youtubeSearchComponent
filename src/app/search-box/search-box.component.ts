import {Component, OnInit, EventEmitter, ElementRef } from '@angular/core';
import { YoutubeService } from "../youtube.service";
import { SearchResult } from "../search.model";
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'search-box',
  outputs: ['loading', 'results'],
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

  loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  results: EventEmitter<SearchResult[]> = new EventEmitter<SearchResult[]>();

  constructor(private youtube:YoutubeService, private el:ElementRef) {
  }

  ngOnInit(): void {
    // Convert the 'keyup' event into an observable stream
    Observable.fromEvent(this.el.nativeElement, 'keyup')
      .map((e:any) => e.target.value) // extract the value of the input
      .filter((text:string) => text.length > 1) // filter out if empty
      .debounceTime(250) // only once every 250ms
      .do(() => this.loading.next(true)) // enable loading
      .map((query:string) => this.youtube.search(query)) // search, discarding old events if new input comes in
      .switch()
      // act on the return of the search
      .subscribe((results:SearchResult[]) => { // on sucesss
          this.loading.next(false);
          this.results.next(results);
        },
        (err:any) => { // on error
          console.log(err);
          this.loading.next(false);
        },
        () => { // on completion
          this.loading.next(false);
        }
      );
  }

}
