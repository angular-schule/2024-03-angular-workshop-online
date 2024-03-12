import { Component } from '@angular/core';
import { Observable, of, from, timer, interval, ReplaySubject, map, filter, Observer, Subscriber, endWith } from 'rxjs';
import { HistoryComponent } from '../../shared/history/history.component';

@Component({
  templateUrl: './creating.component.html',
  standalone: true,
  imports: [HistoryComponent]
})
export class CreatingComponent {

  logStream$ = new ReplaySubject<string | number>();

  constructor() {
    /**
     * 1. Erstelle ein Observable und abonniere den Datenstrom.
     *    Probiere dazu die verschiedenen Creation Functions aus: of(), from(), timer(), interval()
     * 2. Implementiere außerdem ein Observable manuell, indem du den Konstruktor "new Observable()" nutzt.
     *
     * Tipps:
     * Zum Abonnieren kannst du einen (partiellen) Observer oder ein einzelnes next-Callback verwenden.
     * Du kannst die Methode this.log() verwenden, um eine Ausgabe in der schwarzen Box im Browser zu erzeugen.
     */

    /******************************/

    // of('Leipzig', 'Nürnberg', 'Köln')
    // from([1,2,3,4,5])
    // interval(1000)       // ---0---1---2---3---4---5 ...
    // timer(1000, 1000)    // ---0---1---2---3---4---5 ...
    // timer(3000)          // ---------0|
    // timer(2000, 1000)    // ------0---1---2---3---4---5 ...
    // timer(0, 1000)    // 0---1---2---3---4---5 ...

    timer(1000).pipe(
      map(e => e * 3),
      filter(e => e % 2 === 0),
      endWith(9999)
    ).subscribe({
      next: e => this.log(e),
      complete: () => this.log('COMPLETE')
    });

    /******************************/

    function producer(sub: Subscriber<number>) {
      const result = Math.random();
      sub.next(result);

      sub.next(100);
      sub.next(200);

      setTimeout(() => sub.next(6666), 2000)
      setTimeout(() => sub.complete(), 4000)
    }


    const obs: Observer<number> = {
      next: e => console.log(e),
      error: (err: any) => console.error(err),
      complete: () => console.log('Fertig'),
    };

    // Finnische Notation
    const myObservable$ = new Observable(producer);
    // myObservable$.subscribe(obs);


    // of(1, 2, 3)
    const myObs2$ = new Observable<number>(sub => {
      sub.next(1);
      sub.next(2);
      sub.next(3);
      sub.complete();
    });

    // producer(obs);



    /******************************/
  }

  private log(msg: string | number) {
    this.logStream$.next(msg);
  }

}
