import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../shared/book';
import { RatingComponent } from '../rating/rating.component';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [RatingComponent, CurrencyPipe, RouterLink],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {
  // hier dürfen Daten hineinfließen von der Elternkomponente
  // von oben nach unten
  @Input() book?: Book;

  @Input() minRating = 0;
  @Input() maxRating = 10;

  // hier fließen Daten hinaus zur Elternkomponente
  // von unten nach oben
  @Output() rateUp = new EventEmitter<Book>();
  @Output() rateDown = new EventEmitter<Book>();
  @Output() delete = new EventEmitter<Book>();

  doRateUp() {
    this.rateUp.emit(this.book);
  }

  doRateDown() {
    this.rateDown.emit(this.book);
  }

  doDelete() {
    if (!confirm('Buch wirklich löschen?')) {
      return;
    }

    this.delete.emit(this.book);
  }
}
