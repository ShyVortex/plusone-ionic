import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonButton, IonContent, IonHeader, IonText, IonTitle, IonToolbar} from '@ionic/angular/standalone';
import {AnimationOptions, LottieComponent} from "ngx-lottie";
import {AnimationItem} from "lottie-web";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-signup-pending',
  templateUrl: './signup-pending.page.html',
  styleUrls: ['./signup-pending.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonText, LottieComponent]
})

export class SignupPendingPage implements OnInit {
  options: AnimationOptions = {
    path: '../../../assets/animations/pending.json',
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

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  goToLoginAnimated() {
    this.navCtrl.navigateBack("login", { animated: true });
  }
}
