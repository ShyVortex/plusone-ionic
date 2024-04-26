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
  IonButton, IonFooter } from '@ionic/angular/standalone';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
  standalone: true,
    imports: [IonFooter, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonImg, IonTabBar, IonTabButton, IonTabs, IonIcon, IonSegment, IonSegmentButton, IonDatetime, IonLabel, IonButton]
})
export class ReservationPage implements OnInit {
  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  routeToReservationContinue() {
    this.navCtrl.navigateForward('patient-reservation-continue');
  }

}
