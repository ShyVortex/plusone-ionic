import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonFooter,
  IonHeader, IonIcon,
  IonImg, IonItem,
  IonLabel, IonRow, IonTabBar, IonTabButton, IonTabs, IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {NavController} from "@ionic/angular";
import {Admin} from "../../../../models/admin/Admin";
import {Segnalazione} from "../../../../models/segnalazione/Segnalazione";
import {PersonaService} from "../../../../services/PersonaService/persona.service";
import {StorageService} from "../../../../services/StorageService/storage.service";
import {SegnalazioneService} from "../../../../services/SegnalazioneService/segnalazione.service";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.page.html',
  styleUrls: ['./report-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonLabel, IonFooter, IonImg, IonTabBar, IonTabButton, IonTabs, IonIcon, IonItem, IonRow, IonText]
})

export class ReportDetailsPage implements OnInit {
  protected admin: Admin;
  protected segnalazione: Segnalazione;

  constructor(
    private navCtrl: NavController,
    private personaService: PersonaService,
    private segnalazioneService: SegnalazioneService,
    private storageService: StorageService
  ) {
    this.admin = personaService.getPersona();
    this.segnalazione = storageService.getSegnalazione();
  }

  ngOnInit() {
  }

  async markAsSolved() {
    try {
      await firstValueFrom(this.segnalazioneService.setState(this.segnalazione.id, false));
      this.navigateBack();
    } catch (error) {
      console.log(error);
    }

  }

  navigateBack() {
    this.navCtrl.navigateBack("admin-reports");
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
