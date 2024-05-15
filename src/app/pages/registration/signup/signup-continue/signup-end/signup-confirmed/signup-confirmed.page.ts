import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonButton, IonContent, IonHeader, IonText, IonTitle, IonToolbar} from '@ionic/angular/standalone';
import {AnimationOptions, LottieComponent} from "ngx-lottie";
import {AnimationItem} from "lottie-web";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-signup-confirmed',
  templateUrl: './signup-confirmed.page.html',
  styleUrls: ['./signup-confirmed.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonText, LottieComponent]
})
export class SignupConfirmedPage implements OnInit {
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
  animationCreated(animationItem: AnimationItem): void {
    //console.log("Animazione renderizzata. \n\n", animationItem);
  }
  goToHomeAnimated() {
    this.navCtrl.navigateBack("login", { animated: true });
  }
  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

}
