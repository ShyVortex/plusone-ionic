import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonButton,
  IonTabButton,
  IonTabs,
  IonTabBar,
  IonImg,
  IonFooter,
  IonItem,
  IonAvatar,
  IonList,
  IonSearchbar,
  IonAlert,
  IonProgressBar, AlertController, ToastController
} from '@ionic/angular/standalone';
import {AlertInput, NavController} from "@ionic/angular";
import { Farmaco } from 'src/app/models/farmaco/Farmaco';
import { PersonaService } from 'src/app/services/PersonaService/persona.service';
import { Paziente } from 'src/app/models/paziente/Paziente';
import { StorageService } from 'src/app/services/StorageService/storage.service';
import { FarmacoService } from 'src/app/services/FarmacoService/farmaco.service';
import {firstValueFrom} from "rxjs";
import {
  QuantitaDettaglioService
} from "../../../../../../../services/QuantitaDettaglioService/quantita-dettaglio.service";
import {QuantitaDettaglio} from "../../../../../../../models/terapiafarmacologica/QuantitaDettaglio";
import {TfarmacologicaService} from "../../../../../../../services/TfarmacologicaService/tfarmacologica.service";

@Component({
  selector: 'app-add-drug',
  templateUrl: './add-drug.page.html',
  styleUrls: ['./add-drug.page.scss'],
  standalone: true,
  imports: [IonAlert, IonSearchbar, IonList, IonAvatar, IonItem, IonFooter, IonImg, IonTabBar, IonTabs, IonTabButton, IonButton, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonProgressBar]
})
export class AddDrugPage implements OnInit {
  protected paziente: Paziente;
  protected isLoading: boolean = true;
  private note!: string;
  private quantita!: any;
  private navURL!: string;
  private tfarmacologicaId!: number;
  private quantitaDettaglioJSON: any;
  private chosenDrug!: Farmaco;

  protected drugs!: Farmaco[];
  protected filteredDrugs!: Farmaco[];

  private alertButtons = [
    {
      text: 'Annulla',
      role: 'cancel',
      handler: () => {}
    },
    {
      text: 'Conferma',
      role: 'confirm',
      handler: async (alertData: any) => {
        this.quantita = alertData.quantita
        this.note = alertData.note;
        if (this.isValidInput()) {
          if (this.quantita >= 10) {
            this.presentToast("La quantità inserita sembra essere eccessiva, inserire una quantità adeguata!")
          } else {
            this.setQuantitaDettaglio();

            if (this.paziente.isSet()) {
              try {
                await firstValueFrom<QuantitaDettaglio>(
                  this.quantitaDettaglioService.addQuantitaDettaglio(this.chosenDrug.id,
                    this.storageService.getTFarmacologicaId(), this.quantitaDettaglioJSON
                  )
                );
                this.presentToast("Farmaco assegnato correttamente!");
              } catch (error) {
                console.error(error);
              }
            }
            else {
              try {
                this.quantitaDettaglioService.addQuantitaDettaglioOffline(this.chosenDrug,
                  this.storageService.getTFarmacologicaId(), this.quantita, this.note
                );
                this.presentToast("Farmaco assegnato correttamente!");
              } catch (error) {
                console.error(error);
              }
            }
          }
        } else {
          this.presentToast("Dati non validi, inserire dei dati corretti!")
        }
      }
    }
  ];

  private alertInputs:AlertInput[] = [
    {
      name:"quantita",
      type: "number",
      placeholder: 'Quantità',
    },
    {
      name:"note",
      type: 'textarea',
      placeholder: 'Note aggiuntive',
      attributes: {
        maxlength: 50,
      },
    },
  ];

  protected exitButtons = [
    {
      text: 'Annulla',
      role: 'cancel',
      handler: () => {}
    },
    {
      text: 'Conferma',
      role: 'confirm',
      handler: async () => {

          await firstValueFrom<any>(
            this.tFarmacologicaService.deleteTfarmacologica(this.storageService.getTFarmacologicaId()))
          this.navCtrl.navigateForward(this.navURL, {
            animated: false
          });

      }
    }
  ];

  constructor(
    private navCtrl: NavController,
    private storageService: StorageService,
    private farmacoService: FarmacoService,
    private alertController:AlertController,
    private toastController: ToastController,
    private quantitaDettaglioService:QuantitaDettaglioService,
    private tFarmacologicaService:TfarmacologicaService,
  ) {
    this.quantitaDettaglioJSON = {}
    this.paziente = storageService.getPaziente();
  }

  ngOnInit() {
    if (this.paziente.isSet())
      this.loadItems();
    else
      this.loadItemsOffline();
  }

  async loadItems() {
    setTimeout(() => {
      this.farmacoService.getAllFarmaci().subscribe((result: Farmaco[]) => {
        this.drugs = result;
        this.filteredDrugs = this.drugs;
      });
      this.isLoading = false;
    }, 1000);
  }

  async loadItemsOffline() {
    setTimeout( () => {
      this.drugs = [];

      let farmaco = new Farmaco();
      farmaco.codice = '022571147';
      farmaco.nome = 'ACICLOVIR';
      farmaco.categoria = 'Antibiotico';
      farmaco.principioattivo = 'Ibrupofene';
      farmaco.azienda = 'Sanitech';
      this.drugs.push(farmaco);
      this.filteredDrugs = this.drugs;

      this.isLoading = false;
    }, 1000);
  }

  ionViewWillEnter(){
    this.tfarmacologicaId = this.storageService.getTFarmacologicaId();
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

      if (fullName.replace(/\s+/g, '').includes(searchValue.replace(/\s+/g, ''))) {
        this.filteredDrugs.push(element);
      }
    });
  }

  submitDrug(drug: Farmaco) {
    this.chosenDrug = drug;
    this.presentDrugInsertAlert();
  }

  async presentDrugInsertAlert() {
    const alert = await this.alertController.create({
      header: 'Informazioni aggiuntive',
      message: 'Compila i campi.',
      inputs:  this.alertInputs,
      buttons: this.alertButtons,
    });

    await alert.present();
  }

  async presentExitAlertButton() {
    const alert = await this.alertController.create({
      header: 'Conferma cancellazione',
      message: 'Sei sicuro di voler annullare il processo? Confermare comporterà la perdita di tutti i dati inseriti.',
      buttons: this.exitButtons,
    });

    await alert.present()
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
    });

    await toast.present();
  }

  navigateBack() {
    this.storageService.setPaziente(this.paziente),
    this.navCtrl.navigateBack('medic-patients-user-details-new-prescription', {
    });
  }

  goToHome() {
    this.navURL = 'medic-home'
    this.presentExitAlertButton();
  }

  goToNotifs() {
    this.navURL = 'medic-notifs'
    this.presentExitAlertButton();
  }

  goToPatients() {
    this.navURL = 'medic-patients'
    this.presentExitAlertButton();
  }

  private isValidInput(): boolean {
    return (this.quantita !== undefined && this.quantita !=='' && this.quantita > 0 );
  }

  private setQuantitaDettaglio() {
    this.quantitaDettaglioJSON.quantita = this.quantita;

    if (this.note == undefined || this.note == '') {
      this.quantitaDettaglioJSON.note = 'Nessuna informazione aggiuntiva';
    } else {
      this.quantitaDettaglioJSON.note = this.note;
    }
  }
}
