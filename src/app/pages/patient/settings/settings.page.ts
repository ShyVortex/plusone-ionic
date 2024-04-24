import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg, IonItem, IonLabel,
  IonTabBar,
  IonTabButton, IonTabs, IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonIcon, IonImg, IonTabBar, IonTabButton, IonTabs, IonItem, IonText, IonButton, IonLabel]
})
export class SettingsPage implements OnInit {

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  navigateBack() {
    this.navCtrl.navigateBack("patient-home");
  }

  routeToSecurity() {
    this.navCtrl.navigateForward("patient-security");
  }

  routeToBugReport() {
    this.navCtrl.navigateForward("patient-bugreport");
  }

  routeToInfo() {
    this.navCtrl.navigateForward("patient-app-info");
  }

  logout() {
    this.navCtrl.navigateBack("login");
  }
}
