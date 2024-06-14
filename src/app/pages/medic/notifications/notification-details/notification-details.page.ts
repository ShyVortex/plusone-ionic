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
import {TerapiaService} from "../../../../services/TerapiaService/terapia.service";
import {firstValueFrom} from "rxjs";

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
    private terapiaService: TerapiaService,
    private storageService: StorageService
  ) {
    this.medico = personaService.getPersona();
    this.defPaz = storageService.getState("mario.giannini@paziente.it");
    this.prenotazione = storageService.getTerapia();
  }

  ngOnInit() {
  }

  async acceptReservation() {
    if (!this.medico.isSet()) {
      this.prenotazione.attivo = true;
      this.storageService.updateStatoTerapia(this.prenotazione, true);
      this.terapiaService.updateTerapiaOffline(this.defPaz, this.prenotazione);
      this.storageService.setTerapia(this.prenotazione);
      this.navCtrl.navigateForward("medic-notif-accepted");
    } else {
      try {
        await firstValueFrom(this.terapiaService.setState(this.prenotazione.id, true))
        this.navCtrl.navigateForward("medic-notif-accepted");
      } catch (error) {
        console.log(error);
      }
    }
  }

  async denyReservation() {
    if (!this.medico.isSet()) {
      this.storageService.deleteTerapia(this.prenotazione);
      this.terapiaService.deleteTerapiaOffline(this.defPaz, this.prenotazione);
      this.navCtrl.navigateForward("medic-notif-denied");
    } else {
      try {
        await firstValueFrom(this.terapiaService.deleteTerapia(this.prenotazione.id))
        this.navCtrl.navigateForward("medic-notif-denied");
      } catch (error) {
        console.log(error);
      }
    }
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
