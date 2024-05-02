/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonIcon, IonImg, IonButton, IonTabBar, IonTabs, IonTabButton, IonFooter, IonLabel } from '@ionic/angular/standalone';

import { AnimationItem } from 'lottie-web';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-reservation-confirmed',
  templateUrl: './reservation-confirmed.page.html',
  styleUrls: ['./reservation-confirmed.page.scss'],
  standalone: true,
  imports: [LottieComponent, IonLabel, IonFooter, IonTabButton, IonTabs, IonTabBar, IonButton, IonImg, IonIcon, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ReservationConfirmedPage implements OnInit {
  options: AnimationOptions = {
    path: '../../../assets/animations/green-check.json',
    loop: false,
  };

  constructor(private navCtrl: NavController) {
    console.log(history.state.type, history.state.hospitalWard, history.state.date, history.state.time); 
  }

  ngOnInit() {}

  animationCreated(animationItem: AnimationItem): void {
    //console.log("Animazione renderizzata. \n\n", animationItem);
  }

  goToHomeAnimated() {
    this.navCtrl.navigateBack("patient-home", { animated: true });
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
