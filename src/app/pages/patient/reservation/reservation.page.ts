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
import {Sesso} from "../../../models/persona/sesso";
import {StorageService} from "../../../services/StorageService/storage.service";
import {Router} from "@angular/router";
import {TipologiaMedico} from "../../../models/medico/tipologia-medico";
import {PazienteService} from "../../../services/PazienteService/paziente.service";

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
  private medicOfPatient:Medico

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private personaService: PersonaService,
    private pazienteService: PazienteService,
    private storageService: StorageService
  ) {
    this.paziente = personaService.getPersona();
    this.medicOfPatient = new Medico()

    /* Avere sempre il profilo di default a portata di mano aiuta nello sviluppo dato che altrimenti
       bisognerebbe sempre riloggare dopo il live reload di Ionic per vedere i cambiamenti effettuati */
    if (!this.paziente)
      this.paziente = new Paziente();
  }

  ngOnInit() {
    if (this.paziente.nome === "" && this.personaService.isDefault())
      this.pazienteService.offlineSetPaziente(this.paziente);
    this.pazienteService.getMedicoOfPaziente(this.paziente.id).subscribe(medicoOfPaziente => {
      this.medicOfPatient = medicoOfPaziente;
    })
  }

  routeToReservationDate(type: string) {
    this.navCtrl.navigateForward('patient-reservation-date', { state:
        { type }
    });
  }
  ionViewWillEnter(){
    this.pazienteService.getMedicoOfPaziente(this.paziente.id).subscribe(medicoOfPaziente => {
      this.medicOfPatient = medicoOfPaziente;
    })
  }

  routeToSettings() {
    this.personaService.setPersona(this.paziente);
    this.storageService.setRoute(this.router.url);
    this.navCtrl.navigateForward("settings");
  }

  goToHome() {
    this.personaService.setPersona(this.paziente);
    this.navCtrl.navigateForward("patient-home", { animated: false });
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

  protected isDisable() {
    return (this.medicOfPatient.id === 0) && !this.personaService.isDefault();
  }
}
