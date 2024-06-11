import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonFooter,
  IonHeader, IonIcon,
  IonImg, IonItem,
  IonLabel, IonRow, IonTabBar, IonTabButton, IonTabs, IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {NavController} from "@ionic/angular";
import {Terapia} from "../../../../models/terapia/Terapia";
import {StorageService} from "../../../../services/StorageService/storage.service";
import {Medico} from "../../../../models/medico/Medico";
import {PersonaService} from "../../../../services/PersonaService/persona.service";
import {Paziente} from "../../../../models/paziente/Paziente";
import {isEqual} from "lodash";

@Component({
  selector: 'app-notification-details',
  templateUrl: './notification-details.page.html',
  styleUrls: ['./notification-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonLabel, IonFooter, IonImg, IonTabBar, IonTabButton, IonTabs, IonIcon, IonItem, IonRow, IonText]
})

export class NotificationDetailsPage implements OnInit {
  private medico: Medico;
  private defPaz: Paziente;

  protected prenotazione: Terapia;

  constructor(
    private navCtrl: NavController,
    private personaService: PersonaService,
    private storageService: StorageService
  ) {
    this.medico = personaService.getPersona();
    this.defPaz = storageService.getState("mario.giannini@paziente.it");
    this.prenotazione = storageService.getTerapia();
  }

  ngOnInit() {
  }

  acceptReservation() {
    if (!this.medico.isSet()) {
      this.prenotazione.attivo = true;
      this.storageService.updateStatoTerapia(this.prenotazione, true);
      this.updatePatientReservation();
      this.storageService.setTerapia(this.prenotazione);
      this.navCtrl.navigateForward("medic-notif-accepted");
    }
  }

  denyReservation() {
    if (!this.medico.isSet()) {
      this.storageService.deleteTerapia(this.prenotazione);
      this.deletePatientReservation();
      this.navCtrl.navigateForward("medic-notif-denied");
    }
  }

  updatePatientReservation() {
    const index = this.defPaz.terapie.findIndex(item => item === this.prenotazione);
    if (index !== -1) {
      if (isEqual(this.defPaz.terapie[index], this.prenotazione)) {
        this.defPaz.terapie[index].attivo = true;
      }
    }
    else
      console.error("CRITICAL ERROR: prenotazione not found in paziente: " + this.defPaz);
  }

  deletePatientReservation() {
    const index = this.defPaz.terapie.findIndex(item => item === this.prenotazione);
    if (index !== -1) {
      if (isEqual(this.defPaz.terapie[index], this.prenotazione)) {
        this.defPaz.terapie.splice(index, 1);
      }
    }
    else
      console.error("CRITICAL ERROR: prenotazione not found in paziente: " + this.defPaz);
  }

  navigateBack() {
    this.navCtrl.navigateBack("medic-notifs");
  }

  goToHome() {
    this.navCtrl.navigateBack("medic-home", { animated: false });
  }

  goToNotifs() {
    this.navCtrl.navigateForward("medic-notifs", { animated: false });
  }

  goToPatients() {
    this.navCtrl.navigateForward("medic-patients", { animated: false });
  }
}
