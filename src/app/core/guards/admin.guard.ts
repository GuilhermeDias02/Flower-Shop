import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.getCurrentUser() && authService.isAdmin()) {
    return true;
  } else {
    router.navigate(['/flowers']);
    return false;
  }
};
