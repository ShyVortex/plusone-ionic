import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonContent, IonFooter,
  IonHeader,
  IonIcon,
  IonImg, IonItem, IonLabel,
  IonTabBar,
  IonTabButton, IonTabs, IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {NavController} from "@ionic/angular";
import {LoginUtilities} from "../registration/login/LoginUtilities";
import {PersonaService} from "../../services/PersonaService/persona.service";
import {StorageService} from "../../services/StorageService/storage.service";
import {LoginPage} from "../registration/login/login.page";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonIcon, IonImg, IonTabBar, IonTabButton, IonTabs, IonItem, IonText, IonButton, IonLabel, IonFooter]
})

export class SettingsPage implements OnInit {
  protected persona: any;
  protected ruolo: String;
  protected route: any;
  protected readonly LoginUtilities = LoginUtilities;

  constructor(
    private navCtrl: NavController,
    private personaService: PersonaService,
    private storageService: StorageService
  ) {
    this.persona = personaService.getPersona();
    this.ruolo = "";
    this.route = storageService.getRoute();
  }

  ngOnInit() {
    if (LoginUtilities.getRuoloByEmail(this.persona.email) === 'PAZIENTE')
      this.ruolo = "PAZIENTE";
    else if (LoginUtilities.getRuoloByEmail(this.persona.email) === 'INFERMIERE')
      this.ruolo = "INFERMIERE";
    else if (LoginUtilities.getRuoloByEmail(this.persona.email) === 'MEDICO')
      this.ruolo = "MEDICO";
    else if (LoginUtilities.getRuoloByEmail(this.persona.email) === 'ADMIN')
      this.ruolo = "ADMIN";
  }

  navigateBack() {
    this.navCtrl.navigateBack(this.route);
  }

  routeToSecurity() {
    this.navCtrl.navigateForward("settings-security");
  }

  routeToBugReport() {
    this.navCtrl.navigateForward("settings-bugreport", {
      state: {
        ruolo: this.ruolo
      }
    });
  }

  routeToInfo() {
    this.navCtrl.navigateForward("settings-info");
  }

  async logout() {
    if (this.personaService.isDefault())
      this.storageService.cacheState(this.persona);

    await this.navCtrl.navigateRoot("login");
    LoginPage.canBypassToast = false;
  }

  goToHome() {
    if (this.ruolo === 'PAZIENTE')
      this.navCtrl.navigateForward("patient-home");
    else if (this.ruolo === 'INFERMIERE')
      this.navCtrl.navigateForward("nurse-home");
    else if (this.ruolo === 'MEDICO')
      this.navCtrl.navigateForward("medic-home");
    else if (this.ruolo === 'ADMIN')
      this.navCtrl.navigateForward("admin-home");
  }

  goToLogbook() {
    this.navCtrl.navigateForward("patient-logbook", { animated: false });
  }

  goToReservation() {
    this.navCtrl.navigateForward("patient-reservation", { animated: false });
  }

  goToPatientSOS() {
    this.navCtrl.navigateForward("patient-sos", { animated: false });
  }

  goToDrugs() {
    this.navCtrl.navigateForward("nurse-drugs", { animated: false });
  }

  goToShifts() {
    this.navCtrl.navigateForward("nurse-shifts", { animated: false });
  }

  goToNurseSOS() {
    this.navCtrl.navigateForward("nurse-sos", { animated: false });
  }

  goToNotifs() {
    this.navCtrl.navigateForward("medic-notifs", { animated: false });
  }

  goToPatients() {
    this.navCtrl.navigateForward("medic-patients", { animated: false });
  }

  goToRequests() {
    this.navCtrl.navigateForward("admin-requests", { animated: false });
  }

  goToFunctions() {
    this.navCtrl.navigateForward("admin-functions", { animated: false });
  }

  goToReports() {
    this.navCtrl.navigateForward("admin-reports", { animated: false });
  }
}
