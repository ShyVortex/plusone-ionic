import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton, IonCol,
  IonContent,
  IonFooter, IonGrid,
  IonHeader,
  IonImg,
  IonLabel, IonRadio, IonRadioGroup, IonRow, IonSelect, IonSelectOption, IonTabBar, IonTabButton, IonTabs, IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-sos-survey',
  templateUrl: './sos-survey.page.html',
  styleUrls: ['./sos-survey.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonFooter, IonImg, IonLabel, IonTabBar, IonTabButton, IonTabs, IonRow, IonSelect, IonSelectOption, IonRadio, IonRadioGroup, IonText, IonGrid, IonCol]
})
export class SosSurveyPage implements OnInit {

  constructor(
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
  }

  navigateBack() {
    this.navCtrl.navigateBack("patient-sos");
  }

  routeToSurveyConfirmed() {
    this.navCtrl.navigateForward("patient-sos-survey-confirmed");
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
