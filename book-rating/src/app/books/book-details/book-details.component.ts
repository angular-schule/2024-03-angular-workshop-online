import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';
import { BookStoreService } from '../shared/book-store.service';
import { Book } from '../shared/book';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
export class BookDetailsComponent {
  book?: Book;

  constructor(private route: ActivatedRoute, private bs: BookStoreService) {
    // PULL
    // const isbn = this.route.snapshot.paramMap.get('isbn') // path: 'books/:isbn'

    // PUSH

    this.route.paramMap.pipe(
      map(params => params.get('isbn')!),
      // filter((isbn): isbn is string => isbn !== null), // wenn man auf Non-Null Assertion verzichten möchte
      switchMap(isbn => this.bs.getSingle(isbn))
    ).subscribe(b => {
      this.book = b;
    })

    /*combineLatest([
      this.route.paramMap,
      this.route.queryParamMap,
    ]).subscribe(e => console.log(e))*/
  }
}
