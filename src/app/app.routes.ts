import { Routes } from '@angular/router';
import { EstudiantesPageComponent } from './features/estudiantes/pages/estudiantes-page.component';
import { LoginPageComponent } from './features/auth/pages/login-page/login-page.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/pages/login-page/login-page.component')
      .then(m => m.LoginPageComponent)
  },

  {
    path: 'estudiantes',
    canActivate: [authGuard],
    loadComponent: () => import('./features/estudiantes/pages/estudiantes-page.component').then(m => m.EstudiantesPageComponent)
  },

  {
    path: '**',
    redirectTo: 'login'
  }

];
