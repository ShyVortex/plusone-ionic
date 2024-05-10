import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonCard, IonCardHeader, IonCardTitle,
  IonContent, IonFooter,
  IonHeader,
  IonIcon,
  IonImg, IonItem, IonLabel, IonRow,
  IonTabBar,
  IonTabButton, IonTabs, IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {NavController} from "@ionic/angular";
import {PersonaService} from "../../../services/PersonaService/persona.service";

@Component({
  selector: 'app-sos',
  templateUrl: './sos.page.html',
  styleUrls: ['./sos.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonIcon, IonImg, IonTabBar, IonTabButton, IonTabs, IonFooter, IonLabel, IonText, IonRow, IonItem, IonCard, IonCardHeader, IonCardTitle]
})
export class SOSPage implements OnInit {
  protected paziente: any;

  constructor(
    private navCtrl: NavController,
    private personaService: PersonaService,
  ) {
    this.paziente = personaService.getPersona();
  }

  ngOnInit() {
  }

  routeToSettings() {
    this.personaService.setPersona(this.paziente);
    this.navCtrl.navigateForward("settings");
  }

  routeToEmergency() {
    this.navCtrl.navigateForward("patient-sos-emergency");
  }

  routeToSurvey() {
    this.personaService.setPersona(this.paziente);
    this.navCtrl.navigateForward("patient-sos-survey");
  }

  goToHome() {
    this.personaService.setPersona(this.paziente);
    this.navCtrl.navigateBack("patient-home", { animated: false });
  }

  goToLogbook() {
    this.personaService.setPersona(this.paziente);
    this.navCtrl.navigateForward("patient-logbook", { animated: false });
  }

  goToReservation() {
    this.personaService.setPersona(this.paziente);
    this.navCtrl.navigateForward("patient-reservation", { animated: false });
  }

  goToSOS() {
    this.personaService.setPersona(this.paziente);
    this.navCtrl.navigateForward("patient-sos",{ animated: false });
  }
}
