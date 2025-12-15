import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

// Convert the class into an exported constant function (HttpInterceptorFn)
export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  // Use inject() to get services like AuthService
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token) {
    // Clone the request and add the authorization header
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}` 
      }
    });
  }

  return next(req);
};