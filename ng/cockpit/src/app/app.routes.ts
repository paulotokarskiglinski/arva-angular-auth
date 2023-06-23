import { Routes } from '@angular/router';
import { canMatchLogin, canMatchUsers } from './guards/auth.guard';
import { USER_ROUTES } from './user/user.routes';

export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canMatch: [canMatchLogin],
    loadComponent: () =>
      import('./home/home.component').then((mod) => mod.HomeComponent),
  },
  {
    path: 'user',
    children: USER_ROUTES,
    canMatch: [canMatchUsers],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
