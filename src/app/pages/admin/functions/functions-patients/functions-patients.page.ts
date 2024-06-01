/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonAvatar,
  IonButton,
  IonContent,
  IonFooter,
  IonHeader, IonImg, IonItem,
  IonLabel, IonList, IonProgressBar, IonSearchbar, IonTabBar, IonTabButton, IonTabs,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {NavController} from "@ionic/angular";
import {Sesso} from "../../../../models/persona/sesso";
import {Paziente} from "../../../../models/paziente/Paziente";
import { PazienteService } from 'src/app/services/PazienteService/paziente.service';
import { StorageService } from 'src/app/services/StorageService/storage.service';

@Component({
  selector: 'app-functions-patients',
  templateUrl: './functions-patients.page.html',
  styleUrls: ['./functions-patients.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonLabel, IonAvatar, IonFooter, IonImg, IonItem, IonList, IonProgressBar, IonSearchbar, IonTabBar, IonTabButton, IonTabs]
})
export class FunctionsPatientsPage implements OnInit {
  protected isLoading: boolean = true;
  protected patients!: Paziente[];
  protected filteredPatients!: Paziente[];

  constructor(
    private navCtrl: NavController,
    private pazienteService: PazienteService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
  }

  async loadItems() {
    setTimeout(() => {
      this.pazienteService.getAllPazienti().subscribe((result: Paziente[]) => {
        this.patients = result;
        this.filteredPatients = this.patients;
      });
      this.isLoading = false;
    }, 1000);
  }
  ionViewWillEnter(){
    this.loadItems()
  }
  ionViewWillLeave() {
    this.isLoading = true
  }


  search(event: any) {
    if (event.target.value === "") {
      this.filteredPatients = this.patients;
      return;
    }

    this.filteredPatients = [];
    this.patients.forEach(element => {
      const fullName = `${element.nome} ${element.cognome}`.toLowerCase();
      const searchValue = event.target.value.toLowerCase();
      const reversedFullName = `${element.cognome} ${element.nome}`.toLowerCase();

      if (
        fullName.replace(/\s+/g, '').includes(searchValue.replace(/\s+/g, '')) ||
        reversedFullName.replace(/\s+/g, '').includes(searchValue.replace(/\s+/g, ''))
      ) {
        this.filteredPatients.push(element);
      }
    });
  }

  navigateBack() {
    this.navCtrl.navigateBack("admin-functions");
  }

  goToPatientDetails(patient: any) {
    this.storageService.setPaziente(patient);
    this.navCtrl.navigateForward("admin-patient-details");
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

  protected readonly Sesso = Sesso;
}
