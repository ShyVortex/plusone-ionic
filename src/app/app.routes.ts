import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/registration/login/login.page')
      .then(m => m.LoginPage)
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/registration/signup/signup.page')
      .then(m => m.SignupPage)
  },
  {
    path: 'signup-continue',
    loadComponent: () => import('./pages/registration/signup/signup-continue/signup-continue.page')
      .then(m => m.SignupContinuePage)
  },
  {
    path: 'patient-home',
    loadComponent: () => import('./pages/patient/home/home.page')
      .then(m => m.HomePage)
  },
  {
    path: 'patient-notifs',
    loadComponent: () => import('./pages/patient/notifications/notifications.page')
      .then(m => m.NotificationsPage)
  },
  {
    path: 'patient-reservation',
    loadComponent: () => import('./pages/patient/reservation/reservation.page')
      .then(m => m.ReservationPage)
  },
  {
    path: 'patient-sos',
    loadComponent: () => import('./pages/patient/sos/sos.page')
      .then(m => m.SOSPage)
  },
  {
    path: 'patient-settings',
    loadComponent: () => import('./pages/patient/settings/settings.page').then(m => m.SettingsPage)
  },
  {
    path: 'patient-profile',
    loadComponent: () => import('./pages/patient/settings/profile/profile.page').then(m => m.ProfilePage)
  },
  {
    path: 'patient-bugreport',
    loadComponent: () => import('./pages/patient/settings/bugreport/bugreport.page').then(m => m.BugreportPage)
  },
  {
    path: 'patient-app-info',
    loadComponent: () => import('./pages/patient/settings/info/info.page').then(m => m.InfoPage)
  },
  {
    path: 'nurse-drugs',
    loadComponent: () => import('./pages/nurse/drugs/drugs.page')
      .then(m => m.DrugsPage)
  },
  {
    path: 'nurse-notifs',
    loadComponent: () => import('./pages/nurse/notifications/notifications.page')
      .then(m => m.NotificationsPage)
  },
  {
    path: 'nurse-shifts',
    loadComponent: () => import('./pages/nurse/shifts/shifts.page')
      .then(m => m.ShiftsPage)
  },
  {
    path: 'nurse-sos',
    loadComponent: () => import('./pages/nurse/sos/sos.page')
      .then(m => m.SOSPage)
  },
  {
    path: 'medic-home',
    loadComponent: () => import('./pages/medic/home/home.page')
      .then(m => m.HomePage)
  },
  {
    path: 'medic-notifs',
    loadComponent: () => import('./pages/medic/notifications/notifications.page')
      .then(m => m.NotificationsPage)
  },
  {
    path: 'medic-prescriptions',
    loadComponent: () => import('./pages/medic/prescriptions/prescriptions.page')
      .then(m => m.PrescriptionsPage)
  },
  {
    path: 'patient-reservation-continue',
    loadComponent: () => import('./pages/patient/reservation/reservation-continue/reservation-continue.page').then( m => m.ReservationContinuePage)
  },
  {
    path: 'reservation-confirmed',
    loadComponent: () => import('./pages/patient/reservation/reservation-continue/reservation-confirmed/reservation-confirmed.page').then( m => m.ReservationConfirmedPage)
  },
];
