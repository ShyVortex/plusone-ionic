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
import {firstValueFrom, Observable} from "rxjs";

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
  protected tpaFarm: any;
  private getAllQuantitaDettaglioByTfarmacologicaObservable!:Observable<QuantitaDettaglio[]>;
  private getAllEsamiByTfarmacologicaObservable!:Observable<Esame[]>;

  constructor(
    private navCtrl: NavController,
    protected personaService: PersonaService,
    private tFaService: TfarmacologicaService,
    private storageService: StorageService
  ) {
    this.paziente = personaService.getPersona();
    this.tpaFarm = storageService.getTFarmacologica();
  }

  ngOnInit() {
    if (this.personaService.isDefault()) {
      this.exams = this.paziente.tFarmacologiche[0].esami;
      this.drugs = this.storageService.getQuantitaDettagli();
    }
    else {
     this.getAllEsamiByTfarmacologicaObservable = this.tFaService.getAllEsamiByTFarmacologica(this.tpaFarm.id)
     this.getAllQuantitaDettaglioByTfarmacologicaObservable = this.tFaService.getAllQuantitaDettaglioByTFarmacologica(this.tpaFarm.id)
    }
  }

  ionViewWillEnter(){
    this.getAllQuantitaDettaglioByTfarmacologicaObservable.subscribe(value =>
      this.drugs = value
    )
    this.getAllEsamiByTfarmacologicaObservable.subscribe(value => {
      this.exams = value;
    })
  }

  async markAsCompleted() {
    if (this.personaService.isDefault()) {
      this.tFaService.deleteTFarmacologicaOffline(this.paziente, this.tpaFarm);
      this.navCtrl.navigateForward("patient-logbook-prescription-completed");
    }
    else {
      try {
        await firstValueFrom(this.tFaService.setState(this.tpaFarm.id, false))
        this.navCtrl.navigateForward("patient-logbook-prescription-completed");
      }
      catch (error) {
        console.log(error);
      }
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
