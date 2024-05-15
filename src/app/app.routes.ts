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
    path: 'patient-logbook-prescriptions',
    loadComponent: () => import('./pages/patient/logbook/logbook-prescriptions/logbook-prescriptions.page')
      .then(m => m.LogbookPrescriptionsPage)
  },
  {
    path: 'patient-logbook-reservations',
    loadComponent: () => import('./pages/patient/logbook/logbook-reservations/logbook-reservations.page')
      .then(m => m.LogbookReservationsPage)
  },
  {
    path: 'patient-logbook-diagnosis',
    loadComponent: () => import('./pages/patient/logbook/logbook-diagnosis/logbook-diagnosis.page')
      .then(m => m.LogbookDiagnosisPage)
  },
  {
    path: 'patient-reservation',
    loadComponent: () => import('./pages/patient/reservation/reservation.page')
      .then(m => m.ReservationPage)
  },
  {
    path: 'patient-reservation-date',
    loadComponent: () => import('./pages/patient/reservation/reservation-date/reservation-date.page')
      .then(m => m.ReservationDatePage)
  },
  {
    path: 'patient-reservation-continue',
    loadComponent: () => import('./pages/patient/reservation/reservation-date/reservation-continue/reservation-continue.page')
      .then(m => m.ReservationContinuePage)
  },
  {
    path: 'patient-reservation-confirmed',
    loadComponent: () => import('./pages/patient/reservation/reservation-date/reservation-continue/reservation-confirmed/reservation-confirmed.page')
      .then(m => m.ReservationConfirmedPage)
  },
  {
    path: 'patient-reservation-denied',
    loadComponent: () => import('./pages/patient/reservation/reservation-date/reservation-continue/reservation-denied/reservation-denied.page').then( m => m.ReservationDeniedPage)
  },
  {
    path: 'patient-sos',
    loadComponent: () => import('./pages/patient/sos/sos.page')
      .then(m => m.SOSPage)
  },
  {
    path: 'patient-sos-survey',
    loadComponent: () => import('./pages/patient/sos/sos-survey/sos-survey.page').then(m => m.SosSurveyPage)
  },
  {
    path: 'patient-sos-emergency',
    loadComponent: () => import('./pages/patient/sos/sos-emergency/sos-emergency.page').then(m => m.SosEmergencyPage)
  },
  {
    path: 'patient-sos-survey-confirmed',
    loadComponent: () => import('./pages/patient/sos/sos-survey/sos-survey-confirmed/sos-survey-confirmed.page').then(m => m.SosSurveyConfirmedPage)
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
    path: 'settings-bugreport-confirm',
    loadComponent: () => import('./pages/settings/bugreport/bugreport-confirm/bugreport-confirm.page').then(m => m.BugreportConfirmPage)
  },
  {
    path: 'settings-info',
    loadComponent: () => import('./pages/settings/info/info.page')
      .then(m => m.InfoPage)
  },
  {
    path: 'signup-end',
    loadComponent: () => import('./pages/registration/signup/signup-continue/signup-end/signup-end.page').then(m => m.SignupEndPage)
  },
  {
    path: 'signup-confirmed',
    loadComponent: () => import('./pages/registration/signup/signup-continue/signup-end/signup-confirmed/signup-confirmed.page').then(m => m.SignupConfirmedPage)
  },


];
