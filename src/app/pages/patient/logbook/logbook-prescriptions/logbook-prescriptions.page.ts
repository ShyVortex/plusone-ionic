import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
    IonButton,
    IonContent,
    IonFooter,
    IonHeader,
    IonImg, IonItem,
    IonLabel, IonList, IonTabBar, IonTabButton, IonTabs, IonText,
    IonTitle,
    IonToolbar
} from '@ionic/angular/standalone';
import {NavController} from "@ionic/angular";
import {TerapiaFarmacologica} from "../../../../models/terapiafarmacologica/TerapiaFarmacologica";
import {Paziente} from "../../../../models/paziente/Paziente";
import {PersonaService} from "../../../../services/PersonaService/persona.service";
import {StorageService} from "../../../../services/StorageService/storage.service";

@Component({
  selector: 'app-logbook-prescriptions',
  templateUrl: './logbook-prescriptions.page.html',
  styleUrls: ['./logbook-prescriptions.page.scss'],
  standalone: true,
    imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonLabel, IonFooter, IonImg, IonTabBar, IonTabButton, IonTabs, IonItem, IonList, IonText]
})

export class LogbookPrescriptionsPage implements OnInit {
  protected paziente: Paziente;
  protected tpeFarm!: TerapiaFarmacologica[];

  constructor(
    private navCtrl: NavController,
    private personaService: PersonaService,
    private storageService: StorageService
  ) {
    this.paziente = personaService.getPersona();
  }

  ngOnInit() {
    console.clear();
    console.log(this.paziente);

    if (this.paziente && this.paziente.tFarmacologiche) {
      this.tpeFarm = this.paziente.tFarmacologiche;
      console.log(this.tpeFarm);
    }
  }

  routeToPrescriptionDetails(tpaFarm: TerapiaFarmacologica) {
    this.storageService.setTFarmacologica(tpaFarm);
    this.navCtrl.navigateForward("patient-logbook-prescription-details");
  }

  navigateBack() {
    this.navCtrl.navigateBack("patient-logbook");
  }

  goToHome() {
    this.navCtrl.navigateBack("patient-home", { animated: false });
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
