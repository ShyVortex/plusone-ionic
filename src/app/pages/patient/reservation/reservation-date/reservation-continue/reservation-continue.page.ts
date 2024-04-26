/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonSegment,
  IonIcon,
  IonSegmentButton,
  IonLabel,
  IonButtons,
  IonBackButton,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonButton,
  IonItem,
  IonItemDivider,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonImg,
  NavController, IonFooter, IonAlert } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { text } from 'ionicons/icons';

@Component({
  selector: 'app-reservation-continue',
  templateUrl: './reservation-continue.page.html',
  styleUrls: ['./reservation-continue.page.scss'],
  standalone: true,
  imports: [IonAlert, IonFooter, IonImg, IonTabButton, IonTabBar, IonTabs, IonItemDivider, IonItem, IonButton, IonCard, IonCol, IonRow, IonGrid, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonSegment, IonIcon, IonSegmentButton, IonLabel]
})
export class ReservationContinuePage implements OnInit {
  public alertButtons = [
    {
      text: 'Annulla',
      role: 'cancel',
      handler: () => {}
    },
    {
      text  : 'Conferma',
      role: 'confirm',
      handler: () => {
        this.routeToReservationConfirmed();
      }
    }
  ];
  itemClicked: boolean = false;

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  routeToReservationConfirmed() {
    this.navCtrl.navigateForward('patient-reservation-confirmed');
  }

  navigateBack() {
    this.navCtrl.navigateBack('patient-reservation');
  }

  toggleClickedItem() {
    this.itemClicked = !this.itemClicked;
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
