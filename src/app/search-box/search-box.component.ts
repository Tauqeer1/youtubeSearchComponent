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
    Observable.fromEvent(this.el.nativeElement, 'keyup')
      .map((e:any) => e.target.value)
      .filter((text:string) => text.length > 1)
      .debounceTime(250)
      .do(() => this.loading.next(true))
      .map((query:string) => this.youtube.search(query))
      .switch()
      .subscribe((results:SearchResult[]) => {
          this.loading.next(false);
          this.results.next(results);
        },
        (err:any) => {
          console.log(err);
          this.loading.next(false);
        },
        () => {
          this.loading.next(false);
        }
      );
  }

}
