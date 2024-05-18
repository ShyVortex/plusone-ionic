import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonFooter,
  IonHeader, IonIcon,
  IonImg, IonLabel,
  IonTabBar,
  IonTabButton,
  IonTabs, IonText,
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

@Component({
  selector: 'app-shifts',
  templateUrl: './shifts.page.html',
  styleUrls: ['./shifts.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonImg, IonTabBar, IonTabButton, IonTabs, IonIcon, IonLabel, IonFooter, IonText]
})
export class ShiftsPage implements OnInit {
  protected infermiere: any;

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private personaService: PersonaService,
    private infermiereService: InfermiereService,
    private storageService: StorageService
  ) {
    this.infermiere = personaService.getPersona();

    /* Avere sempre il profilo di default a portata di mano aiuta nello sviluppo dato che altrimenti
       bisognerebbe sempre riloggare dopo il live reload di Ionic per vedere i cambiamenti effettuati */
    if (!this.infermiere)
      this.infermiere = new Infermiere();
  }

  ngOnInit() {
    if (!this.infermiere.isSet())
      this.infermiereService.offlineSetInfermiere(this.infermiere);
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
}
