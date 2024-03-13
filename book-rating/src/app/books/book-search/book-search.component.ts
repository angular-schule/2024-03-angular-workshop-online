import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, debounceTime, filter, switchMap } from 'rxjs';
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
    filter(term => term.length >= 3),
    debounceTime(300),
    switchMap(term => this.bs.search(term))
  );

  constructor(private bs: BookStoreService) {}
}
