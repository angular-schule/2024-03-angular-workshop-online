import { Routes } from "@angular/router";
import { AdminEntryComponent } from "./admin-entry/admin-entry.component";
import { LogComponent } from "./log/log.component";
import { UsersComponent } from "./users/users.component";
import { SettingsComponent } from "./settings/settings.component";

export const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminEntryComponent,
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      { path: 'log', component: LogComponent },
      { path: 'users', component: UsersComponent },
      { path: 'settings', component: SettingsComponent },
    ]
  }
];
