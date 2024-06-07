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
import {StorageService} from "../../../../../services/StorageService/storage.service";
import {PersonaService} from "../../../../../services/PersonaService/persona.service";
import {Paziente} from "../../../../../models/paziente/Paziente";
import {Terapia} from "../../../../../models/terapia/Terapia";
import {TipologiaTerapia} from "../../../../../models/terapia/tipologia-terapia";
import {isEqual} from "lodash";

@Component({
  selector: 'app-logbook-reservation-details',
  templateUrl: './logbook-reservation-details.page.html',
  styleUrls: ['./logbook-reservation-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonLabel, IonFooter, IonImg, IonTabBar, IonTabButton, IonTabs, IonItem, IonText, IonRow, IonIcon]
})

export class LogbookReservationDetailsPage implements OnInit {
  protected paziente: Paziente;
  protected prenotazione: Terapia;

  constructor(
    private navCtrl: NavController,
    private personaService: PersonaService,
    private storageService: StorageService,
  ) {
    this.paziente = personaService.getPersona();
    this.prenotazione = storageService.getTerapia();
  }

  ngOnInit() {
  }

  cancelReservation(prenotazione: Terapia) {
    const index = this.paziente.terapie.findIndex((item) => item === prenotazione);
    if (index !== -1) {
      if (isEqual(this.paziente.terapie[index], prenotazione)) {
        // splice === rimuovi
        this.paziente.terapie.splice(index, 1);
        console.log(`Reservation for ${prenotazione} has been cancelled.`);
        this.navigateBack();
      }
      else
        console.error('The reservation details do not match.');
    }
    else
      console.error('Reservation not found.');
  }

  navigateBack() {
    this.navCtrl.navigateBack("patient-logbook-reservations");
  }

  goToHome() {
    this.navCtrl.navigateForward("patient-home", { animated: false });
  }

  goToLogbook() {
    this.navCtrl.navigateForward("patient-logbook", { animated: false });
  }

  goToReservation() {
    this.navCtrl.navigateForward("patient-reservation", { animated: false });
  }

  goToSOS() {
    this.navCtrl.navigateForward("patient-sos", { animated: false });
  }

  protected readonly TipologiaTerapia = TipologiaTerapia;
}
