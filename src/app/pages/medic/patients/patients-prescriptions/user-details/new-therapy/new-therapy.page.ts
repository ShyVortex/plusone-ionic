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
import { QuantitaDettaglio } from "../../../../../../models/terapiafarmacologica/QuantitaDettaglio";
import { Esame } from "../../../../../../models/esame/Esame";
import { TfarmacologicaService } from "../../../../../../services/TfarmacologicaService/tfarmacologica.service";
import { Medico } from "../../../../../../models/medico/Medico";
import { firstValueFrom, Observable } from "rxjs";
import { Terapia } from "../../../../../../models/terapia/Terapia";
import { QuantitaDettaglioService } from "../../../../../../services/QuantitaDettaglioService/quantita-dettaglio.service";
import { TerapiaFarmacologica } from "../../../../../../models/terapiafarmacologica/TerapiaFarmacologica";
import { forEach } from "lodash";

@Component({
  selector: 'app-new-therapy',
  templateUrl: './new-therapy.page.html',
  styleUrls: ['./new-therapy.page.scss'],
  standalone: true,
  imports: [IonSearchbar, IonButtons, IonModal, IonAvatar, IonItemOptions, IonItemOption, IonItemSliding, IonCardTitle, IonCardContent, IonCardSubtitle, IonCardHeader, IonCard, IonCol, IonGrid, IonRow, IonItemDivider, IonItem, IonList, IonFabList, IonIcon, IonFabButton, IonFab, IonSelect, IonFooter, IonTabButton, IonTabs, IonTabBar, IonImg, IonLabel, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class NewTherapyPage implements OnInit{
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
          console.error(error);
        }
      }
    }
  ];

  protected confirmButtons = [
    {
      text: 'Annulla',
      role: 'cancel',
      handler: () => {}
    },
    {
      text: 'Conferma',
      role: 'confirm',
      handler: async () => {
          if (this.paziente.isSet()) {
            try {
              await firstValueFrom<void>(
                this.tFarmacologicaService.setState(this.tFarmacologicaId, true)
              );
              this.navCtrl.navigateForward(this.navURL, {});

            } catch (error) {
              console.error(error)
            }
          }
          else {
            try {
              let tFarmacologica = new TerapiaFarmacologica();
              tFarmacologica.esami = this.exams;
              tFarmacologica.farmaci = [];

              this.drugs.forEach(function (value) {
                tFarmacologica.farmaci.push(value.farmaco);
              });
              this.tFarmacologicaService.addTFarmacologicaOffline(this.paziente, tFarmacologica);

              this.storageService.cacheTFarmacologica(tFarmacologica);
              this.storageService.cacheState(this.paziente);
              await this.navCtrl.navigateForward(this.navURL, {});

            } catch (error) {
              console.log(error);
            }
          }
        }


    }
  ];

  protected warningButton = ["OK"];

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
    });

    if (!this.paziente.isSet()) {
      this.exams = this.storageService.getEsami();
      this.drugs = this.storageService.getQuantitaDettagli();
    }
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

  async presentConfirmButtonAlert() {
    const alert = await this.alertController.create({
      header: 'Confermare terapia',
      message: 'Sei sicuro di voler confermare la terapia? In seguito non sarà possibile modificare la scelta.',
      buttons: this.confirmButtons,
    });

    await alert.present()
  }

  async presentWarningButtonAlert() {
    const alert = await this.alertController.create({
      header: 'ATTENZIONE',
      message: 'Inserire almeno un farmaco o un esame per confermare la terapia.',
      buttons: this.warningButton,
    });

    await alert.present();
  }

  navigateBack() {
    this.navURL = 'medic-patients-prescriptions';
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

  protected confirmButton() {
    if(this.isInserted()) {
      this.navURL = 'confirm-therapy'
      this.presentConfirmButtonAlert();
    }
    else {
      this.presentWarningButtonAlert()
    }
  }

  private isInserted() {
    return this.drugs.length > 0 || this.exams.length > 0;
  }
}
