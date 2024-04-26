import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
    IonButton, IonCard, IonCardHeader, IonCardTitle,
    IonContent, IonFooter,
    IonHeader, IonIcon, IonImg, IonItem, IonLabel,
    IonNav, IonRow,
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
    imports: [IonContent,
        IonHeader,
        IonTitle,
        IonToolbar,
        CommonModule,
        FormsModule,
        IonTabs,
        IonNav,
        IonTabBar,
        IonTabButton,
        IonIcon, IonImg, IonButton, IonLabel, IonRow, IonText, IonTextarea, IonCard, IonCardHeader, IonCardTitle, IonFooter, IonItem],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
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

  goToHome() {
    this.navCtrl.navigateBack("medic-home", { animated: false });
  }

  goToNotifs() {
    this.navCtrl.navigateForward("medic-notifs", { animated: false });
  }

  goToPrescriptions() {
    this.navCtrl.navigateForward("medic-prescriptions", { animated: false });
  }
}
