import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';
import { BookStoreService } from '../shared/book-store.service';
import { of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    // Ersatz für den BookRatingService
    const ratingMock = {
      rateUp: (b: Book) => b,
      rateDown: (b: Book) => b,
    };

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        // BRS ersetzen: Immer wenn jemand BRS anfordert,
        // wird stattdessen der ratingMock ausgeliefert
        { provide: BookRatingService, useValue: ratingMock },
        {
          provide: BookStoreService,
          useValue: {
            getAll: () => of([])
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;

    // DOM-Element
    // fixture.nativeElement

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger service.rateUp for component.doRateUp', () => {
    // BRS anfordern. Das ist aber eigentlich unser ratingMock
    const service = TestBed.inject(BookRatingService);

    // Testbuch
    const testBook = { isbn: '111' } as Book; // Type Assertion // VORSICHT!

    // Methode überwachen / Spy
    // spyOn(service, 'rateUp').and.returnValue(testBook);
    // spyOn(service, 'rateUp').and.callFake(b => b)
    spyOn(service, 'rateUp').and.callThrough();

    // Act
    component.doRateUp(testBook);

    // prüfen, ob Servicemethode aufgerufen wurde
    expect(service.rateUp).toHaveBeenCalledOnceWith(testBook);
  });
});
