import { Routes } from '@angular/router';

export const USER_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./list/user-list.component').then((mod) => mod.UserListComponent),
  },
  {
    path: ':userId',
    loadComponent: () =>
      import('./edit/user-edit.component').then((mod) => mod.UserEditComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
