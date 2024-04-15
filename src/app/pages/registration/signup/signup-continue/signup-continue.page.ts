import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { 
  IonContent,
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonImg, 
  IonItem, 
  IonInput, 
  IonButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-signup-continue',
  templateUrl: './signup-continue.page.html',
  styleUrls: ['./signup-continue.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonImg, IonItem, IonInput, IonButton]
})
export class SignupContinuePage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {}

  routeToLogin() {
    this.navCtrl.navigateForward('login');
  }
}
