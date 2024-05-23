import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonImg,
  IonLabel, IonTabBar, IonTabButton, IonTabs, IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {AnimationOptions, LottieComponent} from "ngx-lottie";
import {NavController} from "@ionic/angular";
import {AnimationItem} from "lottie-web";
import {Geolocation} from "@capacitor/geolocation";

@Component({
  selector: 'app-sos-survey-confirmed',
  templateUrl: './sos-survey-confirmed.page.html',
  styleUrls: ['./sos-survey-confirmed.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonFooter, IonImg, IonLabel, IonTabBar, IonTabButton, IonTabs, LottieComponent, IonText]
})
export class SosSurveyConfirmedPage implements OnInit {
  private latitude!: number;
  private longitude!: number;

  options: AnimationOptions = {
    path: '../../../assets/animations/hospital.json',
    loop: false,
  };

  styles: Partial<CSSStyleDeclaration> = {
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '-3em',
    marginBottom: '-4em',
    height: '26em',
  }

  constructor(private navCtrl: NavController) {
    console.log(history.state.type, history.state.hospitalWard, history.state.date, history.state.time);
  }

  ngOnInit() {
    console.clear();
    this.getCurrentLocation();
  }

  animationCreated(animationItem: AnimationItem): void {
    //console.log("Animazione renderizzata. \n\n", animationItem);
  }

  async getCurrentLocation() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      this.latitude = coordinates.coords.latitude;
      this.longitude = coordinates.coords.longitude;
      console.log('Latitudine:', this.latitude, 'Longitudine:', this.longitude);
    } catch (error) {
      console.error('Error getting location', error);
    }
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
