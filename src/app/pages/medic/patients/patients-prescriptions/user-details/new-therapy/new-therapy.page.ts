import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController } from "@ionic/angular";
import { IonSelect, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonLabel, IonImg, IonTabBar, IonTabs, IonTabButton, IonFooter, IonFab, IonFabButton, IonIcon, IonFabList, IonList, IonItem, IonItemDivider, IonRow, IonGrid, IonCol, IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonCardTitle, IonItemSliding, IonItemOption, IonItemOptions, IonAvatar, IonModal, IonButtons, IonSearchbar } from '@ionic/angular/standalone';
import { ActionSheetController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Farmaco } from 'src/app/models/farmaco/Farmaco';
import { Paziente } from 'src/app/models/paziente/Paziente';
import { StorageService } from 'src/app/services/StorageService/storage.service';

@Component({
  selector: 'app-new-therapy',
  templateUrl: './new-therapy.page.html',
  styleUrls: ['./new-therapy.page.scss'],
  standalone: true,
  imports: [IonSearchbar, IonButtons, IonModal, IonAvatar, IonItemOptions, IonItemOption, IonItemSliding, IonCardTitle, IonCardContent, IonCardSubtitle, IonCardHeader, IonCard, IonCol, IonGrid, IonRow, IonItemDivider, IonItem, IonList, IonFabList, IonIcon, IonFabButton, IonFab, IonSelect, IonFooter, IonTabButton, IonTabs, IonTabBar, IonImg, IonLabel, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class NewTherapyPage implements OnInit{
  // @ViewChild(IonModal) modal!: IonModal;

  protected paziente: Paziente;

  protected drugs!: Farmaco[];
  protected drug: Farmaco = new Farmaco(1, 'codice', 'nome', 'categoria', 'principioattivo', 'azienda');

  protected exams!: Farmaco[];
  protected exam: Farmaco = new Farmaco(1, 'codice', 'nome', 'categoria', 'principioattivo', 'azienda');

  protected name!: string;
  protected message = 'Message';

  constructor(
    private navCtrl: NavController,
    private storageService: StorageService,
  ) {
    this.paziente = storageService.getPaziente();
    this.drugs = [];
    this.exams = [];
  }

  ngOnInit() {
    this.drugs.push(this.drug);
  }

  navigateBack() {
    this.storageService.setPaziente(this.paziente);
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
