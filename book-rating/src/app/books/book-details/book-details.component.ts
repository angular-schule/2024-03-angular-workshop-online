import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { combineLatest } from 'rxjs';
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
    // TODO: Verschachtelte Subscriptions vermeiden
    this.route.paramMap.subscribe(params => {
      const isbn = params.get('isbn')!; // Non-Null Assertion
      this.bs.getSingle(isbn).subscribe(b => {
        this.book = b;
      })
    });

    /*combineLatest([
      this.route.paramMap,
      this.route.queryParamMap,
    ]).subscribe(e => console.log(e))*/
  }
}
