import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  return isLoggedIn === 'true' ? true : router.parseUrl('/auth');
};
