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
import {Paziente} from "../../../../models/paziente/Paziente";
import {PersonaService} from "../../../../services/PersonaService/persona.service";
import {StorageService} from "../../../../services/StorageService/storage.service";
import {PazienteService} from "../../../../services/PazienteService/paziente.service";
import {Observable} from "rxjs";
import {TerapiaFarmacologica} from "../../../../models/terapiafarmacologica/TerapiaFarmacologica";

@Component({
  selector: 'app-logbook-prescriptions',
  templateUrl: './logbook-prescriptions.page.html',
  styleUrls: ['./logbook-prescriptions.page.scss'],
  standalone: true,
    imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonLabel, IonFooter, IonImg, IonTabBar, IonTabButton, IonTabs, IonItem, IonList, IonText]
})

export class LogbookPrescriptionsPage implements OnInit {
  protected paziente: Paziente;
  protected tpeFarm: any[];
  protected tpeFarmOffline!: TerapiaFarmacologica[];
  private getAllTerapiaFarmacologicaByPazienteObservable!:Observable<any[]>;

  constructor(
    private navCtrl: NavController,
    protected personaService: PersonaService,
    private storageService: StorageService,
    private pazienteService:PazienteService
  ) {
    this.paziente = personaService.getPersona();
    this.tpeFarm = [];
    this.tpeFarmOffline = [];
  }

  ngOnInit() {
    console.clear();
    console.log(this.paziente);

    this.getAllTerapiaFarmacologicaByPazienteObservable = this.pazienteService
      .getAllTerapieFarmacologicaByPaziente(this.paziente.id);

    if (this.paziente && this.paziente.tFarmacologiche) {
      this.tpeFarmOffline = this.paziente.tFarmacologiche;
      console.log(this.tpeFarmOffline);
    }
  }

  ionViewWillEnter(){
    this.getAllTerapiaFarmacologicaByPazienteObservable.subscribe(value => {
      this.tpeFarm = value;
    })
  }

  routeToPrescriptionDetails(tpaFarm: any) {
    this.storageService.setTFarmacologica(tpaFarm);
    this.navCtrl.navigateForward("patient-logbook-prescription-details");
  }

  navigateBack() {
    this.navCtrl.navigateBack("patient-logbook");
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

  checkImpegnative(): boolean {
    if (this.tpeFarm.length > 0 || this.tpeFarmOffline.length > 0) {
      if (this.tpeFarmOffline.length > 0)
        return true;

      let valid: boolean = false;

      this.tpeFarm.forEach(prenotazione => {
        if (prenotazione.attivo)
          valid = true;
      });

      return valid;
    }
    else
      return false;
  }
}
