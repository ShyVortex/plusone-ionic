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
import {Paziente} from "../../../models/paziente/Paziente";
import {Medico} from "../../../models/medico/Medico";
import {Sesso} from "../../../models/person/sesso";
import {StorageService} from "../../../services/StorageService/storage.service";
import {Router} from "@angular/router";
import {TipologiaMedico} from "../../../models/medico/tipologia-medico";

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

  routeToSettings() {
    this.personaService.setPersona(this.paziente);
    this.storageService.setRoute(this.router.url);
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

  protected readonly Sesso = Sesso;
}
