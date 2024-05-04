import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonContent, IonFooter,
  IonHeader,
  IonIcon,
  IonImg, IonItem, IonLabel,
  IonTabBar,
  IonTabButton, IonTabs, IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonIcon, IonImg, IonTabBar, IonTabButton, IonTabs, IonItem, IonText, IonButton, IonLabel, IonFooter]
})
export class SettingsPage implements OnInit {

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  navigateBack() {
    // TODO logica che torna indietro nella pagina corretta a seconda del tipo di utente
    this.navCtrl.navigateBack("patient-home");
  }

  routeToSecurity() {
    this.navCtrl.navigateForward("settings-security");
  }

  routeToBugReport() {
    this.navCtrl.navigateForward("settings-bugreport");
  }

  routeToInfo() {
    this.navCtrl.navigateForward("settings-info");
  }

  logout() {
    this.navCtrl.navigateRoot("login");
  }

  goToHome() {
    this.navCtrl.navigateBack("patient-home", { animated: false });
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
