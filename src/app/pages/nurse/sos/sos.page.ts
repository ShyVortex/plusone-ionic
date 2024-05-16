import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonFooter,
  IonHeader,
  IonIcon,
  IonImg, IonLabel,
  IonTabBar,
  IonTabButton, IonTabs, IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {NavController} from "@ionic/angular";
import {PersonaService} from "../../../services/PersonaService/persona.service";
import {Infermiere} from "../../../models/infermiere/Infermiere";
import {Sesso} from "../../../models/person/sesso";

@Component({
  selector: 'app-sos',
  templateUrl: './sos.page.html',
  styleUrls: ['./sos.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonIcon, IonImg, IonTabBar, IonTabButton, IonTabs, IonLabel, IonFooter, IonText]
})
export class SOSPage implements OnInit {
  protected infermiere: any;

  constructor(
    private navCtrl: NavController,
    private personaService: PersonaService,
  ) {
    this.infermiere = personaService.getPersona();

    /* Avere sempre il profilo di default a portata di mano aiuta nello sviluppo dato che altrimenti
       bisognerebbe sempre riloggare dopo il live reload di Ionic per vedere i cambiamenti effettuati */
    if (!this.infermiere)
      this.infermiere = new Infermiere();
  }

  ngOnInit() {
    if (!this.infermiere.isSet()) {
      this.infermiere.nome = "Teresa";
      this.infermiere.cognome = "Nucci";
      this.infermiere.sesso = Sesso.FEMMINA;
      this.infermiere.email = "teresa.nucci@infermiere.it";
      this.infermiere.password = "password123";
      this.infermiere.CF = "NCCTRS81M16B519G";
      this.infermiere.ospedale = "Ospedale Ferdinando Veneziale, Isernia (IS)";
      this.infermiere.reparto = "Chirurgia";
      this.infermiere.ruolo = "Infermiere assistente";
    }
  }

  routeToSettings() {
    this.personaService.setPersona(this.infermiere);
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
