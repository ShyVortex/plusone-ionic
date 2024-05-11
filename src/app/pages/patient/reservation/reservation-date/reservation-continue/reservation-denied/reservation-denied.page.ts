/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonFooter,
  IonButton,
  IonTabBar,
  IonTabs,
  IonTabButton,
  IonImg,
  IonText
} from '@ionic/angular/standalone';
import { AnimationItem } from 'lottie-web';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';
import { NavController } from "@ionic/angular";

@Component({
  selector: 'app-reservation-denied',
  templateUrl: './reservation-denied.page.html',
  styleUrls: ['./reservation-denied.page.scss'],
  standalone: true,
  imports: [LottieComponent, IonImg, IonTabButton, IonTabs, IonTabBar, IonButton, IonFooter, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonText]
})
export class ReservationDeniedPage implements OnInit {
  options: AnimationOptions = {
    path: '../../../assets/animations/error.json',
    loop: false,
  };

  styles: Partial<CSSStyleDeclaration> = {
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '2em',
    marginBottom: '4em',
    height: '12em',
  }

  constructor(private navCtrl: NavController) { }

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
