/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, IonContent, IonHeader, IonTitle, IonToolbar, IonSegment, IonIcon, IonSegmentButton, IonLabel, IonButtons, IonBackButton, IonGrid, IonRow, IonCol, IonCard, IonButton, IonItem, IonItemDivider, IonTabs, IonTabBar, IonTabButton, IonImg, NavController, IonFooter, IonAlert } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { text } from 'ionicons/icons';
import { time } from './times';

@Component({
  selector: 'app-reservation-continue',
  templateUrl: './reservation-continue.page.html',
  styleUrls: ['./reservation-continue.page.scss'],
  standalone: true,
  imports: [IonAlert, IonFooter, IonImg, IonTabButton, IonTabBar, IonTabs, IonItemDivider, IonItem, IonButton, IonCard, IonCol, IonRow, IonGrid, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonSegment, IonIcon, IonSegmentButton, IonLabel]
})
export class ReservationContinuePage implements OnInit {
  times!: time[];
  actualIndex!: number;
  
  type!: string;
  hospitalWard!: string;
  date!: string;
  
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

  constructor(private navCtrl: NavController, private route: Router, private alertController: AlertController) {
    // actualIndex inital value is a placeholder 
    this.actualIndex = 6;
    this.times = [
      { time: '7:00', clicked: false },
      { time: '11:00', clicked: false },
      { time: '15:30', clicked: false },
      { time: '16:15', clicked: false },
      { time: '18:00', clicked: false },
      { time: '18:30', clicked: false },
    ];
    console.log(this.type = history.state.type);
    console.log(this.hospitalWard = history.state.hospitalWard);
    console.log(this.date = history.state.date);
  }

  ngOnInit(): void {}

  async missingTimeAlert() {
    const alert = await this.alertController.create({
      header: 'Errore',
      message: 'Fornire un orario per la prenotazione',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async confirmAlert() {
    const alert = await this.alertController.create({
      header: 'Conferma prenotazione',
      subHeader: 'Visita ' + this.type + ', ' + this.hospitalWard,
      message: this.date + ', alle ore ' + this.times[this.actualIndex].time,
      buttons: this.alertButtons,
    });

    await alert.present();
  }

  toggleClickedItem(clickedIndex: number) {
    if (this.actualIndex < 6) this.times[this.actualIndex].clicked = !this.times[this.actualIndex].clicked;
    /* if (this.actualIndex !== clickedIndex) */ this.actualIndex = clickedIndex;
    
    this.times[clickedIndex].clicked = !this.times[clickedIndex].clicked;
    //console.log(this.actualIndex, clickedIndex);
  }

  submit() {
    if (this.actualIndex === 6) {
      this.missingTimeAlert();
    } else {
      this.confirmAlert();
    }
  }

  routeToReservationConfirmed() {
    this.navCtrl.navigateForward('patient-reservation-confirmed', { state: {
      type: this.type,
      hospitalWard: this.hospitalWard,
      date: this.date,
      time: this.times[this.actualIndex].time,
    }});
  }
  
  navigateBack() {
    this.navCtrl.navigateBack('patient-reservation');
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