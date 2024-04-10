import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/registration/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/registration/signup/signup.page').then(m => m.SignupPage)
  },
  {
    path: 'signup-continue',
    loadComponent: () => import('./pages/registration/signup/signup-continue/signup-continue.page').then(m => m.SignupContinuePage)
  },
];
