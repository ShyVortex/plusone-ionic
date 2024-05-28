/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonButton, IonTabButton, IonTabs, IonTabBar, IonImg, IonFooter, IonItem, IonAvatar, IonList, IonSearchbar } from '@ionic/angular/standalone';
import { NavController } from "@ionic/angular";
import { Farmaco } from 'src/app/models/farmaco/Farmaco';
import { PersonaService } from 'src/app/services/PersonaService/persona.service';
import { Paziente } from 'src/app/models/paziente/Paziente';
import { StorageService } from 'src/app/services/StorageService/storage.service';

@Component({
  selector: 'app-add-drug',
  templateUrl: './add-drug.page.html',
  styleUrls: ['./add-drug.page.scss'],
  standalone: true,
  imports: [IonSearchbar, IonList, IonAvatar, IonItem, IonFooter, IonImg, IonTabBar, IonTabs, IonTabButton, IonButton, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class AddDrugPage implements OnInit {
  protected paziente: Paziente;
  protected isLoading: boolean = true;
  protected drugs!: Farmaco[];
  protected filteredDrugs!: Farmaco[];

  constructor(
    private navCtrl: NavController,
    private storageService: StorageService,
  ) {
    this.paziente = storageService.getPaziente();
  }

  ngOnInit() {
  }

  search(event: any) {
    if (event.target.value === "") {
      this.filteredDrugs = this.drugs;
      return;
    }

    this.filteredDrugs = [];
    this.drugs.forEach(element => {
      const fullName = `${element.nome}`.toLowerCase();
      const searchValue = event.target.value.toLowerCase();
      const reversedFullName = `${element.nome}`.toLowerCase();
      if (fullName.replace(/\s+/g, '')
        .includes(searchValue.replace(/\s+/g, '')) ||
        reversedFullName.replace(/\s+/g, '')
          .includes(searchValue.replace(/\s+/g, '')))
      {
        this.filteredDrugs.push(element);
      }
    });
  }

  navigateBack() {
    this.storageService.setPaziente(this.paziente),
    this.navCtrl.navigateBack('medic-patients-user-details-new-therapy', {
    });
  }

  goToHome() {
    this.navCtrl.navigateBack('medic-home', { animated: false });
  }

  goToNotifs() {
    this.navCtrl.navigateForward('medic-notifs', { animated: false });
  }

  goToPatients() {
    this.navCtrl.navigateForward('medic-drugs', { animated: false });
  }
}
