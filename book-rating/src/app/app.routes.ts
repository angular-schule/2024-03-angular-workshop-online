import { Routes } from '@angular/router';

export const routes: Routes = [
  // Weiterleitung vom leeren Pfad: fast immer pathMatch:full notwendig
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  // ...booksRoutes,
  {
    path: 'books',
    loadChildren: () => import('./books/books.routes')
    // loadChildren: () => import('./books/books.routes').then(m => m.booksRoutes)
  }

  // achtung: Wildcard immer ganz unten!
  // { path: '**', component: ErrorPageComponent },
];
