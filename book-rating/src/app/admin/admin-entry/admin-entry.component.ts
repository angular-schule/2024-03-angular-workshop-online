import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-entry',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './admin-entry.component.html',
  styleUrl: './admin-entry.component.scss'
})
export class AdminEntryComponent {
  navItems = [
    { label: 'Einstellungen', url: 'settings' },
    { label: 'Benutzer', url: 'users' },
    { label: 'Log', url: 'log' }
  ]
}
