import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
    IonButton,
    IonCol,
    IonContent, IonFooter,
    IonGrid,
    IonHeader,
    IonImg, IonLabel, IonRow, IonSelect, IonSelectOption, IonTabBar, IonTabButton, IonTabs, IonText, IonTextarea,
    IonTitle,
    IonToolbar
} from '@ionic/angular/standalone';
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
  standalone: true,
    imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonCol, IonGrid, IonImg, IonLabel, IonRow, IonSelect, IonSelectOption, IonTabBar, IonTabButton, IonTabs, IonTextarea, IonText, IonFooter]
})
export class InfoPage implements OnInit {

  constructor(
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
  }

  navigateBack() {
    this.navCtrl.navigateBack("settings");
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
