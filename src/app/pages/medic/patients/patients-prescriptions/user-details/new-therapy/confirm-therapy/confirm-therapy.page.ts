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
import {NavController} from "@ionic/angular";
import {AnimationItem} from "lottie-web";

@Component({
  selector: 'app-confirm-therapy',
  templateUrl: './confirm-therapy.page.html',
  styleUrls: ['./confirm-therapy.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonFooter, IonImg, IonTabBar, IonTabButton, IonTabs, IonText, LottieComponent]
})

export class ConfirmTherapyPage implements OnInit {
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
  ) {

  }

  ngOnInit() {

  }

  animationCreated(animationItem: AnimationItem): void {
    //console.log("Animazione renderizzata. \n\n", animationItem);
  }

  goToHome() {
    this.navCtrl.navigateForward('medic-home');
  }

  goToNotifs() {
    this.navCtrl.navigateForward('medic-notifs');
  }

  goToPatients() {
    this.navCtrl.navigateForward("medic-patients");
  }

  protected goToPatientsListAnimated() {
    this.navCtrl.navigateForward('medic-patients-prescriptions');
  }
}
