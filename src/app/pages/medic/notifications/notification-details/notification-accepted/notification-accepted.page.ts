import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonImg,
  IonTabBar, IonTabButton, IonTabs,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {NavController} from "@ionic/angular";
import {AnimationOptions, LottieComponent} from "ngx-lottie";
import {Terapia} from "../../../../../models/terapia/Terapia";
import {AnimationItem} from "lottie-web";
import {StorageService} from "../../../../../services/StorageService/storage.service";

@Component({
  selector: 'app-notification-accepted',
  templateUrl: './notification-accepted.page.html',
  styleUrls: ['./notification-accepted.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonText, IonFooter, IonImg, IonTabBar, IonTabButton, IonTabs, IonButton, LottieComponent]
})

export class NotificationAcceptedPage implements OnInit {
  protected prenotazione: Terapia;

  options: AnimationOptions = {
    path: '../../../assets/animations/green-check.json',
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
    this.navCtrl.navigateBack("medic-home", { animated: false });
  }

  goToNotifs() {
    this.navCtrl.navigateForward("medic-notifs", { animated: false });
  }

  goToPatients() {
    this.navCtrl.navigateForward("medic-patients", { animated: false });
  }
}
