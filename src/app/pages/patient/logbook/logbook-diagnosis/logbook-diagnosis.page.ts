/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonContent,
  IonFooter,
  IonHeader,
  IonImg,
  IonLabel, IonRow, IonTabBar, IonTabButton, IonTabs, IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {NavController} from "@ionic/angular";
import {Diagnosi} from "../../../../models/paziente/Diagnosi";
import {Paziente} from "../../../../models/paziente/Paziente";
import {PersonaService} from "../../../../services/PersonaService/persona.service";
import {DiagnosiInfo} from "../../../../models/paziente/diagnosi-info";
import {DiagnosiIcone} from "../../../../models/paziente/diagnosi-icone";

@Component({
  selector: 'app-logbook-diagnosis',
  templateUrl: './logbook-diagnosis.page.html',
  styleUrls: ['./logbook-diagnosis.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonFooter, IonImg, IonLabel, IonTabBar, IonTabButton, IonTabs, IonText, IonCard, IonCardHeader, IonCardTitle, IonRow, IonCardContent]
})

export class LogbookDiagnosisPage implements OnInit {
  protected paziente: Paziente;

  constructor(
    private navCtrl: NavController,
    private personaService: PersonaService
  ) {
    this.paziente = personaService.getPersona();
  }

  ngOnInit() {
  }

  getDescrizione() {
    return DiagnosiInfo[this.paziente.diagnosi];
  }

  getIcona() {
    return DiagnosiIcone[this.paziente.diagnosi];
  }

  format(): string {
    return this.paziente.diagnosi.replace(/_/g, ' ');
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

  protected readonly Diagnosi = Diagnosi;
}
