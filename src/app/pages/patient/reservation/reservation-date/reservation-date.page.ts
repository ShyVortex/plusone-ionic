import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader, IonIcon,
  IonImg,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
  NavController,
  IonSegment,
  IonSegmentButton,
  IonDatetime,
  IonLabel,
  IonButton, IonFooter, IonRow
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation-date.page.html',
  styleUrls: ['./reservation-date.page.scss'],
  standalone: true,
  imports: [IonFooter, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonImg, IonTabBar, IonTabButton, IonTabs, IonIcon, IonSegment, IonSegmentButton, IonDatetime, IonLabel, IonButton, IonRow]
})
export class ReservationDatePage implements OnInit {
  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  navigateBack() {
    this.navCtrl.navigateBack("patient-reservation");
  }

  routeToReservationContinue() {
    this.navCtrl.navigateForward("patient-reservation-continue");
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
