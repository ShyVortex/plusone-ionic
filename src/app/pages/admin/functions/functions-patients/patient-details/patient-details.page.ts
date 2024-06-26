/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonFooter,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonImg,
  IonButton,
  IonLabel,
  IonCard,
  IonCardContent,
  IonAvatar,
  IonCardTitle,
  IonCardSubtitle,
  IonText
} from '@ionic/angular/standalone';
import { NavController } from "@ionic/angular";
import { StorageService } from 'src/app/services/StorageService/storage.service';
import { Sesso } from 'src/app/models/persona/sesso';
import { PazienteService } from 'src/app/services/PazienteService/paziente.service';
import { Medico } from 'src/app/models/medico/Medico';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.page.html',
  styleUrls: ['./patient-details.page.scss'],
  standalone: true,
  imports: [IonCardSubtitle, IonCardTitle, IonAvatar, IonCardContent, IonCard, IonLabel, IonButton, IonImg, IonTabButton, IonTabBar, IonTabs, IonFooter, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonText]
})

export class PatientDetailsPage implements OnInit {
  protected patient!: any;
  protected assignedMedicDetails!: string;
  protected readonly Sesso = Sesso;

  constructor(
    private navCtrl: NavController,
    private pazienteService: PazienteService,
    private storageService: StorageService
  ) {
    this.assignedMedicDetails = '';
    this.patient = this.storageService.getPaziente();

    pazienteService.getMedicoOfPaziente(this.patient.id).subscribe((medico) => {
      this.assignedMedicDetails = medico.nome + ' ' + medico.cognome;
      if (medico.nome == '') {
        this.assignedMedicDetails = 'Nessun medico assegnato';
      }
    });
  }

  ngOnInit() {
  }

  format(): string {
    return this.patient.diagnosi.replace(/_/g, ' ');
  }

  navigateBack() {
    this.navCtrl.navigateBack("admin-functions-patients");
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

  goToModifyDetails() {
    this.navCtrl.navigateForward("admin-patient-modify-details");
  }
}
