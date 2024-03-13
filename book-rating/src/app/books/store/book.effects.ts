import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap } from 'rxjs/operators';
import { Observable, EMPTY, of, interval } from 'rxjs';
import { BookActions } from './book.actions';
import { BookStoreService } from '../shared/book-store.service';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable()
export class BookEffects {

  /*testEffect$ = createEffect(() => {
    return interval(1000).pipe(
      map(i => {
        return { type: 'MY INETRVAL', index: i }
      })
    )
  })*/

  /*
  // TODO:
  - wenn Action loadBooks kommt,
  (- wenn schon loading, dann mache nichts)
  - dann lade Bücher (HTTP getAll)
    - bei Erfolg: loadBooksSuccess Action auslösen
    - bei Failure: loadBooksFailure auslösen
  */

  loadBooks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookActions.loadBooks),
      switchMap(() => this.bs.getAll().pipe(
        map(books => BookActions.loadBooksSuccess({ data: books })),
        catchError((err: HttpErrorResponse) => of(BookActions.loadBooksFailure({ error: err.message })))
      ))
    );
  });



  constructor(private actions$: Actions, private bs: BookStoreService) {}
}
