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
    path: 'signup-end',
    loadComponent: () => import('./pages/registration/signup/signup-continue/signup-end/signup-end.page')
      .then(m => m.SignupEndPage)
  },
  {
    path: 'signup-pending',
    loadComponent: () => import('./pages/registration/signup/signup-continue/signup-end/signup-pending/signup-pending.page')
      .then(m => m.SignupPendingPage)
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
    path: 'patient-logbook-prescription-details',
    loadComponent: () => import('./pages/patient/logbook/logbook-prescriptions/logbook-prescription-details/logbook-prescription-details.page')
      .then(m => m.LogbookPrescriptionDetailsPage)
  },
  {
    path: 'patient-logbook-prescription-completed',
    loadComponent: () => import('./pages/patient/logbook/logbook-prescriptions/logbook-prescription-details/logbook-prescription-completed/logbook-prescription-completed.page')
      .then(m => m.LogbookPrescriptionCompletedPage)
  },
  {
    path: 'patient-logbook-reservations',
    loadComponent: () => import('./pages/patient/logbook/logbook-reservations/logbook-reservations.page')
      .then(m => m.LogbookReservationsPage)
  },
  {
    path: 'patient-logbook-reservation-details',
    loadComponent: () => import('./pages/patient/logbook/logbook-reservations/logbook-reservation-details/logbook-reservation-details.page')
      .then(m => m.LogbookReservationDetailsPage)
  },
  {
    path: 'patient-logbook-reservation-cancelled',
    loadComponent: () => import('./pages/patient/logbook/logbook-reservations/logbook-reservation-details/logbook-reservation-cancelled/logbook-reservation-cancelled.page')
      .then(m => m.LogbookReservationCancelledPage)
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
    loadComponent: () => import('./pages/patient/reservation/reservation-date/reservation-continue/reservation-denied/reservation-denied.page')
      .then( m => m.ReservationDeniedPage)
  },
  {
    path: 'patient-sos',
    loadComponent: () => import('./pages/patient/sos/sos.page')
      .then(m => m.SOSPage)
  },
  {
    path: 'patient-sos-survey',
    loadComponent: () => import('./pages/patient/sos/sos-survey/sos-survey.page')
      .then(m => m.SosSurveyPage)
  },
  {
    path: 'patient-sos-emergency',
    loadComponent: () => import('./pages/patient/sos/sos-emergency/sos-emergency.page')
      .then(m => m.SosEmergencyPage)
  },
  {
    path: 'patient-sos-survey-confirmed',
    loadComponent: () => import('./pages/patient/sos/sos-survey/sos-survey-confirmed/sos-survey-confirmed.page')
      .then(m => m.SosSurveyConfirmedPage)
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
    path: 'nurse-sos-request',
    loadComponent: () => import('./pages/nurse/sos/sos-request/sos-request.page')
      .then(m => m.SosRequestPage)
  },
  {
    path: 'nurse-sos-request-accepted',
    loadComponent: () => import('./pages/nurse/sos/sos-request/sos-request-accepted/sos-request-accepted.page')
      .then(m => m.SosRequestAcceptedPage)
  },
  {
    path: 'nurse-sos-request-denied',
    loadComponent: () => import('./pages/nurse/sos/sos-request/sos-request-denied/sos-request-denied.page')
      .then(m => m.SosRequestDeniedPage)
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
    path: 'medic-notif-details',
    loadComponent: () => import('./pages/medic/notifications/notification-details/notification-details.page')
      .then(m => m.NotificationDetailsPage)
  },
  {
    path: 'medic-notif-accepted',
    loadComponent: () => import('./pages/medic/notifications/notification-details/notification-accepted/notification-accepted.page')
      .then(m => m.NotificationAcceptedPage)
  },
  {
    path: 'medic-notif-denied',
    loadComponent: () => import('./pages/medic/notifications/notification-details/notification-denied/notification-denied.page')
      .then(m => m.NotificationDeniedPage)
  },
  {
    path: 'medic-patients',
    loadComponent: () => import('./pages/medic/patients/patients.page')
      .then(m => m.PatientsPage)
  },
  {
    path: 'medic-patients-prescriptions',
    loadComponent: () => import('./pages/medic/patients/patients-prescriptions/patients-prescriptions.page')
      .then( m => m.PatientsPrescriptionsPage)
  },
  {
    path: 'medic-patients-user-details',
    loadComponent: () => import('./pages/medic/patients/patients-prescriptions/user-details/user-details.page')
      .then( m => m.UserDetailsPage)
  },
  {
    path: 'medic-patients-user-details-new-prescription',
    loadComponent: () => import('./pages/medic/patients/patients-prescriptions/user-details/new-prescription/new-prescription.page')
      .then( m => m.NewPrescriptionPage)
  },
  {
    path: 'medic-patients-user-details-add-drug',
    loadComponent: () => import('./pages/medic/patients/patients-prescriptions/user-details/new-prescription/add-drug/add-drug.page')
      .then(m => m.AddDrugPage)
  },
  {
    path: 'medic-patients-user-details-add-exam',
    loadComponent: () => import('./pages/medic/patients/patients-prescriptions/user-details/new-prescription/add-exam/add-exam.page')
      .then(m => m.AddExamPage)
  },
  {
    path: 'medic-patients-confirm-prescription',
    loadComponent: () => import('./pages/medic/patients/patients-prescriptions/user-details/new-prescription/confirm-prescription/confirm-prescription.page')
      .then(m => m.ConfirmPrescriptionPage)
  },
  {
    path: 'medic-patients-homecare',
    loadComponent: () => import('./pages/medic/patients/patients-homecare/patients-homecare.page')
      .then(m => m.PatientsHomecarePage)
  },
  {
    path: 'medic-patients-illcert',
    loadComponent: () => import('./pages/medic/patients/patients-illcert/patients-illcert.page')
      .then(m => m.PatientsIllcertPage)
  },
  {
    path: 'medic-patients-records',
    loadComponent: () => import('./pages/medic/patients/patients-records/patients-records.page')
      .then( m => m.PatientsRecordsPage)
  },
  {
    path: 'medic-patients-sdo',
    loadComponent: () => import('./pages/medic/patients/patients-sdo/patients-sdo.page')
      .then( m => m.PatientsSdoPage)
  },
  {
    path: 'medic-patients-assistance',
    loadComponent: () => import('./pages/medic/patients/patients-assistance/patients-assistance.page')
      .then(m => m.PatientsAssistancePage)
  },
  {
    path: 'admin-home',
    loadComponent: () => import('./pages/admin/home/home.page')
      .then(m => m.HomePage)
  },
  {
    path: 'admin-requests',
    loadComponent: () => import('./pages/admin/requests/requests.page')
      .then(m => m.RequestsPage)
  },
  {
    path: 'admin-request-details',
    loadComponent: () => import('./pages/admin/requests/request-details/request-details.page')
      .then(m => m.RequestDetailsPage)
  },
  {
    path: 'admin-request-accepted',
    loadComponent: () => import('./pages/admin/requests/request-details/request-accepted/request-accepted.page')
      .then(m => m.RequestAcceptedPage)
  },
  {
    path: 'admin-request-denied',
    loadComponent: () => import('./pages/admin/requests/request-details/request-denied/request-denied.page')
      .then(m => m.RequestDeniedPage)
  },
  {
    path: 'admin-functions',
    loadComponent: () => import('./pages/admin/functions/functions.page')
      .then(m => m.FunctionsPage)
  },
  {
    path: 'admin-functions-medics',
    loadComponent: () => import('./pages/admin/functions/functions-medics/functions-medics.page')
      .then(m => m.FunctionsMedicsPage)
  },
  {
    path: 'admin-medic-details',
    loadComponent: () => import('./pages/admin/functions/functions-medics/medic-details/medic-details.page')
      .then( m => m.MedicDetailsPage)
  },
  {
    path: 'admin-medic-modify-details',
    loadComponent: () => import('./pages/admin/functions/functions-medics/medic-details/medic-modify-details/medic-modify-details.page')
      .then( m => m.MedicModifyDetailsPage)
  },
  {
    path: 'admin-functions-nurses',
    loadComponent: () => import('./pages/admin/functions/functions-nurses/functions-nurses.page')
      .then(m => m.FunctionsNursesPage)
  },
  {
    path: 'admin-nurse-details',
    loadComponent: () => import('./pages/admin/functions/functions-nurses/nurse-details/nurse-details.page')
      .then( m => m.NurseDetailsPage)
  },
  {
    path: 'admin-nurse-modify-details',
    loadComponent: () => import('./pages/admin/functions/functions-nurses/nurse-details/nurse-modify-details/nurse-modify-details.page')
      .then( m => m.NurseModifyDetailsPage)
  },
  {
    path: 'admin-functions-patients',
    loadComponent: () => import('./pages/admin/functions/functions-patients/functions-patients.page')
      .then(m => m.FunctionsPatientsPage)
  },
  {
    path: 'admin-patient-details',
    loadComponent: () => import('./pages/admin/functions/functions-patients/patient-details/patient-details.page')
      .then( m => m.PatientDetailsPage)
  },
  {
    path: 'admin-patient-modify-details',
    loadComponent: () => import('./pages/admin/functions/functions-patients/patient-details/patient-modify-details/patient-modify-details.page')
      .then( m => m.PatientModifyDetailsPage)
  },
  {
    path: 'admin-reports',
    loadComponent: () => import('./pages/admin/reports/reports.page')
      .then(m => m.ReportsPage)
  },
  {
    path: 'admin-report-details',
    loadComponent: () => import('./pages/admin/reports/report-details/report-details.page')
      .then(m => m.ReportDetailsPage)
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
    loadComponent: () => import('./pages/settings/bugreport/bugreport-confirm/bugreport-confirm.page')
      .then(m => m.BugreportConfirmPage)
  },
  {
    path: 'settings-info',
    loadComponent: () => import('./pages/settings/info/info.page')
      .then(m => m.InfoPage)
  },
  {
    path: 'settings-credits',
    loadComponent: () => import('./pages/settings/credits/credits.page')
      .then(m => m.CreditsPage)
  }
];
