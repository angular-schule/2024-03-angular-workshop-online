import { Routes } from '@angular/router';
import { booksRoutes } from './books/books.routes';
import { adminRoutes } from './admin/admin.routes';

export const routes: Routes = [
  // Weiterleitung vom leeren Pfad: fast immer pathMatch:full notwendig
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  ...booksRoutes,
  ...adminRoutes,

  // achtung: Wildcard immer ganz unten!
  // { path: '**', component: ErrorPageComponent },
];
