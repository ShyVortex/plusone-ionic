import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
    IonCard, IonCardHeader, IonCardTitle,
    IonContent, IonFooter,
    IonHeader, IonIcon,
    IonImg, IonItem, IonLabel, IonRow,
    IonTabBar,
    IonTabButton,
    IonTabs, IonText,
    IonTitle,
    IonToolbar
} from '@ionic/angular/standalone';
import {NavController} from "@ionic/angular";
import {PersonaService} from "../../../services/PersonaService/persona.service";

@Component({
  selector: 'app-logbook',
  templateUrl: './logbook.page.html',
  styleUrls: ['./logbook.page.scss'],
  standalone: true,
    imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonImg, IonTabBar, IonTabButton, IonTabs, IonIcon, IonLabel, IonFooter, IonText, IonCard, IonCardHeader, IonCardTitle, IonItem, IonRow]
})
export class LogbookPage implements OnInit {
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

  routeToLogbookPrescriptions() {
    this.personaService.setPersona(this.paziente);
    this.navCtrl.navigateForward("patient-logbook-prescriptions");
  }

  routeToLogbookReservations() {
    this.personaService.setPersona(this.paziente);
    this.navCtrl.navigateForward("patient-logbook-reservations");
  }

  routeToLogbookDiagnosis() {
    this.personaService.setPersona(this.paziente);
    this.navCtrl.navigateForward("patient-logbook-diagnosis");
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
    this.navCtrl.navigateForward("patient-sos", { animated: false });
  }
}
