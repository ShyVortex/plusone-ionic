import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonImg, IonItem,
  IonLabel, IonRow, IonTabBar, IonTabButton, IonTabs, IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {NavController} from "@ionic/angular";
import {Paziente} from "../../../../models/paziente/Paziente";
import {StorageService} from "../../../../services/StorageService/storage.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.page.html',
  styleUrls: ['./request-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonLabel, IonFooter, IonImg, IonTabBar, IonTabButton, IonTabs, IonItem, IonRow, IonText]
})

export class RequestDetailsPage implements OnInit {
  protected paziente: Paziente;
  protected citta: string;

  constructor(
    private navCtrl: NavController,
    private storageService: StorageService
  ) {
    this.paziente = storageService.getPaziente();
    this.citta = this.paziente.indirizzo.città;
  }

  ngOnInit() {
  }

  acceptRequest() {
    this.navCtrl.navigateForward("admin-request-accepted");
  }

  denyRequest() {
    this.navCtrl.navigateForward("admin-request-denied");
  }

  navigateBack() {
    this.navCtrl.navigateBack("admin-requests");
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
