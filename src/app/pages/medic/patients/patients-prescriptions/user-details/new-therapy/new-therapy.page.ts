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
import { AlertController } from '@ionic/angular';
import {QuantitaDettaglio} from "../../../../../../models/terapiafarmacologica/QuantitaDettaglio";
import {Esame} from "../../../../../../models/esame/Esame";
import {TfarmacologicaService} from "../../../../../../services/TfarmacologicaService/tfarmacologica.service";
import {Medico} from "../../../../../../models/medico/Medico";
import {firstValueFrom, Observable} from "rxjs";
import {Terapia} from "../../../../../../models/terapia/Terapia";
import {QuantitaDettaglioService} from "../../../../../../services/QuantitaDettaglioService/quantita-dettaglio.service";

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
  protected medico: Medico;
  private tFarmacologicaId!:number
  protected navURL!: string;

  protected drugs!: QuantitaDettaglio[];
  protected drug: Farmaco = new Farmaco(1, 'codice', 'Un farmaco', 'categoria', 'principioattivo', 'azienda');

  protected exams!: Esame[];
  protected exam: Farmaco = new Farmaco(1, 'codice', 'nome', 'categoria', 'principioattivo', 'azienda');

  protected name!: string;
  protected message = 'Message';

  private getAllFarmaciByTFarmacologicaObservable!: Observable<QuantitaDettaglio[]>;
  private getAllEsamiByTfarmacologicaObservable!: Observable<Esame[]>;


  protected alertButtons = [
    {
      text: 'Annulla',
      role: 'cancel',
      handler: () => {}
    },
    {
      text: 'Conferma',
      role: 'confirm',
      handler: async () => {
        this.storageService.setPaziente(this.paziente);
        try {
          await firstValueFrom<void>(
            this.tFarmacologicaService.deleteTfarmacologica(this.tFarmacologicaId)
          );
          this.navCtrl.navigateBack(this.navURL, {});
        }
        catch (error){
          console.error(error)
        }
      }
    }
  ];

  constructor(
    private navCtrl: NavController,
    private storageService: StorageService,
    private alertController: AlertController,
    private tFarmacologicaService:TfarmacologicaService,
    private quantitaDettaglioService:QuantitaDettaglioService
  ) {
    this.paziente = storageService.getPaziente();
    this.medico = storageService.getMedico();
    this.drugs = [];
    this.exams = [];

  }

  ngOnInit() {
    this.tFarmacologicaService.addTFarmacologica(this.medico.id,this.paziente.id).subscribe(value => {
      this.tFarmacologicaId = value
      this.storageService.setTfarmacologicaId(this.tFarmacologicaId);
      console.log(this.tFarmacologicaId);
      this.getAllEsamiByTfarmacologicaObservable = this.tFarmacologicaService.getAllEsamiByTFarmacologica(this.tFarmacologicaId);
      this.getAllFarmaciByTFarmacologicaObservable = this.tFarmacologicaService.getAllQuantitaDettaglioByTFarmacologica(this.tFarmacologicaId);
    })
  }
  ionViewDidEnter(){
      this.getAllFarmaciByTFarmacologicaObservable.subscribe(value => {
        this.drugs = value
      })
      this.getAllEsamiByTfarmacologicaObservable.subscribe(value => {
        this.exams = value
      })

  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Conferma cancellazione',
      message: 'Sei sicuro di voler annullare il processo? Confermare comporterà la perdita di tutti i dati inseriti.',
      buttons: this.alertButtons,
    });

    await alert.present();
  }

  navigateBack() {
    this.navURL = 'medic-patients-prescriptions'
    this.presentAlert();
  }

  goToAddDrug() {
    this.navCtrl.navigateForward('medic-patients-user-details-add-drug');
  }

  goToAddExam() {
    this.navCtrl.navigateForward('medic-patients-user-details-add-exam');
  }

   goToHome() {
     this.navURL = 'medic-home'
     this.presentAlert();
  }

  goToNotifs() {
     this.navURL = 'medic-notifs'
     this.presentAlert()
  }

   goToPatients() {
     this.navURL = 'medic-patients'
     this.presentAlert()
  }
  async handleDrugEliminationItem(drug: QuantitaDettaglio) {
    const indexToRemove = this.drugs.indexOf(drug);
    if (indexToRemove !== -1) {
      this.drugs.splice(indexToRemove, 1);
    }
    try {
      await firstValueFrom<void>(
        this.quantitaDettaglioService.deleteQuantitaDettaglio(drug.id)
      );
    } catch (error) {
      console.error(error)
    }

  }
  async handleExamEliminationItem(exam: Esame) {
    const indexToRemove = this.exams.indexOf(exam);
    if (indexToRemove !== -1) {
      this.exams.splice(indexToRemove, 1);
    }
    try {
      await firstValueFrom<void>(
        this.tFarmacologicaService.removeEsameOfTfarmacologica(exam.id,this.tFarmacologicaId)
      );
    } catch (error) {
      console.error(error)
    }
  }

}
