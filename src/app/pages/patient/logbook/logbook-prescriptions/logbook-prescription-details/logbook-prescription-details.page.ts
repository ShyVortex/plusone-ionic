import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton, IonCard, IonCol,
  IonContent,
  IonFooter, IonGrid,
  IonHeader, IonIcon,
  IonImg, IonItem, IonItemDivider, IonLabel, IonRow,
  IonTabBar,
  IonTabButton, IonTabs, IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {NavController} from "@ionic/angular";
import {Paziente} from "../../../../../models/paziente/Paziente";
import {PersonaService} from "../../../../../services/PersonaService/persona.service";
import {QuantitaDettaglio} from "../../../../../models/terapiafarmacologica/QuantitaDettaglio";
import {Esame} from "../../../../../models/esame/Esame";
import {StorageService} from "../../../../../services/StorageService/storage.service";
import {TfarmacologicaService} from "../../../../../services/TfarmacologicaService/tfarmacologica.service";
import {TerapiaFarmacologica} from "../../../../../models/terapiafarmacologica/TerapiaFarmacologica";

@Component({
  selector: 'app-logbook-prescription-details',
  templateUrl: './logbook-prescription-details.page.html',
  styleUrls: ['./logbook-prescription-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonFooter, IonImg, IonTabBar, IonTabButton, IonTabs, IonButton, IonLabel, IonItem, IonRow, IonText, IonCard, IonCol, IonGrid, IonIcon, IonItemDivider]
})

export class LogbookPrescriptionDetailsPage implements OnInit {
  protected paziente: Paziente;
  protected drugs!: QuantitaDettaglio[];
  protected exams!: Esame[];
  protected tpaFarm: TerapiaFarmacologica;

  constructor(
    private navCtrl: NavController,
    private personaService: PersonaService,
    private tFaService: TfarmacologicaService,
    private storageService: StorageService
  ) {
    this.paziente = personaService.getPersona();
    this.tpaFarm = storageService.getTFarmacologica();
  }

  ngOnInit() {
    if (!this.paziente.isSet()) {
      this.exams = this.paziente.tFarmacologiche[0].esami;
      this.drugs = this.storageService.getQuantitaDettagli();
    }
  }

  markAsCompleted() {
    if (!this.paziente.isSet()) {
      this.tFaService.deleteTFarmacologicaOffline(this.paziente, this.tpaFarm);
      this.navCtrl.navigateForward("patient-logbook-prescription-completed");
    }
  }

  navigateBack() {
    this.navCtrl.navigateBack("patient-logbook-prescriptions");
  }

  goToHome() {
    this.navCtrl.navigateForward("patient-home", { animated: false });
  }

  goToLogbook() {
    this.navCtrl.navigateForward("patient-logbook", { animated: false });
  }

  goToReservation() {
    this.navCtrl.navigateForward("patient-reservation", { animated: false });
  }

  goToSOS() {
    this.navCtrl.navigateForward("patient-sos", { animated: false });
  }
}
