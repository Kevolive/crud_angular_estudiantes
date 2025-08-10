import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);


  if (authService.isLoggedInSync()) {
    return true;
  }else {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
};
