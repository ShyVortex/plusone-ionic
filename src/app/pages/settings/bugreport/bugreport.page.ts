import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
    IonButton, IonCol,
    IonContent, IonFooter, IonGrid,
    IonHeader,
    IonIcon,
    IonImg, IonLabel, IonRow, IonSelect, IonSelectOption,
    IonTabBar,
    IonTabButton, IonTabs, IonText, IonTextarea,
    IonTitle,
    IonToolbar
} from '@ionic/angular/standalone';
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-bugreport',
  templateUrl: './bugreport.page.html',
  styleUrls: ['./bugreport.page.scss'],
  standalone: true,
    imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonIcon, IonImg, IonTabBar, IonTabButton, IonTabs, IonButton, IonLabel, IonRow, IonText, IonTextarea, IonSelect, IonSelectOption, IonCol, IonGrid, IonFooter]
})
export class BugreportPage implements OnInit {

  constructor(
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
  }

  /* TODO logica che inserisce all'interno degli ion-select-option
      le schermate corrette a seconda del tipo di utente */

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
