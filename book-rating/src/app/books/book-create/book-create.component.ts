import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-create',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './book-create.component.html',
  styleUrl: './book-create.component.scss'
})
export class BookCreateComponent {
  bookForm = new FormGroup({
    isbn: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(13),
        Validators.pattern(/^[0-9]*$/)
      ]
    }),
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    description: new FormControl('', { nonNullable: true }),
    rating: new FormControl(1, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.min(1),
        Validators.max(5),
      ]
    }),
    price: new FormControl(0, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.min(0)
      ]
    }),
  });

  constructor(private bs: BookStoreService, private router: Router) {}

  isInvalid(controlName: string): boolean {
    const control = this.bookForm.get(controlName);
    if (!control) {
      return false;
    }

    return control.invalid && control.touched;
  }

  hasError(controlName: string, errorCode: string): boolean {
    // Hat das Control "controlName" den bestimmten Fehler "errorCode"?
    const control = this.bookForm.get(controlName);
    if (!control) {
      return false;
    }

    return control.hasError(errorCode) && control.touched;
    // return control.errors?.[errorCode] // TODO
  }

  submitForm() {
    if (this.bookForm.invalid) {
      return;
    }

    /*
    // falls "price" den typ "number | null" hat
    const formValue = this.bookForm.getRawValue();
    const newBook: Book = {
      ...formValue,
      price: formValue.price ?? 0
    };
    */

    const newBook: Book = this.bookForm.getRawValue();

    this.bs.create(newBook).subscribe(receivedBook => {
      // this.router.navigateByUrl('/books'); // Dashboard
      this.router.navigate(['/books', receivedBook.isbn]); // Detailseite
    });

    // TODO
    // HTTP create
    // bei Erfolg:
      // - wegnavigieren, z.b. zur Liste oder zur Detailseite
      // weitere Ideen: Popupfenster/Hinweismeldung, Formular zurücksetzen
  }
}
