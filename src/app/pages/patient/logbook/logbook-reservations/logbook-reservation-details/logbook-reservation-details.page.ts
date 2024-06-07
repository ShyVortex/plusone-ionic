import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  AlertController,
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
import {firstValueFrom} from "rxjs";

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

  protected alertButtons = [
    {
      text: 'Annulla',
      role: 'cancel',
      handler: () => {}
    },
    {
      text: 'Conferma',
      role: 'confirm',
      handler: async () => {
        const index = this.paziente.terapie.findIndex(
          (item) => item === this.prenotazione
        );
        if (index !== -1) {
          if (isEqual(this.paziente.terapie[index], this.prenotazione)) {
            // splice === rimuovi
            this.paziente.terapie.splice(index, 1);
            console.log(`Reservation for ${this.prenotazione} has been cancelled.`);
            this.navCtrl.navigateForward("patient-logbook-reservation-cancelled");
          }
          else
            console.error('The reservation details do not match.');
        }
        else
          console.error('Reservation not found.');
      }
    }
  ];

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    private personaService: PersonaService,
    private storageService: StorageService,
  ) {
    this.paziente = personaService.getPersona();
    this.prenotazione = storageService.getTerapia();
  }

  ngOnInit() {
  }

  async showAlert() {
    const alert = await this.alertController.create({
      header: 'Confermare cancellazione',
      message: 'Sei sicuro di voler cancellare la prenotazione? Non sarà possibile modificare la scelta.',
      buttons: this.alertButtons,
    });
    await alert.present();
  }

  cancelReservation() {
    this.showAlert();
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
