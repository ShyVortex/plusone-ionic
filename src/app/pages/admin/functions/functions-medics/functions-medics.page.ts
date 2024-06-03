/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonAvatar,
  IonButton,
  IonContent, IonFooter,
  IonHeader, IonImg, IonItem,
  IonLabel, IonList,
  IonProgressBar, IonSearchbar, IonTabBar, IonTabButton, IonTabs,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { search } from "ionicons/icons";
import { Sesso } from "../../../../models/persona/sesso";
import { NavController } from "@ionic/angular";
import { Medico } from "../../../../models/medico/Medico";
import { MedicoService } from 'src/app/services/MedicoService/medico.service';
import { StorageService } from 'src/app/services/StorageService/storage.service';

@Component({
  selector: 'app-functions-medics',
  templateUrl: './functions-medics.page.html',
  styleUrls: ['./functions-medics.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonLabel, IonProgressBar, IonSearchbar, IonAvatar, IonImg, IonItem, IonList, IonFooter, IonTabBar, IonTabButton, IonTabs]
})
export class FunctionsMedicsPage implements OnInit {
  protected isLoading: boolean = true;

  protected medics!: Medico[];
  protected filteredMedics!: Medico[];

  constructor(
    private navCtrl: NavController,
    private medicoService: MedicoService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
  }

  async loadItems() {
      setTimeout(() => {
        this.medicoService.getAllMedici().subscribe((result: Medico[]) => {
          this.medics = result;
          this.filteredMedics = this.medics;
        });
        this.isLoading = false;

      }, 1000);
  }

  ionViewWillEnter(){
    this.loadItems();
  }
  ionViewWillLeave(){
    this.isLoading = true;
  }



  search(event: any) {
    if (event.target.value === "") {
      this.filteredMedics = this.medics;
      return;
    }

    this.filteredMedics = [];
    this.medics.forEach(element => {
      const fullName = `${element.nome} ${element.cognome}`.toLowerCase();
      const searchValue = event.target.value.toLowerCase();
      const reversedFullName = `${element.cognome} ${element.nome}`.toLowerCase();

      if (
        fullName.replace(/\s+/g, '').includes(searchValue.replace(/\s+/g, '')) ||
        reversedFullName.replace(/\s+/g, '').includes(searchValue.replace(/\s+/g, ''))
      ) {
        this.filteredMedics.push(element);
      }
    });
  }

  navigateBack() {
    this.navCtrl.navigateBack("admin-functions");
  }

  goToMedicDetails(medico: any) {
    this.storageService.setMedico(medico);
    this.navCtrl.navigateForward("admin-medic-details");
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
