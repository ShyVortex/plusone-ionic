/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFooter, IonTabs, IonTabBar, IonTabButton, IonImg } from '@ionic/angular/standalone';
import { NavController } from "@ionic/angular";

@Component({
  selector: 'app-nurse-modify-details',
  templateUrl: './nurse-modify-details.page.html',
  styleUrls: ['./nurse-modify-details.page.scss'],
  standalone: true,
  imports: [IonImg, IonTabButton, IonTabBar, IonTabs, IonFooter, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class NurseModifyDetailsPage implements OnInit {

  constructor(
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
  }

  navigateBack() {
    this.navCtrl.navigateBack("admin-functions/nurse-details");
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
