import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EMPTY, Observable, catchError, filter, map, switchMap } from 'rxjs';
import { BookStoreService } from '../shared/book-store.service';
import { Book } from '../shared/book';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [RouterLink, AsyncPipe, JsonPipe],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
export class BookDetailsComponent {
  book$: Observable<Book>;

  constructor(private route: ActivatedRoute, private bs: BookStoreService) {
    // PULL
    // const isbn = this.route.snapshot.paramMap.get('isbn') // path: 'books/:isbn'

    // PUSH
    this.book$ = this.route.paramMap.pipe(
      map(params => params.get('isbn')!),
      // filter((isbn): isbn is string => isbn !== null), // wenn man auf Non-Null Assertion verzichten möchte
      switchMap(isbn => this.bs.getSingle(isbn)),
    );

    /*combineLatest([
      this.route.paramMap,
      this.route.queryParamMap,
    ]).subscribe(e => console.log(e))*/
  }
}
