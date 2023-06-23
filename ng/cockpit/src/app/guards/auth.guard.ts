import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

const canMathFnUsers = (): boolean => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (!authService.isAuthenticated()) {
    authService.logout();
    router.navigate(['']);
    return false;
  }

  return true;
};

const canMathFnLogin = (): boolean => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.isAuthenticated()) {
    router.navigate(['user']);
    return false;
  }

  return true;
};

export const canMatchUsers: CanMatchFn = canMathFnUsers;
export const canMatchLogin: CanMatchFn = canMathFnLogin;
