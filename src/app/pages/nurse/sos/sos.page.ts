import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonFooter,
  IonHeader,
  IonIcon,
  IonImg, IonLabel,
  IonTabBar,
  IonTabButton, IonTabs,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-sos',
  templateUrl: './sos.page.html',
  styleUrls: ['./sos.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonIcon, IonImg, IonTabBar, IonTabButton, IonTabs, IonLabel, IonFooter]
})
export class SOSPage implements OnInit {

  constructor(
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
  }

  goToHome() {
    this.navCtrl.navigateBack("nurse-home");
  }

  goToDrugs() {
    this.navCtrl.navigateForward("nurse-drugs");
  }

  goToShifts() {
    this.navCtrl.navigateForward("nurse-shifts");
  }

  goToSOS() {
    this.navCtrl.navigateForward("nurse-sos");
  }
}
