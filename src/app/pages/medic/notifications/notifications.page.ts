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
import {Medico} from "../../../models/medico/Medico";
import {TipologiaMedico} from "../../../models/medico/tipologia-medico";

@Component({
  selector: 'app-logbook',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonImg, IonTabBar, IonTabButton, IonTabs, IonIcon, IonLabel, IonFooter, IonText]
})
export class NotificationsPage implements OnInit {
  protected medico: any;

  constructor(
    private navCtrl: NavController,
    private personaService: PersonaService,
  ) {
    this.medico = personaService.getPersona();

    /* Avere sempre il profilo di default a portata di mano aiuta nello sviluppo dato che altrimenti
       bisognerebbe sempre riloggare dopo il live reload di Ionic per vedere i cambiamenti effettuati */
    if (!this.medico)
      this.medico = new Medico();
  }

  ngOnInit() {
    if (!this.medico.isSet()) {
      this.medico.isManager = true;
      this.medico.nome = "Victor";
      this.medico.cognome = "Conde";
      this.medico.email = "victor.conde@medico.it";
      this.medico.password = "default";
      this.medico.CF = "CNDVTR85D07E335W";
      this.medico.ospedale = "Ospedale Ferdinando Veneziale, Isernia (IS)";
      this.medico.reparto = "Cardiologia";
      this.medico.ruolo = "Primario";
      this.medico.tipologiaMedico = TipologiaMedico.OSPEDALIERO;
    }
  }

  routeToSettings() {
    this.personaService.setPersona(this.medico);
    this.navCtrl.navigateForward("settings");
  }

  goToHome() {
    this.personaService.setPersona(this.medico);
    this.navCtrl.navigateBack("medic-home", { animated: false });
  }

  goToNotifs() {
    this.personaService.setPersona(this.medico);
    this.navCtrl.navigateForward("medic-notifs", { animated: false });
  }

  goToPrescriptions() {
    this.personaService.setPersona(this.medico);
    this.navCtrl.navigateForward("medic-prescriptions", { animated: false });
  }
}
