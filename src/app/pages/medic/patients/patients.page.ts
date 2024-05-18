import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonCard, IonCardHeader, IonCardTitle,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonImg, IonItem, IonRow,
  IonTabBar, IonTabButton, IonTabs, IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {NavController} from "@ionic/angular";
import {PersonaService} from "../../../services/PersonaService/persona.service";
import {Medico} from "../../../models/medico/Medico";
import {TipologiaMedico} from "../../../models/medico/tipologia-medico";
import {Sesso} from "../../../models/person/sesso";
import {StorageService} from "../../../services/StorageService/storage.service";
import {Router} from "@angular/router";
import {Paziente} from "../../../models/paziente/Paziente";

@Component({
  selector: 'app-patients',
  templateUrl: './patients.page.html',
  styleUrls: ['./patients.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonFooter, IonIcon, IonImg, IonTabBar, IonTabButton, IonTabs, IonText, IonCard, IonCardHeader, IonCardTitle, IonItem, IonRow]
})
export class PatientsPage implements OnInit {
  protected medico: any;

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private personaService: PersonaService,
    private storageService: StorageService
  ) {
    this.medico = personaService.getPersona();

    /* Avere sempre il profilo di default a portata di mano aiuta nello sviluppo dato che altrimenti
       bisognerebbe sempre riloggare dopo il live reload di Ionic per vedere i cambiamenti effettuati */
    if (!this.medico)
      this.medico = new Medico();
  }

  ngOnInit() {
    if (!this.medico.isSet())
      this.offlineSetMedico();
  }

  offlineSetMedico() {
    this.medico.isManager = true;
    this.medico.nome = "Victor";
    this.medico.cognome = "Conde";
    this.medico.sesso = Sesso.MASCHIO;
    this.medico.email = "victor.conde@medico.it";
    this.medico.password = "password123";
    this.medico.CF = "CNDVTR85D07E335W";
    this.medico.ospedale = "Ospedale Ferdinando Veneziale, Isernia (IS)";
    this.medico.reparto = "Cardiologia";
    this.medico.ruolo = "Primario";
    this.medico.tipologiaMedico = TipologiaMedico.DI_BASE;
    this.medico.pazienti.push(this.offlineAddPaziente());
  }

  offlineAddPaziente(): Paziente {
    let paziente: Paziente = new Paziente();

    paziente.nome = "Mario";
    paziente.cognome = "Giannini";
    paziente.sesso = Sesso.MASCHIO;
    paziente.email = "mario.giannini@paziente.it";
    paziente.password = "password123";
    paziente.CF = "GNNMRA02R05E335P";
    paziente.indirizzo.cap = "IS";
    paziente.indirizzo.città = "Pesche";
    paziente.indirizzo.via = "Contrada Lappone";
    paziente.esenzione = true;
    paziente.donatoreOrgani = false;

    return paziente;
  }

  routeToSettings() {
    this.personaService.setPersona(this.medico);
    this.storageService.setRoute(this.router.url);
    this.navCtrl.navigateForward("settings");
  }

  routeToPrescriptions() {
    this.navCtrl.navigateForward("medic-patients-prescriptions");
  }

  routeToHomeCare() {
    this.navCtrl.navigateForward("medic-patients-homecare");
  }

  routeToIllnessCertificate() {
    this.navCtrl.navigateForward("medic-patients-illcert");
  }

  routeToRecords() {
    this.navCtrl.navigateForward("medic-patients-records");
  }

  routeToSDO() {
    this.navCtrl.navigateForward("medic-patients-sdo");
  }

  routeToAssistance() {
    this.navCtrl.navigateForward("medic-patients-assistance");
  }

  goToHome() {
    this.personaService.setPersona(this.medico);
    this.navCtrl.navigateBack("medic-home", { animated: false });
  }

  goToNotifs() {
    this.personaService.setPersona(this.medico);
    this.navCtrl.navigateForward("medic-notifs", { animated: false });
  }

  goToPatients() {
    this.personaService.setPersona(this.medico);
    this.navCtrl.navigateForward("medic-patients", { animated: false });
  }

  protected readonly TipologiaMedico = TipologiaMedico;
  protected readonly Sesso = Sesso;
}
