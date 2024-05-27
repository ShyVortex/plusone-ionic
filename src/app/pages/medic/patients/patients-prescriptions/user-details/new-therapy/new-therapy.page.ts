import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController } from "@ionic/angular";
import { IonSelect, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonLabel, IonImg, IonTabBar, IonTabs, IonTabButton, IonFooter, IonFab, IonFabButton, IonIcon, IonFabList, IonList, IonItem, IonItemDivider, IonRow, IonGrid, IonCol, IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonCardTitle, IonItemSliding, IonItemOption, IonItemOptions, IonAvatar, IonModal, IonButtons } from '@ionic/angular/standalone';
import { ActionSheetController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Farmaco } from 'src/app/models/farmaco/farmaco';

@Component({
  selector: 'app-new-therapy',
  templateUrl: './new-therapy.page.html',
  styleUrls: ['./new-therapy.page.scss'],
  standalone: true,
  imports: [IonButtons, IonModal, IonAvatar, IonItemOptions, IonItemOption, IonItemSliding, IonCardTitle, IonCardContent, IonCardSubtitle, IonCardHeader, IonCard, IonCol, IonGrid, IonRow, IonItemDivider, IonItem, IonList, IonFabList, IonIcon, IonFabButton, IonFab, IonSelect, IonFooter, IonTabButton, IonTabs, IonTabBar, IonImg, IonLabel, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class NewTherapyPage implements OnInit{
  @ViewChild(IonModal) modal!: IonModal;

  drugs!: Farmaco[];
  drug: Farmaco = new Farmaco(1, 'codice', 'nome', 'categoria', 'principioattivo', 'azienda');
  
  exams!: Farmaco[];
  exam: Farmaco = new Farmaco(1, 'codice', 'nome', 'categoria', 'principioattivo', 'azienda');
  
  name!: string;
  message = 'Message';
  
  constructor(
    private navCtrl: NavController,
  ) {
    this.drugs = [];
    this.exams = [];
  }
  
  ngOnInit(): void {
    this.drugs.push(this.drug);
  }

  navigateBack() {
    this.navCtrl.navigateBack('medic-patients-prescriptions', {
    });
  }

  goToAddDrug() {
    this.navCtrl.navigateForward('medic-patients-user-details-add-drug');
  }

  goToAddExam() {
    this.navCtrl.navigateForward('medic-patients-user-details-add-exam');
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
