/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFooter, IonTabs, IonTabBar, IonTabButton, IonImg, IonCard, IonCardContent, IonAvatar, IonCardTitle, IonCardSubtitle, IonButton, IonLabel } from '@ionic/angular/standalone';
import { NavController } from "@ionic/angular";
import { StorageService } from 'src/app/services/StorageService/storage.service';
import { Sesso } from 'src/app/models/persona/sesso';

@Component({
  selector: 'app-nurse-details',
  templateUrl: './nurse-details.page.html',
  styleUrls: ['./nurse-details.page.scss'],
  standalone: true,
  imports: [IonLabel, IonButton, IonCardSubtitle, IonCardTitle, IonAvatar, IonCardContent, IonCard, IonImg, IonTabButton, IonTabBar, IonTabs, IonFooter, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class NurseDetailsPage implements OnInit {
  protected nurse!: any;
  protected readonly Sesso = Sesso;

  constructor(
    private navCtrl: NavController,
    private storageService: StorageService
  ) { 
    this.nurse = this.storageService.getInfermiere();
  }

  ngOnInit() {
  }

  navigateBack() {
    this.navCtrl.navigateBack("admin-functions-nurses");
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

  goToModifyDetails() {
    this.navCtrl.navigateForward("admin-nurse-modify-details");
  }
}
