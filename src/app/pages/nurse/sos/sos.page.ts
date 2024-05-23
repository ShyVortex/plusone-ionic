import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton, IonCol,
  IonContent, IonFooter, IonGrid,
  IonHeader,
  IonIcon,
  IonImg, IonItem, IonLabel, IonList, IonRefresher, IonRefresherContent, IonRow,
  IonTabBar,
  IonTabButton, IonTabs, IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {NavController} from "@ionic/angular";
import {PersonaService} from "../../../services/PersonaService/persona.service";
import {Infermiere} from "../../../models/infermiere/Infermiere";
import {Sesso} from "../../../models/persona/sesso";
import {StorageService} from "../../../services/StorageService/storage.service";
import {Router} from "@angular/router";
import {InfermiereService} from "../../../services/InfermiereService/infermiere.service";
import {Triage} from "../../../models/triage/Triage";
import {CodiciTriage} from "../../../models/triage/codici-triage";

@Component({
  selector: 'app-sos',
  templateUrl: './sos.page.html',
  styleUrls: ['./sos.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonIcon, IonImg, IonTabBar, IonTabButton, IonTabs, IonLabel, IonFooter, IonText, IonItem, IonList, IonRefresher, IonRefresherContent, IonRow, IonButton, IonGrid, IonCol]
})
export class SOSPage implements OnInit {
  protected infermiere: Infermiere;
  protected paziente: any;
  protected richieste!: Triage[];

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private personaService: PersonaService,
    private infermiereService: InfermiereService,
    private storageService: StorageService
  ) {
    this.infermiere = personaService.getPersona();
    this.paziente = storageService.getState("mario.giannini@paziente.it");

    /* Avere sempre il profilo di default a portata di mano aiuta nello sviluppo dato che altrimenti
       bisognerebbe sempre riloggare dopo il live reload di Ionic per vedere i cambiamenti effettuati */
    if (!this.infermiere)
      this.infermiere = new Infermiere();
  }

  ngOnInit() {
    if (this.infermiere != undefined && !this.infermiere.isSet())
      this.infermiereService.offlineSetInfermiere(this.infermiere);

    if (this.infermiere && this.paziente.richieste)
      this.richieste = this.paziente.richieste;
  }

  handleRefresh(event: any) {}

  routeToRequestDetails(richiesta: Triage) {
    this.storageService.setTriage(richiesta);
    this.navCtrl.navigateForward("nurse-sos-request");
  }

  routeToSettings() {
    this.personaService.setPersona(this.infermiere);
    this.storageService.setRoute(this.router.url);
    this.navCtrl.navigateForward("settings");
  }

  goToHome() {
    this.personaService.setPersona(this.infermiere);
    this.navCtrl.navigateBack("nurse-home", { animated: false });
  }

  goToDrugs() {
    this.personaService.setPersona(this.infermiere);
    this.navCtrl.navigateForward("nurse-drugs", { animated: false });
  }

  goToShifts() {
    this.personaService.setPersona(this.infermiere);
    this.navCtrl.navigateForward("nurse-shifts", { animated: false });
  }

  goToSOS() {
    this.personaService.setPersona(this.infermiere);
    this.navCtrl.navigateForward("nurse-sos", { animated: false });
  }

  protected readonly Sesso = Sesso;
  protected readonly CodiciTriage = CodiciTriage;
}
