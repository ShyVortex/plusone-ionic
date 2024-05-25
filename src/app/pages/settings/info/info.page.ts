import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
    IonButton,
    IonCol,
    IonContent, IonFooter,
    IonGrid,
    IonHeader,
    IonImg, IonLabel, IonRow, IonSelect, IonSelectOption, IonTabBar, IonTabButton, IonTabs, IonText, IonTextarea,
    IonTitle,
    IonToolbar
} from '@ionic/angular/standalone';
import {NavController} from "@ionic/angular";
import {LoginUtilities} from "../../registration/login/LoginUtilities";
import {PersonaService} from "../../../services/PersonaService/persona.service";

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
  standalone: true,
    imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonCol, IonGrid, IonImg, IonLabel, IonRow, IonSelect, IonSelectOption, IonTabBar, IonTabButton, IonTabs, IonTextarea, IonText, IonFooter]
})

export class InfoPage implements OnInit {
  protected persona: any;
  protected ruolo: String;
  protected readonly LoginUtilities = LoginUtilities;

  constructor(
    private navCtrl: NavController,
    private personaService: PersonaService
  ) {
    this.persona = personaService.getPersona();
    this.ruolo = "";
  }

  ngOnInit() {
    if (LoginUtilities.getRuoloByEmail(this.persona.email) === 'PAZIENTE')
      this.ruolo = "PAZIENTE";
    else if (LoginUtilities.getRuoloByEmail(this.persona.email) === 'INFERMIERE')
      this.ruolo = "INFERMIERE";
    else if (LoginUtilities.getRuoloByEmail(this.persona.email) === 'MEDICO')
      this.ruolo = "MEDICO";
  }

  navigateBack() {
    this.navCtrl.back();
  }

  goToHome() {
    if (this.ruolo === 'PAZIENTE')
      this.navCtrl.navigateBack("patient-home");
    else if (this.ruolo === 'INFERMIERE')
      this.navCtrl.navigateBack("nurse-home");
    else if (this.ruolo === 'MEDICO')
      this.navCtrl.navigateBack("patient-home");
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

  goToPrescriptions() {
    this.navCtrl.navigateForward("medic-prescriptions", { animated: false });
  }
}
