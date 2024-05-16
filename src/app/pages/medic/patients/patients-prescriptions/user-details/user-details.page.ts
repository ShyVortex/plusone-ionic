import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg, IonItem, IonList, IonAvatar, IonLabel, IonFooter, IonTabs, IonTabBar, IonTabButton, IonButton, IonSearchbar, IonCardContent, IonCardTitle, IonCardSubtitle, IonCard } from '@ionic/angular/standalone';
import { NavController } from "@ionic/angular";
import { Paziente } from 'src/app/models/paziente/Paziente';
import { ModelUtilities } from 'src/app/models/ModelUtilities';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
  standalone: true,
  imports: [IonCard, IonCardSubtitle, IonCardTitle, IonCardContent, IonSearchbar, IonButton, IonTabButton, IonTabBar, IonTabs, IonFooter, IonLabel, IonAvatar, IonList, IonItem, IonImg, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class UserDetailsPage {
  protected patient!: any;

  constructor(
    private navCtrl: NavController,
    private dataService: DataService,
  ) { 
    this.patient = history.state.paziente;
    console.log(this.patient);
  }

  navigateBack() {
    this.navCtrl.navigateBack('medic-prescriptions', {
      // animated: false,
    });
  }

  goToNewTherapy() {
    this.navCtrl.navigateForward('new-therapy');
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
