/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonButton, IonFooter, IonTabs, IonTabBar, IonTabButton, IonImg, IonList, IonSearchbar } from '@ionic/angular/standalone';
import { NavController } from "@ionic/angular";
import { Esame } from 'src/app/models/esame/Esame';
import { StorageService } from 'src/app/services/StorageService/storage.service';
import { Paziente } from 'src/app/models/paziente/Paziente';
import { EsameService } from 'src/app/services/EsameService/esame.service';

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.page.html',
  styleUrls: ['./add-exam.page.scss'],
  standalone: true,
  imports: [IonSearchbar, IonList, IonImg, IonTabButton, IonTabBar, IonTabs, IonFooter, IonButton, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class AddExamPage implements OnInit {
  protected paziente: Paziente;
  protected isLoading: boolean = true;
  protected exams!: Esame[];
  protected filteredExams!: Esame[];

  constructor(
    private navCtrl: NavController,
    private storageService: StorageService,
    private esameService: EsameService
  ) { 
    this.paziente = storageService.getPaziente();
  }

  ngOnInit() {
  }

  search(event: any) {
    if (event.target.value === "") {
      this.filteredExams = this.exams;
      return;
    }

    this.filteredExams = [];
    this.exams.forEach(element => {
      const fullName = `${element.nome}`.toLowerCase();
      const searchValue = event.target.value.toLowerCase();
      const reversedFullName = `$ ${element.nome}`.toLowerCase();
      if (fullName.replace(/\s+/g, '')
        .includes(searchValue.replace(/\s+/g, '')) ||
        reversedFullName.replace(/\s+/g, '')
          .includes(searchValue.replace(/\s+/g, '')))
      {
        this.filteredExams.push(element);
      }
    });
  }

  navigateBack() {
    this.storageService.setPaziente(this.paziente),
    this.navCtrl.navigateBack('medic-patients-user-details-new-therapy');
  }

  goToHome() {
    this.navCtrl.navigateBack('medic-home', { animated: false });
  }

  goToNotifs() {
    this.navCtrl.navigateForward('medic-notifs', { animated: false });
  }

  goToPatients() {
    this.navCtrl.navigateForward('medic-exams', { animated: false });
  }
}
