/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { AlertController, IonContent, IonHeader, IonIcon, IonImg, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar, NavController, IonSegment, IonSegmentButton, IonDatetime, IonLabel, IonButton,  IonFooter,  IonRow, IonSelect, IonSelectOption, IonAlert } from '@ionic/angular/standalone';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation-date.page.html',
  styleUrls: ['./reservation-date.page.scss'],
  standalone: true,
  imports: [IonAlert, IonFooter, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonImg, IonTabBar,IonTabButton,IonTabs,IonIcon,IonSegment,IonSegmentButton, IonDatetime, IonLabel, IonButton,IonRow,IonSelect,IonSelectOption,]
})
export class ReservationDatePage implements OnInit {
  currentDateTime!: string;
  type!: string;
  hospitalWard!: string;
  date!: string;

  constructor(private navCtrl: NavController, private alertController: AlertController) {
    this.currentDateTime = new Date().toISOString();
    console.log(this.type = history.state.type, this.currentDateTime);
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Errore',
      message: 'Compilare tutti i campi.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  ngOnInit() {}

  storeHospitalWard(event: CustomEvent) {
    this.hospitalWard = event.detail.value;
  }

  storeDate(event: CustomEvent) {
    this.date = event.detail.value.split('T')[0];
  }

  submit() {
    if (!this.hospitalWard || !this.date) {
      this.presentAlert();
    } else {
      this.routeToReservationContinue();
    }
  }

  navigateBack() {
    this.navCtrl.navigateBack("patient-reservation");
  }

  routeToReservationContinue() {
    this.navCtrl.navigateForward("patient-reservation-continue", {
      state: {
        type: this.type,
        hospitalWard: this.hospitalWard,
        date: this.date
      }
    });
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
