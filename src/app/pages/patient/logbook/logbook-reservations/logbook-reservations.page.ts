import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
    IonButton,
    IonContent,
    IonFooter,
    IonHeader,
    IonImg, IonItem,
    IonLabel, IonList, IonRefresher, IonRefresherContent, IonRow, IonTabBar, IonTabButton, IonTabs, IonText,
    IonTitle,
    IonToolbar
} from '@ionic/angular/standalone';
import {NavController} from "@ionic/angular";
import {Terapia} from "../../../../models/terapia/Terapia";
import {PersonaService} from "../../../../services/PersonaService/persona.service";
import {Paziente} from "../../../../models/paziente/Paziente";
import {StorageService} from "../../../../services/StorageService/storage.service";
import {Observable} from "rxjs";
import {PazienteService} from "../../../../services/PazienteService/paziente.service";

@Component({
  selector: 'app-logbook-reservations',
  templateUrl: './logbook-reservations.page.html',
  styleUrls: ['./logbook-reservations.page.scss'],
  standalone: true,
    imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonFooter, IonImg, IonLabel, IonTabBar, IonTabButton, IonTabs, IonItem, IonList, IonRefresher, IonRefresherContent, IonRow, IonText]
})

export class LogbookReservationsPage implements OnInit {
  protected paziente: Paziente;
  protected prenotazioni: Terapia[];
  private getAllPrenotazioniByPaziente!:Observable<Terapia[]>;

  constructor(
    private navCtrl: NavController,
    private personaService: PersonaService,
    private storageService: StorageService,
    private pazienteService: PazienteService
  ) {
    this.paziente = personaService.getPersona();
    this.prenotazioni = [];
  }

  ngOnInit() {
    console.clear();
    console.log(this.paziente);

    if (!this.personaService.isDefault())
      this.getAllPrenotazioniByPaziente = this.pazienteService.getAllPrenotazioniByPaziente(this.paziente.id);

    else {
      this.prenotazioni = this.paziente.terapie;
      console.log(this.prenotazioni);
    }
  }

  ionViewWillEnter(){
    this.getAllPrenotazioniByPaziente.subscribe(value => {
      this.prenotazioni = value;
    })
  }

  navigateBack() {
    this.navCtrl.navigateBack("patient-logbook");
  }

  routeToReservationDetails(prenotazione: Terapia) {
    this.storageService.setTerapia(prenotazione);
    this.navCtrl.navigateForward("patient-logbook-reservation-details");
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
}
