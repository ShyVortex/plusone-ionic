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
    IonTabs, IonText, IonTextarea,
    IonTitle,
    IonToolbar
} from '@ionic/angular/standalone';
import {NavController} from "@ionic/angular";
import {Infermiere} from "../../../models/infermiere/Infermiere";
import {PersonaService} from "../../../services/PersonaService/persona.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
    imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonImg, IonTabBar, IonTabButton, IonTabs, IonButton, IonLabel, IonRow, IonText, IonTextarea, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonFooter, IonItem]
})
export class HomePage implements OnInit {
  protected infermiere: Infermiere;

  constructor(
    private navCtrl: NavController,
    private personaService: PersonaService
  ) {
    this.infermiere = new Infermiere();
  }

  ngOnInit() {
    if (!this.infermiere.isSet()) {
      this.infermiere.nome = "Mario";
      this.infermiere.cognome = "Giannini";
      this.infermiere.email = "default@infermiere.it";
      this.infermiere.password = "default";
      this.infermiere.CF = "GNNMRA02R05E335P";
      this.infermiere.ospedale = "Ospedale Ferdinando Veneziale, Isernia (IS)";
      this.infermiere.reparto = "Chirurgia";
      this.infermiere.ruolo = "Infermiere assistente";
    }
  }

  routeToSettings() {
    this.personaService.setPersona(this.infermiere);
    this.navCtrl.navigateForward("settings");
  }

  routeToSecurity() {
    this.personaService.setPersona(this.infermiere);
    this.navCtrl.navigateForward("settings-security");
  }

  logout() {
    this.navCtrl.navigateRoot("login");
  }

  goToHome() {
    this.navCtrl.navigateBack("nurse-home", { animated: false });
  }

  goToDrugs() {
    this.navCtrl.navigateForward("nurse-drugs", { animated: false });
  }

  goToShifts() {
    this.navCtrl.navigateForward("nurse-shifts", { animated: false });
  }

  goToSOS() {
    this.navCtrl.navigateForward("nurse-sos", { animated: false });
  }
}
