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
import {StorageService} from "../../../services/StorageService/storage.service";
import {Router} from "@angular/router";
import {TipologiaMedico} from "../../../models/medico/tipologia-medico";

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
    private router: Router,
    private personaService: PersonaService,
    private storageService: StorageService
  ) {
    this.paziente = personaService.getPersona();

    /* Avere sempre il profilo di default a portata di mano aiuta nello sviluppo dato che altrimenti
       bisognerebbe sempre riloggare dopo il live reload di Ionic per vedere i cambiamenti effettuati */
    if (!this.paziente)
      this.paziente = new Paziente();
  }

  ngOnInit() {
    if (!this.paziente.isSet())
      this.offlineSetPaziente();
  }

  offlineSetPaziente() {
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
    this.paziente.medico = this.offlineSetMedicoCurante();
    this.paziente.donatoreOrgani = false;
  }

  offlineSetMedicoCurante(): Medico {
    let medico = new Medico();

    medico.isManager = true;
    medico.nome = "Victor";
    medico.cognome = "Conde";
    medico.sesso = Sesso.MASCHIO;
    medico.email = "victor.conde@medico.it";
    medico.password = "password123";
    medico.CF = "CNDVTR85D07E335W";
    medico.ospedale = "Ospedale Ferdinando Veneziale, Isernia (IS)";
    medico.reparto = "Cardiologia";
    medico.ruolo = "Primario";
    medico.tipologiaMedico = TipologiaMedico.DI_BASE;

    return medico;
  }

  routeToReservationDate(type: string) {
    this.navCtrl.navigateForward('patient-reservation-date', { state:
        { type }

    });
  }

  routeToSettings() {
    this.personaService.setPersona(this.paziente);
    this.storageService.setRoute(this.router.url);
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
