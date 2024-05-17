/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton, IonCard, IonCardHeader, IonCardTitle,
  IonContent, IonFooter,
  IonHeader, IonIcon,
  IonImg, IonItem, IonLabel, IonRow,
  IonTabBar,
  IonTabButton,
  IonTabs, IonText,
  IonTitle,
  IonToolbar,
  IonDatetime,
  IonSegment,
  IonSegmentButton,
} from '@ionic/angular/standalone';
import {NavController} from "@ionic/angular";
import {PersonaService} from "../../../services/PersonaService/persona.service";
import {Medico} from "../../../models/medico/Medico";
import {Paziente} from "../../../models/paziente/Paziente";
import {Sesso} from "../../../models/person/sesso";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
  standalone: true,

  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonImg, IonTabBar, IonTabButton, IonTabs, IonIcon, IonLabel,
            IonFooter, IonText, IonButton, IonItem, IonRow, IonCard, IonCardHeader, IonCardTitle, IonSegment, IonSegmentButton, IonDatetime,]
})
export class ReservationPage implements OnInit {
  protected paziente: any;

  constructor(
    private navCtrl: NavController,
    private personaService: PersonaService,
  ) {
    this.paziente = personaService.getPersona();

    /* Avere sempre il profilo di default a portata di mano aiuta nello sviluppo dato che altrimenti
       bisognerebbe sempre riloggare dopo il live reload di Ionic per vedere i cambiamenti effettuati */
    if (!this.paziente)
      this.paziente = new Paziente();
  }

  ngOnInit() {
    if (!this.paziente.isSet()) {
      this.paziente.nome = "Mario";
      this.paziente.cognome = "Giannini";
      this.paziente.sesso = Sesso.MASCHIO;
      this.paziente.email = "mario.giannini@paziente.it";
      this.paziente.password = "password123";
      this.paziente.CF = "GNNMRA02R05E335P";
      this.paziente.indirizzo.cap = "IS";
      this.paziente.indirizzo.città = "Pesche";
      this.paziente.indirizzo.via = "Contrada Lappone";
      this.paziente.esenzione = true;
      this.paziente.medico = new Medico();
      this.paziente.medico.nome = "Victor Ivan";
      this.paziente.medico.cognome = "Conde";
      this.paziente.donatoreOrgani = false;
    }
  }

  routeToReservationDate(type: string) {
    this.navCtrl.navigateForward('patient-reservation-date', { state:
        { type }

    });
  }

  routeToSettings() {
    this.personaService.setPersona(this.paziente);
    this.navCtrl.navigateForward("settings");
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

  protected readonly Sesso = Sesso;
}
