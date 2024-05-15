import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonImg,
  IonItem,
  IonInput,
  IonButton, IonText
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonImg, IonItem, IonInput, IonButton, IonText]
})
export class SignupPage implements OnInit {
  protected password: string;
  protected isPasswordVisible: boolean = false;

  constructor(private navCtrl: NavController) {
    this.password = "";
  }

  ngOnInit() {}

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  routeToLogin() {
    this.navCtrl.navigateBack('login');
  }

  continueSignUp() {
    this.navCtrl.navigateForward('signup-continue')
  }

}
