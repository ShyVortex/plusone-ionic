import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonImg,
  IonTabBar, IonTabButton, IonTabs, IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {AnimationOptions, LottieComponent} from "ngx-lottie";
import {Terapia} from "../../../../../models/terapia/Terapia";
import {NavController} from "@ionic/angular";
import {AnimationItem} from "lottie-web";
import {StorageService} from "../../../../../services/StorageService/storage.service";

@Component({
  selector: 'app-notification-denied',
  templateUrl: './notification-denied.page.html',
  styleUrls: ['./notification-denied.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonFooter, IonImg, IonTabBar, IonTabButton, IonTabs, IonText, LottieComponent]
})

export class NotificationDeniedPage implements OnInit {
  protected prenotazione: Terapia;

  options: AnimationOptions = {
    path: '../../../assets/animations/error.json',
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

  constructor(
    private navCtrl: NavController,
    private storageService: StorageService
  ) {
    this.prenotazione = storageService.getTerapia();
  }

  ngOnInit() {
  }

  animationCreated(animationItem: AnimationItem): void {
    //console.log("Animazione renderizzata. \n\n", animationItem);
  }

  goToNotifsAnimated() {
    this.navCtrl.navigateBack("medic-notifs", { animated: true });
  }

  goToHome() {
    this.navCtrl.navigateForward("medic-home", { animated: false });
  }

  goToNotifs() {
    this.navCtrl.navigateForward("medic-notifs", { animated: false });
  }

  goToPatients() {
    this.navCtrl.navigateForward("medic-patients", { animated: false });
  }
}
