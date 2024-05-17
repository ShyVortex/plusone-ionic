import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NavController } from "@ionic/angular";
import { IonContent, IonFooter, IonHeader, IonIcon, IonImg, IonLabel, IonTabBar, IonTabButton, IonTabs, IonText, IonTitle, IonToolbar, IonButton, IonList, IonItem, IonAvatar, IonSearchbar, IonProgressBar } from '@ionic/angular/standalone';

import { MedicoService } from 'src/app/services/MedicoService/medico.service';
import { Paziente } from 'src/app/models/paziente/Paziente';
import { Medico } from 'src/app/models/medico/Medico';
import { delay } from 'rxjs';
import {PersonaService} from "../../../../services/PersonaService/persona.service";
import {Sesso} from "../../../../models/person/sesso";
import {StorageService} from "../../../../services/StorageService/storage.service";

@Component({
  selector: 'app-prescriptions',
  templateUrl: './patients-prescriptions.page.html',
  styleUrls: ['./patients-prescriptions.page.scss'],
  standalone: true,
  imports: [IonProgressBar, IonSearchbar, IonAvatar, IonItem, IonList, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonIcon, IonImg, IonTabBar, IonTabButton, IonTabs, IonLabel, IonFooter, IonText]
})
export class PatientsPrescriptionsPage implements OnInit {
  protected isLoading: boolean = true;
  protected medico!: Medico;
  protected patients!: Paziente[];
  protected filteredPatients!: Paziente[];

  constructor(
    private navCtrl: NavController,
    private personaService: PersonaService,
    private medicoService: MedicoService,
    private storageService: StorageService
  ) {
    this.medico = personaService.getPersona();
  }

  ngOnInit() {
    this.loadItems();
  }

  async loadItems() {
    setTimeout(() => {
      this.medicoService.getMedicoByEmail(this.medico.email).subscribe((result: Medico) => {
        this.medico = result;
        this.medicoService.getAllPazientiByMedico(this.medico.id).subscribe((result: Paziente[]) => {
          this.patients = result;
          this.filteredPatients = this.patients;
        });
      });
      this.isLoading = false;
    }, 2000);
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
      if (fullName.replace(/\s+/g, '')
        .includes(searchValue.replace(/\s+/g, '')) ||
        reversedFullName.replace(/\s+/g, '')
          .includes(searchValue.replace(/\s+/g, '')))
      {
        this.filteredPatients.push(element);
      }
    });
  }

  navigateBack() {
    this.navCtrl.navigateBack('medic-patients');
  }

  goToUserDetails(paziente: any) {
    this.storageService.setPaziente(paziente);
    this.navCtrl.navigateForward('medic-patients-user-details');
  }

  goToHome() {
    this.navCtrl.navigateBack('medic-home', { animated: false });
  }

  goToNotifs() {
    this.navCtrl.navigateForward('medic-notifs', { animated: false });
  }

  goToPatients() {
    this.navCtrl.navigateForward('medic-patients', { animated: false });
  }

  protected readonly Sesso = Sesso;
}
