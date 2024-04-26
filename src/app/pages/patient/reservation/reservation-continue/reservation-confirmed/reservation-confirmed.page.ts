/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonIcon, IonImg, IonButton, IonTabBar, IonTabs, IonTabButton, IonFooter, IonLabel } from '@ionic/angular/standalone';

import { AnimationItem } from 'lottie-web';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-reservation-confirmed',
  templateUrl: './reservation-confirmed.page.html',
  styleUrls: ['./reservation-confirmed.page.scss'],
  standalone: true,
  imports: [LottieComponent, IonLabel, IonFooter, IonTabButton, IonTabs, IonTabBar, IonButton, IonImg, IonIcon, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ReservationConfirmedPage implements OnInit {
  constructor() { }

  ngOnInit() {
  }

  options: AnimationOptions = {
    path: '../../../assets/animations/green-check.json',
    loop: false,
  };

  /* styles: Partial<CSSStyleDeclaration> = {
    width: '200em',
    height: '200em',
    // margin: 'auto auto',
  }; */

  animationCreated(animationItem: AnimationItem): void {
    
    console.log("Animazione renderizzata. \n\n", animationItem);
  }

}
