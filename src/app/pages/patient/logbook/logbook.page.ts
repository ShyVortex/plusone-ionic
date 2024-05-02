import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
    IonCard, IonCardHeader, IonCardTitle,
    IonContent, IonFooter,
    IonHeader, IonIcon,
    IonImg, IonItem, IonLabel, IonRow,
    IonTabBar,
    IonTabButton,
    IonTabs, IonText,
    IonTitle,
    IonToolbar
} from '@ionic/angular/standalone';
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-logbook',
  templateUrl: './logbook.page.html',
  styleUrls: ['./logbook.page.scss'],
  standalone: true,
    imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonImg, IonTabBar, IonTabButton, IonTabs, IonIcon, IonLabel, IonFooter, IonText, IonCard, IonCardHeader, IonCardTitle, IonItem, IonRow]
})
export class LogbookPage implements OnInit {

  constructor(
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
  }

  routeToSettings() {
    this.navCtrl.navigateForward("settings");
  }

  routeToLogbookPrescriptions() {
    this.navCtrl.navigateForward("patient-logbook-prescriptions");
  }

  routeToLogbookReservations() {
    this.navCtrl.navigateForward("patient-logbook-reservations");
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
