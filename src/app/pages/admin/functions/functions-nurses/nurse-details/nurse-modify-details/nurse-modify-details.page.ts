/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFooter, IonTabs, IonTabBar, IonTabButton, IonImg, IonLabel, IonButton, IonItem, IonInput, IonAlert } from '@ionic/angular/standalone';
import { NavController } from "@ionic/angular";
import { Sesso } from 'src/app/models/persona/sesso';
import { StorageService } from 'src/app/services/StorageService/storage.service';

@Component({
  selector: 'app-nurse-modify-details',
  templateUrl: './nurse-modify-details.page.html',
  styleUrls: ['./nurse-modify-details.page.scss'],
  standalone: true,
  imports: [IonAlert, IonInput, IonItem, IonButton, IonLabel, IonImg, IonTabButton, IonTabBar, IonTabs, IonFooter, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class NurseModifyDetailsPage implements OnInit {
  protected nurse: any;
  protected readonly Sesso = Sesso;
  protected confirmButtons = ['Annulla', 'Conferma'];
  protected deleteButtons = ['Annulla', 'Elimina'];

  constructor(
    private navCtrl: NavController,
    private storageService: StorageService
  ) { 
    this.nurse = this.storageService.getInfermiere();
  }

  ngOnInit() {
  }

  navigateBack() {
    this.storageService.setInfermiere(this.nurse);
    this.navCtrl.navigateBack("admin-nurse-details");
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
