import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, debounceTime, filter, iif, of, switchMap } from 'rxjs';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-book-search',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './book-search.component.html',
  styleUrl: './book-search.component.scss'
})
export class BookSearchComponent {
  searchForm = new FormControl('', { nonNullable: true });

  books$ = this.searchForm.valueChanges.pipe(
    debounceTime(300),
    /*switchMap(term => {
      if (term.length >= 3) {
        return this.bs.search(term)
      } else {
        return of([]);
      }
    }),*/
    switchMap(term => iif(
      () => term.length >= 3,
      this.bs.search(term),
      of([])
    ))
  );

  constructor(private bs: BookStoreService) {}
}
