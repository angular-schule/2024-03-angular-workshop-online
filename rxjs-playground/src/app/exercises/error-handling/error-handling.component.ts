import { Component } from '@angular/core';
import { ReplaySubject, throwError, of, EMPTY, retry, catchError, Observable, from } from 'rxjs';

import { ExerciseService } from '../exercise.service';
import { HistoryComponent } from '../../shared/history/history.component';

@Component({
  templateUrl: './error-handling.component.html',
  standalone: true,
  imports: [HistoryComponent]
})
export class ErrorHandlingComponent {

  logStream$ = new ReplaySubject<unknown>();

  constructor(private es: ExerciseService) { }

  /**
   * Das Observable aus `this.es.randomError()` liefert mit hoher Wahrscheinlichkeit einen Fehler.
   * Probiere verschiedene Strategien aus, um den Fehler zu behandeln:
   * - wiederholen
   * - Fehler weiterwerfen
   * - Fehler umwandeln (in ein normales Element)
   * - Fehler verschlucken/ignorieren
   */

  start() {
    this.es.randomError().pipe(
      catchError(err => {
        // Rückgabewert: ObservableInput (also z. B. ein Observable)

        // Fehler ersetzen
        /*return new Observable(sub => {
          sub.next('Nichts');
          sub.next('passiert!');
          sub.complete()
        });*/

        // return ['Nichts', 'passiert!'];
        // return of('Nichts', 'passiert!');

        // Fehler ignorieren
        // return of();
        // return from([]);
        // return [];
        // return EMPTY;

        // Fehler weiterwerfen
        // return new Observable(sub => sub.error('MEIN FEHLER!'));
        // return throwError(() => 'MEIN FEHLER!');
        throw 'MEIN FEHLER!';
      })
    ).subscribe({
      next: e => this.logStream$.next(e),
      error: err => this.logStream$.next('❌ ERROR: ' + err)
    });
  }
}
