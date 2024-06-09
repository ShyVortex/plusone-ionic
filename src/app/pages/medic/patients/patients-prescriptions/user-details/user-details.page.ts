import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg, IonItem, IonList, IonAvatar, IonLabel, IonFooter, IonTabs, IonTabBar, IonTabButton, IonButton, IonSearchbar, IonCardContent, IonCardTitle, IonCardSubtitle, IonCard } from '@ionic/angular/standalone';
import { NavController } from "@ionic/angular";
import { Paziente } from 'src/app/models/paziente/Paziente';
import { ModelUtilities } from 'src/app/models/ModelUtilities';
import { DataService } from 'src/app/services/data.service';
import { AlertController } from '@ionic/angular';
import { Sesso } from "../../../../../models/persona/sesso";
import { StorageService } from "../../../../../services/StorageService/storage.service";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
  standalone: true,
  imports: [IonCard, IonCardSubtitle, IonCardTitle, IonCardContent, IonSearchbar, IonButton, IonTabButton, IonTabBar, IonTabs, IonFooter, IonLabel, IonAvatar, IonList, IonItem, IonImg, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class UserDetailsPage {
  protected patient!: any;
  protected readonly Sesso = Sesso;

  constructor(
    private navCtrl: NavController,
    private dataService: DataService,
    private storageService: StorageService,
    private alertController: AlertController
  ) {
    this.patient = storageService.getPaziente();
    console.log(this.patient);
    console.log(this.patient.sesso);
  }

  format(): string {
    return this.patient.diagnosi.replace(/_/g, ' ');
  }

  navigateBack() {
    this.navCtrl.navigateBack('medic-patients-prescriptions', {
      // animated: false,
    });
  }

  goToNewTherapy() {
    this.navCtrl.navigateForward('medic-patients-user-details-new-therapy');
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

}
