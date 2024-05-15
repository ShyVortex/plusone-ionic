import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NavController } from "@ionic/angular";
import { IonContent, IonFooter, IonHeader, IonIcon, IonImg, IonLabel, IonTabBar, IonTabButton, IonTabs, IonText, IonTitle, IonToolbar, IonButton, IonList, IonItem, IonAvatar, IonSearchbar } from '@ionic/angular/standalone';

import { MedicoService } from 'src/app/services/MedicoService/medico.service';
import { Paziente } from 'src/app/models/paziente/Paziente';
import { Medico } from 'src/app/models/medico/Medico';
import { delay } from 'rxjs';

@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.page.html',
  styleUrls: ['./prescriptions.page.scss'],
  standalone: true,
  imports: [IonSearchbar, IonAvatar, IonItem, IonList, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonIcon, IonImg, IonTabBar, IonTabButton, IonTabs, IonLabel, IonFooter, IonText]
})
export class PrescriptionsPage implements OnInit {
  protected medico!: Medico;
  protected patients!: Paziente[];
  protected filteredPatients!: Paziente[];

  constructor(
    private navCtrl: NavController,
    private medicoService: MedicoService
  ) {}

  ngOnInit() {
    this.medicoService.getMedicoByEmail("mario.rascato@example.com").subscribe((result: Medico) => {
      this.medico = result;
      this.medicoService.getAllPazientiByMedico(this.medico.id).subscribe((result: Paziente[]) => {
        this.patients = result;
        this.filteredPatients = this.patients;
      });
    });
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
      if (fullName.replace(/\s+/g, '').includes(searchValue.replace(/\s+/g, '')) || reversedFullName.replace(/\s+/g, '').includes(searchValue.replace(/\s+/g, ''))) {
        this.filteredPatients.push(element);
      }
    });
  }

  navigateBack() {
    this.navCtrl.navigateBack('medic-home');
  }

  goToUserDetails(paziente: any) {
    this.navCtrl.navigateForward('user-details', {
      state: {
        paziente: paziente,
      },
      // animated: false,
    },);
  }

  goToHome() {
    this.navCtrl.navigateBack('medic-home', { animated: false });
  }

  goToNotifs() {
    this.navCtrl.navigateForward('medic-notifs', { animated: false });
  }

  goToPrescriptions() {
    this.navCtrl.navigateForward('medic-prescriptions', { animated: false });
  }
}
