import { Routes } from '@angular/router';
import { booksRoutes } from './books/books.routes';

export const routes: Routes = [
  // Weiterleitung vom leeren Pfad: fast immer pathMatch:full notwendig
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  ...booksRoutes

  // achtung: Wildcard immer ganz unten!
  // { path: '**', component: ErrorPageComponent },
];
