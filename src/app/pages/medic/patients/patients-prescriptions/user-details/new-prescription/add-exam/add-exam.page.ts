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
  IonFooter,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonImg,
  IonList,
  IonSearchbar,
  IonItem,
  ToastController
} from '@ionic/angular/standalone';
import { NavController } from "@ionic/angular";
import { Esame } from 'src/app/models/esame/Esame';
import { StorageService } from 'src/app/services/StorageService/storage.service';
import { Paziente } from 'src/app/models/paziente/Paziente';
import { EsameService } from 'src/app/services/EsameService/esame.service';
import { AlertController } from '@ionic/angular';
import {firstValueFrom} from "rxjs";
import {TfarmacologicaService} from "../../../../../../../services/TfarmacologicaService/tfarmacologica.service";


@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.page.html',
  styleUrls: ['./add-exam.page.scss'],
  standalone: true,
  imports: [IonItem, IonSearchbar, IonList, IonImg, IonTabButton, IonTabBar, IonTabs, IonFooter, IonButton, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class AddExamPage implements OnInit {
  protected paziente: Paziente;
  protected isLoading: boolean = true;
  private chosenExam!:Esame
  private navURL!:string

  protected exams!: Esame[];
  protected filteredExams!: Esame[];
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
        try {
          await firstValueFrom<any>(
            this.tFarmacologicaService.deleteTfarmacologica(this.storageService.getTFarmacologicaId()))
          this.navCtrl.navigateForward(this.navURL, {
            animated: false
          });
        }
        catch (error){
          console.error(error);
        }
      }
    }
  ];

  private alertButtons = [
    {
      text: 'NO',
      role: 'cancel',
      handler: () => {}
    },
    {
      text: 'SI',
      role: 'confirm',
      handler: async () => {
        if (this.paziente.isSet()) {
          try {
            await firstValueFrom<any>(
              this.tFarmacologicaService.addEsameToTfarmacologica(this.chosenExam.id,this.storageService.getTFarmacologicaId()))
            this.presentToast("Esame aggiunto con successo!");
          }
          catch (error){
            console.error(error);
          }
        } else {
          try {
            this.esameService.addEsameOffline(this.chosenExam);
            this.presentToast("Esame aggiunto con successo!");
          }
          catch (error) {
            console.log(error);
          }
        }
      }
    }
  ];

  constructor(
    private navCtrl: NavController,
    private toastController: ToastController,
    private storageService: StorageService,
    private esameService: EsameService,
    private alertController: AlertController,
    private tFarmacologicaService:TfarmacologicaService,
  ) {
    this.paziente = storageService.getPaziente();
  }

  ngOnInit() {
    if (this.paziente.isSet())
      this.loadItems();
    else
      this.loadItemsOffline();

    console.log(this.exams);
  }

  async loadItems() {
    setTimeout(() => {
      this.esameService.getAllEsami().subscribe((result: Esame[]) => {
        this.exams = result;
        this.filteredExams = this.exams;
      });
      this.isLoading = false;
    }, 1000);
  }

  loadItemsOffline() {
    setTimeout(() => {
      this.exams = [];

      let esame = new Esame();
      esame.nome = "Esame della cardrega";
      esame.codice = '1';
      this.exams.push(esame);
      this.filteredExams = this.exams;

      this.isLoading = false;
    }, 1000);
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

      if (fullName.replace(/\s+/g, '').includes(searchValue.replace(/\s+/g, ''))) {
        this.filteredExams.push(element);
      }
    });
  }

  submitExam(exam:Esame) {
    this.chosenExam = exam
    this.presentConfirmAlertButton();
  }

  async presentExitAlertButton() {
    const alert = await this.alertController.create({
      header: 'Conferma cancellazione',
      message: 'Sei sicuro di voler annullare il processo? Confermare comporterà la perdita di tutti i dati inseriti.',
      buttons: this.exitButtons,
    });
    await alert.present()
  }

  async presentConfirmAlertButton() {
    const alert = await this.alertController.create({
      header: 'Conferma scelta',
      buttons: this.alertButtons,
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
    this.storageService.setPaziente(this.paziente);
    this.navCtrl.navigateBack('medic-patients-user-details-new-prescription');
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
    this.navURL = "medic-patients"
    this.presentExitAlertButton();
  }
}
