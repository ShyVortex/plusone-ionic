import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonFooter,
  IonHeader,
  IonIcon,
  IonImg, IonLabel,
  IonTabBar,
  IonTabButton, IonTabs,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.page.html',
  styleUrls: ['./prescriptions.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonIcon, IonImg, IonTabBar, IonTabButton, IonTabs, IonLabel, IonFooter]
})
export class PrescriptionsPage implements OnInit {

  constructor(
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
  }

  goToHome() {
    this.navCtrl.navigateBack("medic-home");
  }

  goToNotifs() {
    this.navCtrl.navigateForward("medic-notifs");
  }

  goToPrescriptions() {
    this.navCtrl.navigateForward("medic-prescriptions");
  }
}
