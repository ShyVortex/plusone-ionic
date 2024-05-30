/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFooter, IonTabs, IonTabBar, IonTabButton, IonImg, IonLabel, IonButton, IonItem, IonInput, IonAlert } from '@ionic/angular/standalone';
import { NavController } from "@ionic/angular";
import { StorageService } from 'src/app/services/StorageService/storage.service';

@Component({
  selector: 'app-patient-modify-details',
  templateUrl: './patient-modify-details.page.html',
  styleUrls: ['./patient-modify-details.page.scss'],
  standalone: true,
  imports: [IonAlert, IonInput, IonItem, IonButton, IonLabel, IonImg, IonTabButton, IonTabBar, IonTabs, IonFooter, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PatientModifyDetailsPage implements OnInit {
  protected patient: any;
  protected confirmButtons = ['Annulla', 'Conferma'];
  protected deleteButtons = ['Annulla', 'Elimina'];

  constructor(
    private navCtrl: NavController,
    private storageService: StorageService
  ) {
    this.patient = this.storageService.getPaziente();
  }

  ngOnInit() {
  }

  navigateBack() {
    this.storageService.setPaziente(this.patient);
    this.navCtrl.navigateBack("admin-patient-details");
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
