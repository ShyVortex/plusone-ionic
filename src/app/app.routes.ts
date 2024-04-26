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
    path: 'patient-logbook',
    loadComponent: () => import('./pages/patient/logbook/logbook.page')
      .then(m => m.LogbookPage)
  },
  {
    path: 'patient-reservation',
    loadComponent: () => import('./pages/patient/reservation/reservation.page')
      .then(m => m.ReservationPage)
  },
  {
    path: 'patient-reservation-continue',
    loadComponent: () => import('./pages/patient/reservation/reservation-continue/reservation-continue.page').then( m => m.ReservationContinuePage)
  },
  {
    path: 'reservation-confirmed',
    loadComponent: () => import('./pages/patient/reservation/reservation-continue/reservation-confirmed/reservation-confirmed.page').then( m => m.ReservationConfirmedPage)
  },
  {
    path: 'patient-sos',
    loadComponent: () => import('./pages/patient/sos/sos.page')
      .then(m => m.SOSPage)
  },
  {
    path: 'nurse-home',
    loadComponent: () => import('./pages/nurse/home/home.page')
      .then(m => m.HomePage)
  },
  {
    path: 'nurse-drugs',
    loadComponent: () => import('./pages/nurse/drugs/drugs.page')
      .then(m => m.DrugsPage)
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
      path: 'settings',
    loadComponent: () => import('./pages/settings/settings.page')
      .then(m => m.SettingsPage)
  },
  {
    path: 'settings-security',
    loadComponent: () => import('./pages/settings/security/security.page')
      .then(m => m.SecurityPage)
  },
  {
    path: 'settings-bugreport',
    loadComponent: () => import('./pages/settings/bugreport/bugreport.page')
      .then(m => m.BugreportPage)
  },
  {
    path: 'settings-info',
    loadComponent: () => import('./pages/settings/info/info.page')
      .then(m => m.InfoPage)
  },
];
