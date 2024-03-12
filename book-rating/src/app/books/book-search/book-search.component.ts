import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './book-search.component.html',
  styleUrl: './book-search.component.scss'
})
export class BookSearchComponent {
  searchForm = new FormControl('', { nonNullable: true });

  constructor() {
    this.searchForm.valueChanges.subscribe(e => {
      console.log(e);
    });
  }
}
