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
import {Sesso} from "../../../models/persona/sesso";
import {StorageService} from "../../../services/StorageService/storage.service";
import {Router} from "@angular/router";
import {Paziente} from "../../../models/paziente/Paziente";
import {MedicoService} from "../../../services/MedicoService/medico.service";

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
    private medicoService: MedicoService,
    private storageService: StorageService
  ) {
    this.medico = personaService.getPersona();

    /* Avere sempre il profilo di default a portata di mano aiuta nello sviluppo dato che altrimenti
       bisognerebbe sempre riloggare dopo il live reload di Ionic per vedere i cambiamenti effettuati */
    if (!this.medico)
      this.medico = new Medico();
  }

  ngOnInit() {
    if (!this.medico.isManager && !this.medico.isSet())
      this.medicoService.offlineSetMedico(this.medico);
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
