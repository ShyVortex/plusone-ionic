/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonLabel, IonCard, IonCardContent, IonAvatar, IonImg, IonCardTitle, IonCardSubtitle, IonFooter, IonTabs, IonTabBar, IonTabButton } from '@ionic/angular/standalone';
import { NavController } from "@ionic/angular";
import { Medico } from 'src/app/models/medico/Medico';
import { Sesso } from 'src/app/models/persona/sesso';
import { StorageService } from 'src/app/services/StorageService/storage.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-medic-details',
  templateUrl: './medic-details.page.html',
  styleUrls: ['./medic-details.page.scss'],
  standalone: true,
  imports: [IonTabButton, IonTabBar, IonTabs, IonFooter, IonCardSubtitle, IonCardTitle, IonImg, IonAvatar, IonCardContent, IonCard, IonLabel, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})

export class MedicDetailsPage implements OnInit {
  protected medic!: any;
  protected readonly Sesso = Sesso;

  constructor(
    private navCtrl: NavController,
    private storageService: StorageService,
  ) {
    this.medic = this.storageService.getMedico();
  }

  ngOnInit() {
  }

  navigateBack() {
    this.navCtrl.navigateBack("admin-functions-medics");
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
    this.navCtrl.navigateForward("admin-medic-modify-details");
  }
}
