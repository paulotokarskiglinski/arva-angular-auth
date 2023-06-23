import { HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

const httpIntercept = (request: any, next: any): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token) {
    request = request.clone({
      setHeaders: {
        Authorization: 'Bearer ' + token,
      },
    });
  }

  return next(request);
};

export const httpInterceptor: HttpInterceptorFn = httpIntercept;
