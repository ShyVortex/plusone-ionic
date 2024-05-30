/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg, IonFooter, IonTabs, IonTabBar, IonTabButton } from '@ionic/angular/standalone';
import { NavController } from "@ionic/angular";

@Component({
  selector: 'app-medic-modify-details',
  templateUrl: './medic-modify-details.page.html',
  styleUrls: ['./medic-modify-details.page.scss'],
  standalone: true,
  imports: [IonTabButton, IonTabBar, IonTabs, IonFooter, IonImg, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class MedicModifyDetailsPage implements OnInit {

  constructor(
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
  }

  navigateBack() {
    this.navCtrl.navigateBack("admin-functions/medic-details");
  }

  goToHome() {
    this.navCtrl.navigateForward("admin-home", { animated: false });
  }

  goToRequests() {
    this.navCtrl.navigateForward("admin-requests", { animated: false });
  }

  goToFunctions() {
    this.navCtrl.navigateForward("admin-functions", { animated: false });
  }

  goToReports() {
    this.navCtrl.navigateForward("admin-reports", { animated: false });
  }
}
