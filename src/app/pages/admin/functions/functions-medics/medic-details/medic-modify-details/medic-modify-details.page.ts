/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg, IonFooter, IonTabs, IonTabBar, IonTabButton, IonButton, IonLabel, IonAvatar, IonCardHeader, IonCard, IonCardTitle, IonCardSubtitle, IonInput, IonItem, IonAlert } from '@ionic/angular/standalone';
import { NavController } from "@ionic/angular";
import { StorageService } from 'src/app/services/StorageService/storage.service';
import { Sesso } from 'src/app/models/persona/sesso';

@Component({
  selector: 'app-medic-modify-details',
  templateUrl: './medic-modify-details.page.html',
  styleUrls: ['./medic-modify-details.page.scss'],
  standalone: true,
  imports: [IonAlert, IonItem, IonInput, IonCardSubtitle, IonCardTitle, IonCard, IonCardHeader, IonAvatar, IonLabel, IonButton, IonTabButton, IonTabBar, IonTabs, IonFooter, IonImg, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class MedicModifyDetailsPage implements OnInit {
  protected medic: any;
  protected readonly Sesso = Sesso;
  protected confirmButtons = ['Annulla', 'Conferma'];
  protected deleteButtons = ['Annulla', 'Elimina'];

  constructor(
    private navCtrl: NavController,
    private storageService: StorageService
  ) {
    this.medic = this.storageService.getMedico();
  }

  ngOnInit() {
  }

  navigateBack() {
    this.storageService.setMedico(this.medic);
    this.navCtrl.navigateBack("admin-medic-details");
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
