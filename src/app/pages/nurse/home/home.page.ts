import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
    IonButton, IonCard, IonCardHeader, IonCardTitle,
    IonContent, IonFooter,
    IonHeader, IonIcon,
    IonImg, IonItem, IonLabel, IonRow,
    IonTabBar,
    IonTabButton,
    IonTabs, IonText, IonTextarea,
    IonTitle,
    IonToolbar
} from '@ionic/angular/standalone';
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
    imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonImg, IonTabBar, IonTabButton, IonTabs, IonButton, IonLabel, IonRow, IonText, IonTextarea, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonFooter, IonItem]
})
export class HomePage implements OnInit {

  constructor(
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
  }

  routeToSettings() {
    this.navCtrl.navigateForward("settings");
  }

  routeToSecurity() {
    this.navCtrl.navigateForward("settings-security");
  }

  logout() {
    this.navCtrl.navigateRoot("login");
  }
}
